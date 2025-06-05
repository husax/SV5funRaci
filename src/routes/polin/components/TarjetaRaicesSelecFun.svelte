<script lang="ts">
  import Tarjeta from './Tarjeta.svelte';
  import { Button, ListGroup, ListGroupItem } from '@sveltestrap/sveltestrap';
  import MathQuillStatic  from "$lib/components/MathQuillStatic.svelte";
  interface Props {
    isOpen: boolean;
    textos: Array<string>;
    arrLatex: Array<string>;
    opcion: any;
    apagaTutor: any;
  }

  let {
    isOpen,
    textos,
    arrLatex,
    opcion,
    apagaTutor
  }: Props = $props();

</script>

<Tarjeta {isOpen} {textos}>
  <ListGroup>
    {#each arrLatex as latex, ind }
      <ListGroupItem color="primary" tag="button" id={ind.toString()} onclick={opcion} >
        <MathQuillStatic {latex} />
      </ListGroupItem>          
    {/each}
    <ListGroupItem color="primary" tag="button" href="#" action >
      Otro Polinomio
    </ListGroupItem>
    <ListGroupItem color="secondary" tag="button" onclick={apagaTutor}>
      Regresa
    </ListGroupItem>
  </ListGroup>
</Tarjeta>
