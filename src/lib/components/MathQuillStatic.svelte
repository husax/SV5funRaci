<script lang="ts">
  import { onMount } from "svelte";
  import mathQuill from "@openwebwork/mathquill";

  let { latex } = $props();
  onMount(() =>{
  const MQ = mathQuill.getInterface();
  const caja=document.getElementById("cajafija");
  if (!caja) {
    console.error("Elemento no encontrado");
    return;
  }
  MQ.StaticMath(caja);
});
</script>

<span id="cajafija" class="bordeSpan">{latex}</span>

<style>
  .bordeSpan {
    border: 2px solid rgb(75, 6, 27);
    padding: 0.2em;
  }
</style>

