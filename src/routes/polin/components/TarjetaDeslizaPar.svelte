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

  function actualiza(e: Event & { currentTarget: EventTarget & HTMLInputElement }) :void{
    actualizaVal(e);
    MQref.latex(latex);
  }

</script>

<Tarjeta {isOpen} {textos}>
    <div class="centra">
      <MathQuillStatic {latex} bind:MQref={MQref} />
    </div>
  {#each deslizadores as desl (desl.id) }
    <Deslizador valor={desl.value} deslProps={desl}  actualizaVal={actualiza}/>
  {/each}
  <div class="separa">
    {otrosTextos}
  </div>
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