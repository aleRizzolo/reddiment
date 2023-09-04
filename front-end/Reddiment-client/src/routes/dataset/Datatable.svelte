<script lang="ts">
	import 'carbon-components-svelte/css/g100.css';
	import { onMount } from 'svelte';
	import { fetchComments } from '../../api';
	import { DataTable, Pagination, ProgressBar } from 'carbon-components-svelte';
	import type { Comment } from './type';

	let displayedRows = [];
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

		// Define headers based on your data structure
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
		// Toggle sorting direction if the same column is clicked again
		if (columnKey === sortableColumn) {
			sortable = !sortable;
		} else {
			sortableColumn = columnKey;
			sortable = true; // Enable sorting for the clicked column
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
		// Implement your filtering logic here
		displayedRows = slice.filter((item) => {
			if (filterKey === 'offensive') {
				const offensivePercentage = parseFloat(
					item.probabilities_offensive.trim().replace('%', '')
				);
				return !isNaN(offensivePercentage) && offensivePercentage >= filterValue;
			}
			// Add more filter logic for other options if needed
		});
	}

	// Function to handle search
	function handleSearch() {
		const filteredItems = slice.filter((item) =>
			item.comment.toLowerCase().includes(searchTerm.toLowerCase())
		);

		// Apply sorting logic if sortable
		const sortedItems = sortable
			? filteredItems.slice().sort((a, b) => {
					const aValue = a[sortableColumn];
					const bValue = b[sortableColumn];
					return aValue - bValue; // Implement your sorting logic here
			  })
			: filteredItems;

		displayedRows = sortedItems.map((item, index) => ({ key: index, ...item }));

		// Force a reactivity update by changing a variable (e.g., a dummy variable)
		const dummy = Math.random(); // Change a variable to trigger reactivity
	}

	onMount(async () => {
		try {
			const response = await fetchComments();
			if (response.ok) {
				const newData = await response.json();
				if (Array.isArray(newData.data)) {
					// Update items and add an ordered numeric list starting from 0
					items = newData.data.map((row: any, i: any) => ({ ...row, id: i }));
					// Update derived variables
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
			// Set loading to false when data fetching is done
			loading = false;
		}
	});

	// Reactively update the derived variables whenever items, rowsPerPage, or currentPage changes
	$: {
		updateDerivedVariables();
	}

	$: {
		handleSearch(); // Call the handleSearch function to update displayedRows
	}
</script>

<!-- Loading Indicator -->
{#if loading}
	<p style="color: white; font-weight: bold; text-align: center;">Loading...</p>
	<ProgressBar size="sm" />
{:else}
	<!-- Container for the responsive table (centered) -->
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
						<!-- Add more filter options here -->
					</ul>
				</div>
			</div>
		</div>

		<!-- DataTable and Pagination components -->
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
