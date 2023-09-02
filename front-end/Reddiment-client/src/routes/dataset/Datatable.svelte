<script lang="ts">
  import { onMount } from 'svelte';
  import { fetchComments } from '../../api.ts'; 
  import DataTable, {
    Head,
    Body,
    Row,
    Cell,
    Pagination,
  } from '@smui/data-table';
  import Select, { Option } from '@smui/select';
  import IconButton from '@smui/icon-button';
  import { Label } from '@smui/common';

  type Comment = {
    comment: string;
    probabilities_acceptable: string;
    probabilities_hate: string;
    probabilities_offensive: string;
    probabilities_violent: string;
    language: string;
    errors: string;
  };
  let items: Comment[] = [];
  let rowsPerPage = 10;
  let currentPage = 0;

  let start = 0;
  let end = 0;
  let slice: Comment[] = [];
  let lastPage = 0;

  // Define a function to update the derived variables
  function updateDerivedVariables() {
    start = currentPage * rowsPerPage;
    end = Math.min(start + rowsPerPage, items.length);
    slice = items.slice(start, end);
    lastPage = Math.max(Math.ceil(items.length / rowsPerPage) - 1, 0);
  }

  onMount(async () => {
    try {
      const fetchedItems = await fetchComments();
      items = fetchedItems;
      updateDerivedVariables(); // Update the derived variables after fetching data
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  });

  // Reactively update the derived variables whenever items, rowsPerPage, or currentPage changes
  $: {
    updateDerivedVariables();
  }
</script>

<style>
  /* Add a CSS class to the container div */
  .responsive-table-container {
    overflow-x: auto; /* Add horizontal scroll for small screens */
  }

  /* Apply styles to the DataTable to make it responsive */
  .responsive-table {
    width: 100%;
    display: block;
    overflow-x: auto;
  }
</style>

<!-- Wrap the DataTable in a container div with the responsive class -->
<div class="responsive-table-container">
  <DataTable table$aria-label="Comment list" class="responsive-table">
    <Head>
      <Row>
        <Cell style="width: 100%;">Comment</Cell>
        <Cell>Acceptable</Cell>
        <Cell>Hate</Cell>
        <Cell>Offensive</Cell>
        <Cell>Violent</Cell>
        <Cell>Language</Cell>
        <Cell>Errors</Cell>
      </Row>
    </Head>
    <Body>
      {#each slice as item (item.comment)}
        <Row>
          <Cell>{item.comment}</Cell>
          <Cell>{item.probabilities_acceptable}</Cell>
          <Cell>{item.probabilities_hate}</Cell>
          <Cell>{item.probabilities_offensive}</Cell>
          <Cell>{item.probabilities_violent}</Cell>
          <Cell>{item.language}</Cell>
          <Cell>{item.errors}</Cell>
        </Row>
      {/each}
    </Body>
    <Pagination slot="paginate">
      <svelte:fragment slot="rowsPerPage">
        <Label>Rows Per Page</Label>
        <Select variant="outlined" bind:value={rowsPerPage} noLabel>
          <Option value={10}>10</Option>
          <Option value={25}>25</Option>
          <Option value={100}>100</Option>
        </Select>
      </svelte:fragment>
      <svelte:fragment slot="total">
        {start + 1}-{end} of {items.length}
      </svelte:fragment>

      <IconButton
        class="material-icons"
        action="first-page"
        title="First page"
        on:click={() => (currentPage = 0)}
        disabled={currentPage === 0}>first_page</IconButton
      >
      <IconButton
        class="material-icons"
        action="prev-page"
        title="Prev page"
        on:click={() => currentPage--}
        disabled={currentPage === 0}>chevron_left</IconButton
      >
      <IconButton
        class="material-icons"
        action="next-page"
        title="Next page"
        on:click={() => currentPage++}
        disabled={currentPage === lastPage}>chevron_right</IconButton
      >
      <IconButton
        class="material-icons"
        action="last-page"
        title="Last page"
        on:click={() => (currentPage = lastPage)}
        disabled={currentPage === lastPage}>last_page</IconButton
      >
    </Pagination>
  </DataTable>
</div>
