<script lang="ts">
	import type { EditorStore } from '$lib/stores/editor';
	import { fly } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';
	import Modal from '../Modal.svelte';
	import TextField from '../TextField.svelte';

	export let editor: EditorStore;
	export let showSaveModal: boolean;

	const dispatch = createEventDispatcher();

	let password = '';
	let campaignId = '';

	const handleSaveLevel = async () => {
		const response = await fetch('/editor', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				password,
				campaignId: campaignId === '' ? null : campaignId,
				level: $editor
			})
		});
		console.log(await response.text());

		dispatch('close');
	};
</script>

{#if showSaveModal}
	<div class="modal" transition:fly={{ duration: 200, y: -10 }}>
		<Modal
			title="Save level"
			closeButton={true}
			on:close={() => dispatch('close')}
			on:confirm={handleSaveLevel}
		>
			<form class="modal-content" on:submit|preventDefault={handleSaveLevel}>
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label>
					Password
					<TextField bind:value={password} />
				</label>

				<!-- svelte-ignore a11y_label_has_associated_control -->
				<label>
					Campaign ID (optional)
					<TextField bind:value={campaignId} />
				</label>
			</form>
		</Modal>
	</div>
{/if}

<style lang="scss">
	.modal {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 100;
		color: var(--black);
	}
</style>
