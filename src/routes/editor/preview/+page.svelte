<script lang="ts">
	import LevelPlayer from '$lib/components/LevelPlayer.svelte';
	import { createEditorStore } from '$lib/stores/editor';

	const editor = createEditorStore();
</script>

<svelte:head>
	<title>Level editor - Preview</title>
</svelte:head>

<LevelPlayer
	puzzle={{ data: $editor, id: 'test', version: '2', publishedAt: new Date() }}
	preview={false}
/>
