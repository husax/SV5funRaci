<script lang="ts">
	import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from '@sveltestrap/sveltestrap';
	//import { createEventDispatcher } from 'svelte';

	interface Props {
		isOpen: boolean;
		msg: string;
		headMsg: string;
		bgColor: string;
	}

	let {
		isOpen = $bindable(),
		msg,
		headMsg,
		bgColor
	}: Props = $props();
	const toggle = () => (isOpen = !isOpen);

	//const dispatch = createEventDispatcher();

	let colorBoton= $derived(bgColor.slice(3));
/* 
	function Cierra() {
		toggle();
		dispatch('cierra', {
			valor: false
		});
	}
 */
</script>
<div>
	<Modal {isOpen} backdrop={false} {toggle}>
		<ModalHeader class={bgColor} toggle={toggle}> <!-- el valor de toglle era Cierra veamos si no lo necesita -->
			{headMsg}</ModalHeader>
		<ModalBody>{msg}</ModalBody>
		<ModalFooter>
			<Button color={colorBoton} on:click={toggle}>Cerrar</Button>
		</ModalFooter>
	</Modal>
</div>
