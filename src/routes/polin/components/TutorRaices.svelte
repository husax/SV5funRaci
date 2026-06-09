<script lang="ts"> 
	import { ArrNum } from '$lib/tools/ConvierteData';
	import { onDestroy } from 'svelte';
  import  MathQuillStatic  from "$lib/components/MathQuillStatic.svelte";
  import TarjetaRaicesSelecFun from './TarjetaRaicesSelecFun.svelte';
	import TarjetaDeslizaPar from './TarjetaDeslizaPar.svelte';
  	import TarjetaPreguntaRaices from './TarjetaPreguntaRaices.svelte';

	import type { DeslPr, funR, paramF } from '$lib/tools/tipos';
	import { ConstruyeFunParFijo, ConstruyeFunParamFijos, Raices } from '$lib/tools/TrazosPolinJSX';
	import TeXToLinealPyt from '$lib/tools/TeXToLineal';
	import { InfijaAPolacaFR } from '$lib/tools/InfAPolInv';
	import { BorraObjGraficos, GraficaRaices } from '$lib/tools/TrazosJSXGraph';
	import { getBrd } from '$lib/tools/EstadosGlobales.svelte';
	import { Polinomio } from '$lib/tools/Polinomio';
	

  let latex: string = $state("");
  let cajaPol: HTMLSpanElement | null = $state(null);

  let arrLatex: string[]= ['f(x)=ax^2+bx+c', 'g(x)=ax^3+bx^2+cx+d', ' h(x)=ax^5+bx^4+cx^3+dx^2+ex+f'];

  let deslizadores: Array<DeslPr> = $state(Array<DeslPr>(6).fill(
      { id: "a",
        min: "-5",
      max: "5",
      step:".1",
      value: "-2",
    }));
  
  deslizadores.forEach((desl, ind) => {
    const ids=["a", "b", "c", "d", "e", "f"];
    desl.id= ids[ind];
    desl.value= (ind - 3).toString();
  });
  
  let deslProps: DeslPr= $state({
    id: "a",
    min: "-5",
    max: "5",
    step:".1",
    value: "-2",
  });

  let {apagaTutor} =$props();


  let textosCont= ["Revisa gráficamente cuántas raices reales tiene un polinomio."
                + "<br> Elige un tipo de polinomio.",
                "Mueve los deslizadores para observar cómo cambia el número"
                + " de raices de: ",
                "Cuando termines de explorar, oprime Continuar para responder" 
                + " algunas preguntas relacionadas con las raices.",
                "Escribe un valor para el parámetro @a " +
                "donde se tengan @n raices distintas. @a = ", 
                "Escribe un valor para el parámetro @a" + 
                " donde haya una raíz doble. @a = ",
                "Escribe un valor para el parámetro @a" + 
                " donde no tenga raices reales. @a = ",
                "Ahora dame el mayor intervalo de valores de @a" + 
                " donde se tengan @n raices distintas."
              ];
  let textosTarj=$state( ['Raices', 'Número de Raices', textosCont[0]]);
  const guardaTT= textosTarj.slice();
  const guardaTC= textosCont.slice();
  let textosMult: Array<string> = $state(Array<string>());
  
  let fun: funR;
  let infpol: InfijaAPolacaFR;
  let IsOpenSeq= $state([ true, false, false]);


  let pF: paramF;

  const procesaPolGrado5= (cad: string, ind: string) => {
    infpol= ConstruyeFunParamFijos(cad, deslizadores);
    let funRac=InfijaAPolacaFR.EvalFuncRac(infpol.postFija, infpol.variables);
    let coefs= funRac !== undefined ? funRac.coefs : new Array<number>;
    fun= (x: number) => {
        infpol.variables["x"]=x;
        return InfijaAPolacaFR.Eval(infpol.postFija, infpol.variables);
    }
    const board= getBrd();
    let polin= new Polinomio(coefs);
    let cadPolin= polin.toString(true);
    let cadLatex= cadPolin.replaceAll("**", "^");
    latex= "h(x)=" + cadLatex.replaceAll("*", ""); // para mostrar en mathquill
    const url = 'http://127.0.0.1:5000/api/v1/raices_reales/' + cadPolin;
		const respPromesa = fetch(url, { method: 'GET', mode: 'cors' });
    respPromesa.then((response) => {
      if (!response.ok) {
        throw new Error('Error en la solicitud: ' + response.status);
      }
      return response.json();
    }).then((data) => {
      let raices= ArrNum(data.raices);
      pF={
        func: fun,
        name: "f(x)",
        color: "red",
        raices: raices,
        traza: false,
        ventana: {
          axis: true,
          boundingbox: board.getBoundingBox(),
        },
        idFuns: [],
        idRaices:[],
      };
      BorraObjGraficos(board, pF);
      pF.idFuns.push(board.create('functiongraph', [fun]));
      GraficaRaices(board, pF);
    }).catch((error) => {
      console.error('Error:', error);
    });
  }

  const opcion= (e: MouseEvent) => {
    let ind= e.currentTarget.id;
    let cad=arrLatex[ind];
    IsOpenSeq[0]=false;
    IsOpenSeq[1]=true;
    textosTarj[2]=textosCont[1];
    latex= cad;
    cad= cad.split('=')[1]; // lo que esta despues del igual
    cad= TeXToLinealPyt.insertaAster(cad);
    if (ind === "2") {
      procesaPolGrado5(cad, ind);
      return;
    }
    deslProps.id= ind === "0"? "a" : "b";
    infpol=ConstruyeFunParFijo(cad, deslProps);
    let funRac=InfijaAPolacaFR.EvalFuncRac(infpol.postFija, infpol.variables);
    let coefs= new Array<number>;
    if (funRac !== undefined) {
      coefs= funRac.coefs;  
    }
    fun= (x: number) => {
        infpol.variables["x"]=x;
        return InfijaAPolacaFR.Eval(infpol.postFija, infpol.variables);
      }

    const board= getBrd();
    let brdAttributes= {
      axis: true,
      boundingbox: board.getBoundingBox(),
    }

    pF={
      func: fun,
      name: "f(x)",
      color: "red",
      raices: Raices(coefs),
      traza: false,
      ventana: brdAttributes,
      idFuns: [],
      idRaices:[],
    };
    
    BorraObjGraficos(board, pF);
    pF.idFuns.push(board.create('functiongraph', [fun]));
    GraficaRaices(board, pF);
  }

  const contyPreg= (e: Event): void => {
    IsOpenSeq[1]=false;
    IsOpenSeq[2]=true; 
    textosTarj[2]='';
    const nomParam= "<strong><i>" +  deslProps.id + "</i></strong>";
    const numRaices= deslProps.id === "a" ? "2" : "3"; 
    textosCont[3]=textosCont[3].replaceAll("@a", nomParam);
    textosCont[3]=textosCont[3].replaceAll("@n", numRaices);
    textosCont[4]=textosCont[4].replaceAll("@a", nomParam);
    textosCont[5]=textosCont[5].replaceAll("@a", nomParam);
    if (deslProps.id !== "a") {
      textosCont[4]=textosCont[4].replace("doble.",
                                          "doble y una raiz simple.");
      textosCont[5]=textosCont[5].replace("no tenga raices reales.",
                                          "tenga una raiz real.");
    }
    textosMult= textosCont.slice(3, 6);
  }

  function actualizaVal (e: Event & { currentTarget: EventTarget & HTMLInputElement }): void {
    //deslProps.value= e.target ? e.target.value : deslProps.value;
    //resp1=deslProps.value;
    if (e.target === null) return;
    infpol.variables[e.target.id]=Number.parseFloat(e.target.value);
    let funRac=InfijaAPolacaFR.EvalFuncRac(infpol.postFija, infpol.variables);
    let coefs= new Array<number>;
    if (funRac !== undefined) {
      coefs= funRac.coefs;  
    }
    /* fun= (x: number) => {
      infpol.variables["x"]=x;
      return InfijaAPolacaFR.Eval(infpol.postFija, infpol.variables);
    } */
    let polin= new Polinomio(coefs);
    const cadPolin= polin.toString(true);
    let cadLatex= cadPolin.replaceAll("**", "^");
    cadLatex= cadLatex.replaceAll("*", "");
    latex= "h(x)=" + cadLatex; // para mostrar en mathquill
    const url = 'http://127.0.0.1:5000/api/v1/raices_reales/' + cadPolin;
		const respPromesa = fetch(url, { method: 'GET', mode: 'cors' });
    respPromesa.then((response) => {
      if (!response.ok) {
        throw new Error('Error en la solicitud: ' + response.status);
      }
      return response.json();
    }).then((data) => {
      let raices= ArrNum(data.raices);
      pF.raices= raices;
      const board= getBrd();
      BorraObjGraficos(board, pF);
      pF.idFuns.push(board.create('functiongraph', [fun]));
      GraficaRaices(board, pF);
    }).catch((error) => {
      console.error('Error:', error);
    });
    
  }

  function regresa () {
    IsOpenSeq[2]=false;
    IsOpenSeq[0]=true;
    textosTarj= guardaTT.slice();
    textosCont= guardaTC.slice(); // recupera contenido inicial
    BorraObjGraficos(getBrd(), pF);

  }

  onDestroy(() => {
    console.log("Destruye TutorRaices");
  });

</script>

  <TarjetaRaicesSelecFun isOpen={IsOpenSeq[0]} textos={textosTarj} {arrLatex} {opcion} {apagaTutor}/>
   <TarjetaDeslizaPar isOpen={IsOpenSeq[1]} textos={textosTarj} otrosTextos={textosCont[2]}
                    {latex} {deslizadores} {actualizaVal} {contyPreg} />
  <TarjetaPreguntaRaices {IsOpenSeq} textos={textosTarj} otrosTextos={textosMult}
                    {latex} {deslProps} {actualizaVal} {regresa}/>

