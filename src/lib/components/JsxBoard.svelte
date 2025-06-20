<!-- @migration-task Error while migrating Svelte code: Can't migrate code with beforeUpdate. Please migrate by hand. -->
<script lang="ts">
  import JXG from '../tools/jsxgraphcore.mjs';
  import { onMount, onDestroy} from 'svelte';
  //import { brd } from '../tools/Almacen';
  import { getBrd, setBrd } from '$lib/tools/EstadosGlobales.svelte';

  let { boardAttributes, jxgCajaId = 'jxgbox' } = $props();

  /* 
  export let boardAttributes= {
    axis: true,
    boundingbox: [-10, 10, 10, -10]
  };
  export let jxgCajaId: string;
 */
  onMount( () => {
    let board=JXG.JSXGraph.initBoard(jxgCajaId, boardAttributes);
    //board.setBoundingBox(boardAttributes.boundingbox);
    setBrd(board);
    console.log("montó componente JsxGraph");
    console.log("version jsxgraph:", JXG.version);
  });

  onDestroy( () => {
    console.log("destruyó componente JsxGraph");
    setBrd(null);
  });

</script>

<div id={jxgCajaId} class="jxgbox" ></div>

<style>
  div {
    width: 100%;
    height: 45em;
    border: 3px solid green;
  }
</style>