<!-- Componente que permite editar una expresión matemática en formato LaTeX -->
<script lang='ts'>
  import { onMount, onDestroy } from "svelte";
  import mathQuill from "@openwebwork/mathquill";

  let { latex = $bindable(), config, filtro } = $props();

onMount(() =>{
  const MQ = mathQuill.getInterface();
  const caja=document.getElementById("cajaSpan");
  if (!caja) {
    console.error("Elemento no encontrado");
    return;
  }
  config.handlers={
      edit: (mathField) => {latex = mathField.latex()}
    };
  const mathField = MQ.MathField(caja, config);
  mathField.latex(latex);
  mathField.focus();
  mathField.moveToRightEnd();
});
onDestroy(() => {
  console.log("se destruye al aceptar");
});
</script>

<span id="cajaSpan"
  role="textbox"
  tabindex="0"
  class="bordeSpan"
  onkeydown={filtro}
></span>

<style>
  .bordeSpan {
    border: 2px solid rgb(22, 164, 105);
    padding: 0.2em;
  }
</style>