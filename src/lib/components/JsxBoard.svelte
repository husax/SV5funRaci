<!-- @migration-task Error while migrating Svelte code: Can't migrate code with beforeUpdate. Please migrate by hand. -->
<script lang="ts">
  import JXG from 'jsxgraph';
  import { onMount, onDestroy} from 'svelte';
  
  import { setBrd } from '$lib/tools/EstadosGlobales.svelte';

  let { boardAttributes, jxgCajaId = 'jxgbox' } = $props();

  
  onMount( () => {
    let board=JXG.JSXGraph.initBoard(jxgCajaId, boardAttributes);
    //board.setBoundingBox(boardAttributes.boundingbox);
    setBrd(board);
    console.log("montó componente JsxGraph");
    console.log("version jsxgraph:", JXG.version);
  });

  onDestroy( () => {
    console.log("destruyó componente JsxGraph");
    setBrd({} as JXG.Board); // Reset the board state
  });

</script>

<div id={jxgCajaId} class="jxgbox" ></div>

<style>
  div {
    width: 100%;
    height: 45em;
    border: 2px solid green;
    border-radius: 8px;
  }
</style>