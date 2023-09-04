<	import type { DataTableRow } from 'carbon-components-svelte/types/DataTable/DataTable.svelte';
script lang="ts">
	import 'carbon-components-svelte/css/g100.css';
	import { onMount } from 'svelte';
	import { fetchComments } from '../../api';
	import { DataTable, Pagination, ProgressBar } from 'carbon-components-svelte';
	import type { Comment } from './type';

	let displayedRows: Comment[] | readonly DataTableRow[] | undefined = [];
	let items: Comment[] = [];
	let rowsPerPage = 10;
	let currentPage = 1;

	let start = 0;
	let end = 0;
	let slice: Comment[] = [];
	let lastPage = 0;

	let headers: { key: string; value: string }[] = [];

	// Loading indicator flag
	let loading = true;
	let searchTerm = '';

	// Define a function to update the derived variables
	function updateDerivedVariables() {
		start = currentPage * rowsPerPage;
		end = Math.min(start + rowsPerPage, items.length);
		slice = items.slice(start, end);
		lastPage = Math.max(Math.ceil(items.length / rowsPerPage) - 1, 0);

		headers = [
			{ key: 'comment', value: 'Comment' },
			{ key: 'probabilities_acceptable', value: 'Acceptable' },
			{ key: 'probabilities_hate', value: 'Hate' },
			{ key: 'probabilities_offensive', value: 'Offensive' },
			{ key: 'probabilities_violent', value: 'Violent' },
			{ key: 'language', value: 'Language' }
		];
	}

	let sortable = false; // Set to true if you want sorting functionality
	let sortableColumn = ''; // Define the default sortable column key

	// Function to handle column sorting
	function handleColumnSort(columnKey: string) {
		if (columnKey === sortableColumn) {
			sortable = !sortable;
		} else {
			sortableColumn = columnKey;
			sortable = true; 
		}
	}

	let filterKey = ''; // Define the default filter key (e.g., 'offensive')
	let filterValue = 0; // Define the default filter value (e.g., 50)

	// Function to set the filter criteria
	function setFilterCriteria(key: string, value: number) {
		filterKey = key;
		filterValue = value;
	}

	// Define function to filter comments based on offensive percentage
	function filterComments(filterKey: string, filterValue: number) {
		displayedRows = slice.filter((item) => {
			if (filterKey === 'offensive') {
				const offensivePercentage = parseFloat(
					item.probabilities_offensive.trim().replace('%', '')
				);
				return !isNaN(offensivePercentage) && offensivePercentage >= filterValue;
			}
		});
	}

	// Function to handle search
	function handleSearch() {
		const filteredItems = slice.filter((items) =>
			items.comment.toLowerCase().includes(searchTerm.toLowerCase())
		);

		const sortedItems = sortable
			? filteredItems.slice().sort((a, b) => {
					const aValue = a[sortableColumn];
					const bValue = b[sortableColumn];
					return aValue - bValue;
			  })
			: filteredItems;

		displayedRows = sortedItems.map((item, index) => ({ key: index, ...item }));

		const dummy = Math.random(); 
	}

	onMount(async () => {
		try {
			const response = await fetchComments();
			if (response.ok) {
				const newData = await response.json();
				if (Array.isArray(newData.data)) {
					items = newData.data.map((row: any, i: any) => ({ ...row, id: i }));
					updateDerivedVariables();
				} else {
					console.error('API response data is not an array:', newData.data);
				}
			} else {
				console.error('API error:', response.statusText);
			}
		} catch (error) {
			if (error instanceof Error) console.error('Error fetching data:', error.message);
		} finally {
			loading = false;
		}
	});

	// Reactively update the derived variables whenever items, rowsPerPage, or currentPage changes
	$: {
		updateDerivedVariables();
	}

	$: {
		handleSearch(); 
</>

{#if loading}
	<p style="color: white; font-weight: bold; text-align: center;">Loading...</p>
	<ProgressBar size="sm" />
{:else}
	<div
		style="overflow-x: auto; text-align: center; width: 130%; margin: 0 auto; margin-left: -15%;"
	>
		<div class="row">
			<div class="col">
				<input
					type="text"
					class="form-control"
					placeholder="Search..."
					bind:value={searchTerm}
					on:input={handleSearch}
				/>
			</div>
			<div class="col">
				<h1 style="color: white; font-weight: bold; text-align: center;">Dataset</h1>
			</div>
			<div class="col">
				<div class="dropdown">
					<button
						class="btn btn-secondary dropdown-toggle"
						type="button"
						id="filterDropdown"
						data-bs-toggle="dropdown"
						aria-expanded="false"
					>
						Filter
					</button>
					<ul class="dropdown-menu" aria-labelledby="filterDropdown">
						<li>
							<a class="dropdown-item" on:click={() => setFilterCriteria('offensive', 50)}>
								Offensive >= 50%
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>

		<DataTable
			zebra
			sortable
			{headers}
			pageSize={rowsPerPage}
			page={currentPage}
			rows={searchTerm ? displayedRows : items}
		/>

		<Pagination
			bind:pageSize={rowsPerPage}
			bind:page={currentPage}
			totalItems={items.length}
			pageSizes={[10, 15, 20, 25, 50, 100]}
		/>
	</div>
{/if}
