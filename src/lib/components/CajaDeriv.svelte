<script lang="ts">
  import { Button, ListGroup, ListGroupItem } from "@sveltestrap/sveltestrap";
  import { funRac, idFuns, idObjs, animaTangId } from "../tools/Almacen";
  import { getBrd } from "$lib/tools/EstadosGlobales.svelte";
  import {
    AgregaGrafica,
    BorraRectaTang,
    BorraGrafDer,
    MuestraRT,
  } from "../tools/TrazosJSXGraph";
  import MathQuillStatic from "./MathQuillStatic.svelte";
	import type { paramFunR } from "$lib/tools/tipos";

  interface Props {
    latex: string;
    animaRectaTang: Function;
  }

  let { latex, animaRectaTang }: Props = $props();
  let siGraf: boolean = $state(false);
  let siRectaTan = $state(false);

  const GrafDer = () => {
    let paramFunc : paramFunR = {
      func: (x: number) => $funRac.Derivada().Evalua(x),
      name: "P'",
      color: "red",
      idFuns: $idFuns,
    };
    idFuns.update(() => AgregaGrafica(getBrd(), paramFunc));
  };

  const GrafDerONo = () => {
    if (siGraf) {
      GrafDer();
    } else {
      BorraGrafDer(getBrd(), $idFuns);
    }
  };

  const muestraRectaTang = () => {
    let param = {
      func: $idFuns[0],
      deriv: (x: number) => $funRac.Derivada().Evalua(x),
      color: "blue",
      idObjs: $idObjs,
    };
    idObjs.update(() => MuestraRT(getBrd(), param));
  };

  const GrafTangONo = () => {
    if (siRectaTan) {
      muestraRectaTang();
    } else {
      BorraRectaTang(getBrd(), $idObjs);
    }
  };
</script>

<div class="cajaAc">
  <MathQuillStatic {latex} />
  <ListGroup class="list-group-horizontal">
    <ListGroupItem>
      <input
        type="checkbox"
        name="grafica"
        bind:checked={siGraf}
        onchange={GrafDerONo}
      />
      <label for="grafica">Ver gráfica</label>
    </ListGroupItem>
    <ListGroupItem>
      <input
        type="checkbox"
        name="tangente"
        bind:checked={siRectaTan}
        onchange={GrafTangONo}
      />
      <label for="tangente">Ver Tangente</label>
      <Button
        color={"success"}
        size="sm"
        disabled={!siRectaTan}
        on:click={() => {
          if ($animaTangId === 0) {
            animaRectaTang();
            //iniciaVerTan = "Deten Anima Tangente";
          } else {
            window.cancelAnimationFrame($animaTangId);
            //iniciaVerTan = "Anima Tangente";
            animaTangId.set(0);
          }
        }}
      >
        <!--{iniciaVerTan} -->
        {$animaTangId !== 0 ? "Deten Anima Tangente" : "Anima Tangente"}
      </Button>
    </ListGroupItem>
  </ListGroup>
</div>

<style>
  .cajaAc {
    margin-top: 0px;
    margin-bottom: 0px;
    padding-top: 0px;
    padding-bottom: 0px;
    overflow-x: auto;
  }
</style>
