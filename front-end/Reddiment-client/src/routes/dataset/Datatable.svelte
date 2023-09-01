<script>
  import SvelteTable from "svelte-table";
  import { onMount } from 'svelte';

  let sortBy = ""; // Initially no sorting
  let sortOrder = 1;
  let iconAsc = "↑";
  let iconDesc = "↓";
  let selectedCols = []; // Columns will be dynamically created based on JSON data
  let numRows = 10;
  let data = [];

  const COLUMNS = {}; // Define an empty columns object

  $: cols = selectedCols.map(key => COLUMNS[key]);

  let comments = [];

  async function fetchComments() {
    try {
      const response = await fetch('http://localhost:3000/api/dataset');
      if (!response.ok) {
        throw new Error('Error fetching data');
      }
      const jsonData = await response.json();

      // Create columns dynamically based on the JSON fields
      selectedCols = Object.keys(jsonData.data[0]);

      // Remove the 'id' column from the selectedCols
      selectedCols = selectedCols.filter(colKey => colKey !== 'id');

      // Create column definitions
      selectedCols.forEach(colKey => {
        COLUMNS[colKey] = {
          key: colKey,
          title: colKey.toUpperCase(),
          value: v => v[colKey],
          sortable: true,
        };
      });

      comments = jsonData.data;
    } catch (error) {
      console.error(error);
    }
  }

  onMount(fetchComments);
</script>

<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha1/css/bootstrap.min.css" integrity="sha384-r4NyP46KrjDleawBgD5tp8Y7UzmLA05oM1iAEQ17CSuDqnUK2+k9luXQOfXJCJ4I" crossorigin="anonymous">
<div class="container">
  <h1>SvelteTable Example</h1>
  <p>
    Shows that filters are reactive
  </p>
  <div class="input-group pb-3">
    <button class="btn btn-primary" on:click={fetchComments}>
      Fetch Data
    </button>
    <input bind:value={numRows} class="form-control">

    <button
      class="btn btn-primary"
      on:click={() => {
        sortOrder = 1;
      }}
      disabled={sortOrder === 1}
      style="float:right;">
      SORT {iconAsc}
    </button>
    <button
      class="btn btn-primary"
      on:click={() => {
        sortOrder = -1;
      }}
      disabled={sortOrder === -1}
      style="float:right;">
      SORT {iconDesc}
    </button>
  </div>

  <div class="row">
    <SvelteTable
      columns={cols}
      rows={data}
      bind:sortBy
      bind:sortOrder
      classNameTable={['table table-striped']}
      classNameThead={['table-primary']}
      classNameSelect={['custom-select']} />
  </div>
</div>
