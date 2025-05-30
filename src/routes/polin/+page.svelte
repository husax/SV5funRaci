<script lang="ts">
	import { onDestroy} from "svelte";
  import Cabeza from "$lib/components/Cabeza.svelte";
  import PolinCpo from "./components/PolinCpo.svelte";
  import { Styles } from "@sveltestrap/sveltestrap";
  import  MathQuillSetup  from "$lib/components/MathQuillSetup.svelte";
	import JSXSetup from "$lib/components/JSXSetup.svelte";
  import type {DatosHead} from "$lib/tools/tipos";

	let datosH: DatosHead= {
		funcTipo: "Polinomiales",
		tarea: "",
		titMnu: "",
		opcMnu: [],
	}
	onDestroy( () => {
  console.log("destruyó componente page.svelte de polin");
});

</script>

<Styles />
<MathQuillSetup />
<JSXSetup/>
<div>
  <Cabeza {datosH}/>
	<PolinCpo />
</div>