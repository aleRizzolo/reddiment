<script lang="ts">
  import "carbon-components-svelte/css/g100.css";
  import { onMount } from 'svelte';
  import { fetchComments } from '../../api.ts';
  import { DataTable, Pagination } from "carbon-components-svelte";

  let displayedRows = [];
  type Comment = {
    comment: string;
    probabilities_acceptable: string;
    probabilities_hate: string;
    probabilities_offensive: string;
    probabilities_violent: string;
    language: string;
  };
  let items: Comment[] = [];
  let rowsPerPage = 10;
  let currentPage = 0;

  let start = 0;
  let end = 0;
  let slice: Comment[] = [];
  let lastPage = 0;

  let headers: { key: string; value: string }[] = [];

  // Loading indicator flag
  let loading = true;

  // Define a function to update the derived variables
  function updateDerivedVariables() {
    start = currentPage * rowsPerPage;
    end = Math.min(start + rowsPerPage, items.length);
    slice = items.slice(start, end);
    lastPage = Math.max(Math.ceil(items.length / rowsPerPage) - 1, 0);

    // Define headers based on your data structure
    headers = [
      { key: "comment", value: "Comment" },
      { key: "probabilities_acceptable", value: "Acceptable" },
      { key: "probabilities_hate", value: "Hate" },
      { key: "probabilities_offensive", value: "Offensive" },
      { key: "probabilities_violent", value: "Violent" },
      { key: "language", value: "Language" },
    ];
  }

  onMount(async () => {
    try {
      const response = await fetchComments();
      if (response.ok) {
        const newData = await response.json();
        if (Array.isArray(newData.data)) {
          // Update items and add an ordered numeric list starting from 0
          items = newData.data.map((row, i) => ({ ...row, id: i })); // Add unique id
          // Update derived variables
          updateDerivedVariables();
        } else {
          console.error('API response data is not an array:', newData.data);
        }
      } else {
        console.error('API error:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching data:', error.message);
    } finally {
      // Set loading to false when data fetching is done
      loading = false;
    }
  });

  // Reactively update the derived variables whenever items, rowsPerPage, or currentPage changes
  $: {
    updateDerivedVariables();
  }

  // Reactively update displayedRows when slice changes
  $: {
    displayedRows = slice.map((item, index) => ({ key: index, ...item }));
  }

</script>

<!-- Loading Indicator -->
{#if loading}
  <p style="color: black; font-weight: bold;">Loading...</p>
{:else}
  <!-- Container for the responsive table (centered) -->
  <div style="overflow-x: auto; text-align: center; width: 130%; margin: 0 auto; margin-left: -15%;">
    <!-- DataTable and Pagination components -->
    <DataTable
      sortable
      title="Dataset"
      description="Welcome to the Dataset page"
      headers={headers}
      pageSize={rowsPerPage}
      page={currentPage}
      totalItems={slice.length}
      rows={items}
    >
    </DataTable>

    <Pagination
      pageSize={rowsPerPage}
      page={currentPage}
      totalItems={slice.length}
    />
  </div>
{/if}

