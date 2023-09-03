<!-- ImageGrid.svelte -->
<script>
	import { onMount } from 'svelte';
	import { ProgressBar } from 'carbon-components-svelte';

	export let images = [];
	let selectedImage = null;

	function openModal(image) {
		selectedImage = image;
	}

	function closeModal() {
		selectedImage = null;
	}
</script>

<div class="image-grid">
	{#if images.length <= 0}
		<p style="color: white; font-weight: bold; text-align: center;">Loading Images...</p>
		<ProgressBar size="sm" />
	{/if}
	{#if images.length > 0}
		{#each images as image}
			<div class="image-card" on:click={() => openModal(image)}>
				<img src={`data:image/png;base64,${image.image_base64}`} alt="WordCloud" />
			</div>
		{/each}
	{/if}

	{#if selectedImage}
		<div class="modal" on:click={closeModal}>
			<div class="modal-content">
				<img src={`data:image/png;base64,${selectedImage.image_base64}`} alt="ModalImage" />
			</div>
		</div>
	{/if}
</div>

<style>
	.image-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 16px;
	}

	.image-card {
		cursor: pointer;
		border: 1px solid #ffffff;
		padding: 8px;
		border-radius: 4px;
		transition: transform 0.2s ease-in-out;
	}

	.image-card:hover {
		transform: scale(1.1);
	}

	.modal {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.8);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 999;
	}

	.modal-content {
		max-width: 80%;
		max-height: 80%;
	}
</style>
