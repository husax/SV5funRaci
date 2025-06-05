<script lang="ts">
  import { onMount } from "svelte";
  import mathQuill from "@openwebwork/mathquill";

  interface Props {
    latex: string;
  }

  let { latex } : Props = $props();
  let caja: HTMLSpanElement | null = null;

  onMount(() =>{
    const MQ = mathQuill.getInterface();
    if (!caja) {
      console.error("no se hizo el bind de caja al span creado en MathQuillStatic");
      return;
    } 
    MQ.StaticMath(caja);
});
</script>

<span bind:this={caja} class="bordeSpan">{latex}</span>

<style>
  .bordeSpan {
    border: 2px solid rgb(75, 6, 27);
    padding: 0.2em;
  }
</style>

