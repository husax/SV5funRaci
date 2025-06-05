<!-- Componente que permite editar una expresión matemática en formato LaTeX -->
<script lang='ts'>
  import { onMount, onDestroy } from "svelte";
  import mathQuill from "@openwebwork/mathquill";

  let { latex = $bindable(), config, filtro } = $props();

  let idCaja: HTMLSpanElement | null = null;

onMount(() =>{
  const MQ = mathQuill.getInterface();
  if (!idCaja) {
    console.error("no se hizo el bind de idcaja al span creado en MathQuillEdit");
    return;
  }
  config.handlers={
      edit: (mathField) => {latex = mathField.latex()}
    };
  const mathField = MQ.MathField(idCaja, config);
  mathField.latex(latex);
  mathField.focus();
  mathField.moveToRightEnd();
});
onDestroy(() => {
  console.log("se destruye al aceptar");
});
</script>

<span bind:this={idCaja}   
  role="textbox"
  tabindex="0"
  class="bordeSpan"
  onkeydown={filtro}
></span>

<style>
  .bordeSpan {
    border: 1px solid rgb(22, 164, 105);
    padding: 0.2em;
  }
</style>