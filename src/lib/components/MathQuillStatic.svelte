<script lang="ts">
  import { onMount } from "svelte";
  import mathQuill from "@openwebwork/mathquill";

  interface Props {
    latex: string;
    idCaja: string;
  }

  let { latex, idCaja } = $props();
  onMount(() =>{
  const MQ = mathQuill.getInterface();
  const caja=document.getElementById(idCaja);
  if (!caja) {
    console.error("Elemento no encontrado");
    return;
  }
  MQ.StaticMath(caja);
});
</script>

<span id={idCaja} class="bordeSpan">{latex}</span>

<style>
  .bordeSpan {
    border: 2px solid rgb(75, 6, 27);
    padding: 0.2em;
  }
</style>

