<!-- ImageGrid.svelte -->
<script>
	import { onMount } from 'svelte';
	import { Loading } from 'carbon-components-svelte';

	export let images = [];
	let selectedImage = null;
	let isLoading = true; // Add a loading flag

	onMount(() => {
		// Simulate loading for demonstration purposes
		setTimeout(() => {
			isLoading = false; // Set isLoading to false when the grid is initialized
		}, 2000); // Adjust the delay as needed
	});

	function openModal(image) {
		selectedImage = image;
	}

	function closeModal() {
		selectedImage = null;
	}
</script>

<div class="loading-container" style={isLoading ? 'display: flex;' : 'display: none;'}>
	<div class="loading-content">
		<p class="loading-text" style="margin-bottom: 150px; margin-left: 25px">Loading Images...</p>
		<Loading />
	</div>
</div>

<div class="image-grid" style={isLoading ? 'display: none;' : 'display: flex;'}>
	{#if images.length > 0}
		<div class="image-cards">
			{#each images as image}
				<div class="image-card" on:click={() => openModal(image)}>
					<img src={`data:image/png;base64,${image}`} alt="WordCloud" class="card-image" />
				</div>
			{/each}
		</div>
	{/if}
</div>

{#if selectedImage}
	<div class="modal" on:click={closeModal}>
		<div class="modal-content">
			<img src={`data:image/png;base64,${selectedImage}`} alt="ModalImage" />
		</div>
	</div>
{/if}

<style>
	.loading-container {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		background: rgba(0, 0, 0, 0.8);
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 999;
	}

	.loading-content {
		display: flex;
		align-items: center;
	}

	.loading-text {
		color: white;
		font-weight: bold;
		text-align: center;
		margin-right: 16px;
	}

	.image-grid {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 16px;
		padding: 16px;
	}

	.image-cards {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
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

	.card-image {
		max-width: 100%;
		max-height: 100%;
		display: block;
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
