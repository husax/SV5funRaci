<script lang="ts">
  import { InputGroup, InputGroupText, Button } from "@sveltestrap/sveltestrap";
  import MathQuillEdit from "./MathQuillEdit.svelte";
  import MathQuillStatic from "./MathQuillStatic.svelte";
  interface Props {
    latex: string;
    editaFun: boolean;
    clicBoton: () => void;
  }

  let { latex = $bindable(), editaFun= $bindable(), clicBoton}: Props = $props();
  console.log(editaFun);
  //let editaFun = $state(!disabled);

  function toggle() {
    editaFun=!editaFun;
    clicBoton();  
  }

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
  console.log(latex);
</script>

<InputGroup size="lg" class="mb-3">
  <InputGroupText id="basic-addon1">P(x) =</InputGroupText>
  {#if editaFun}
    <MathQuillEdit bind:latex={latex} {config} {filtro} idCaja="cajaMathEdit" />
  {:else}
    <MathQuillStatic {latex} idCaja="cajaMath"/>
  {/if}
  <Button color={"success"} size="sm" onclick={toggle}>
    {editaFun ? "Aceptar" : "Cambia función" }
  </Button>
</InputGroup>

