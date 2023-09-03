<script>
	import { onMount } from 'svelte';
	// @ts-ignore
	import Carousel from 'svelte-carousel';
	import { fetchBarChart, fetchBarGraph, fetchHistogram, fetchScatter } from '../../api';
	import { ProgressBar } from 'carbon-components-svelte';

	/**
	 * @type {string | any[]}
	 */
	let images = [];

	// Initialize the carousel once, outside of onMount
	onMount(() => {
		fetchData();
	});

	async function fetchData() {
		try {
			const barChartData = await fetchBarChart();
			const barGraphData = await fetchBarGraph();
			const histogramData = await fetchHistogram();
			const scatterData = await fetchScatter();

			// Combine images from all APIs into a single array
			images = [...barChartData, ...barGraphData, ...histogramData, ...scatterData];
		} catch (error) {
			if (error instanceof Error) console.error('Error fetching graphs:', error.message);
		}
	}
</script>

{#if images.length > 0}
	<Carousel
		autoplay
		autoplayDuration={5000}
		pauseOnFocus
		autoplayProgressVisible
		let:showPrevPage
		let:showNextPage
	>
		{#each images as image}
			<img src={`data:image/png;base64,${image}`} alt="Graphs" />
		{/each}
	</Carousel>
{:else}
	<p style="color: black; font-weight: bold; text-align: center;">Loading images...</p>
	<ProgressBar />
{/if}
