<!-- @migration-task Error while migrating Svelte code: Can't migrate code with beforeUpdate. Please migrate by hand. -->
<script lang="ts">
import JXG from '../tools/jsxgraphcore.mjs';
import { onMount, beforeUpdate, onDestroy} from 'svelte';
import { brd } from '../tools/Almacen';

export let boardAttributes= {
  axis: true,
  boundingbox: [-10, 10, 10, -10]
};
export let jxgCajaId: string;

onMount( () => {
  let board= JXG.JSXGraph.initBoard(jxgCajaId, boardAttributes);
  brd.set(board);
});

onDestroy( () => {
  console.log("destruyó componente JsxGraph");
  brd.set(undefined);
});

beforeUpdate(() => {
  if ($brd !== undefined) {
    $brd.setBoundingBox(boardAttributes.boundingbox);
  }
});

console.log("version jsxgraph:", JXG.version);

//export {brd};
</script>
<div id={jxgCajaId} class="jxgbox" ></div>

<style>
  div {
    width: 100%;
    height: 45em;
    border: 3px solid green;
  }
</style>