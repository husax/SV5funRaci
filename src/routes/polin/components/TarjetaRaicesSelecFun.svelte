<script lang="ts">
  import Tarjeta from './Tarjeta.svelte';
  import { ListGroup, ListGroupItem } from '@sveltestrap/sveltestrap';
  import MathQuillStatic  from "$lib/components/MathQuillStatic.svelte";
  interface Props {
    isOpen: boolean;
    textos: Array<string>;
    arrLatex: Array<string>;
    opcion: any;
  }

  let {
    isOpen,
    textos,
    arrLatex,
    opcion
  }: Props = $props();

</script>

<Tarjeta {isOpen} {textos}>
  <ListGroup>
    {#each arrLatex as latex, ind }
      <ListGroupItem tag="button" id={ind.toString()} on:click={opcion} >
        <MathQuillStatic {latex} idCaja="tajRaices" />
      </ListGroupItem>          
    {/each}
    <ListGroupItem tag="button" href="#" action >
      Otro Polinomio
    </ListGroupItem>
  </ListGroup>
</Tarjeta>
