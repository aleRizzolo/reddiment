<script>
  import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
  import DataTable from './DataTable.svelte';

  // This is just a sample data for demonstration purposes
  let fetchedData = [
    { name: 'John', email: 'john@example.com' },
    { name: 'Jane', email: 'jane@example.com' },
    // ... more data
  ];
</script>

<h1>Welcome to the Dataset Page</h1>
<DataTable data={fetchedData} />
