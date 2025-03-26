<script lang="ts">
  import Cabeza from "$lib/components/Cabeza.svelte";
  // import Cuerpo from "./components/Cuerpo.svelte";
	import { MathQuillSetup } from "svelte-mathquill";
	import JSXSetup from "$lib/components/JSXSetup.svelte";
  import { Styles } from "@sveltestrap/sveltestrap";
	import type { DatosHead, OptMenu } from "$lib/tools/tipos";
	const opc: OptMenu[] = [
			{
				href: "/polin",
				texto: "Polinomiales"
			},
			{
				href: "#home",
				texto: "Racionales"
			},
			{
				href: "#home",
				texto: "Radicales"
			}
		];
	const datosH: DatosHead= {
		funcTipo: "Racionales",
		tarea: "",
		titMnu: "Funciones",
		opcMnu: opc
		/* [
			{
				href: "/polin",
				texto: "Polinomiales"
			},
			{
				href: "#home",
				texto: "Racionales"
			},
			{
				href: "#home",
				texto: "Radicales"
			}
		] */
	};

</script>

<Styles />
<MathQuillSetup/>
<JSXSetup/>
<div>

  <Cabeza {datosH} />
	<!-- <Cuerpo /> -->
</div>
