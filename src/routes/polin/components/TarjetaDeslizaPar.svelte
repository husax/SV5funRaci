<script lang="ts">
  import Tarjeta from './Tarjeta.svelte';
  import {Button } from '@sveltestrap/sveltestrap';
  import  MathQuillStatic  from "$lib/components/MathQuillStatic.svelte";
  import  MathQuillEdit  from "$lib/components/MathQuillEdit.svelte";
  import Deslizador from "$lib/components/Deslizador.svelte";
  import type { DeslPr, funEvent, funEventInput } from '$lib/tools/tipos';
  interface Props {
    isOpen: boolean;
    textos: Array<string>;
    otrosTextos: string;
    latex: string;
    deslizadores: Array<DeslPr>;
    actualizaVal: funEventInput;
    contyPreg: funEvent;
  }

  let {
    isOpen,
    textos,
    otrosTextos,
    latex,
    deslizadores,
    actualizaVal,
    contyPreg
  }: Props = $props();

  let MQref: any = $state(null);

  //let
  function filtro(e: any) {
    const teclasEsp = [
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
      "Delete",
      "Enter",
      "Insert",
      "Backspace",
      "Home",
      "End",
    ];
    const caracAcep = "0123456789x+-/*^()=.sqrtpi";
    if (teclasEsp.indexOf(e.key) !== -1 || caracAcep.indexOf(e.key) !== -1) {
      return;
    }
    // impide que se realice la acción por defecto del evento
    e.preventDefault();
  }

  let config= {
    charsThatBreakOutOfSupSub: "+-()",
    autoCommands: "pi sqrt",
  };


  function actualiza(e: Event & { currentTarget: EventTarget & HTMLInputElement }) :void{
    actualizaVal(e);
    MQref.latex(latex);
  }

</script>

<Tarjeta {isOpen} {textos}>
  {#if isOpen}
    <div class="centra">
      <MathQuillStatic {latex} bind:MQref={MQref} />
    </div>
  {/if}
  
  {#each deslizadores as desl (desl.id) }
    <Deslizador valor={desl.value} deslProps={desl}  actualizaVal={actualiza}/>
  {/each}
  <div class="separa">
    {otrosTextos}
  </div>
  <p class="centra">{latex}</p>
  <div class="separa">
    <Button outline color="success" on:click={contyPreg}>Continuar</Button>
  </div>
</Tarjeta>

<style>
  .centra {
    line-height: 2;
    display: inline-block;
    margin-left: 40px;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }
  .separa {
    margin-top: 1rem;
    margin-bottom: 1rem;
    display:flex;
    justify-content: end;
  }
</style>