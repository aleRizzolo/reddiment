// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;
import App from './App.svelte';
import DataTable from './dataset.svelte'; // Import the DataTable component

const app = new App({
	target: document.body
});

const dataTable = new DataTable({
	target: document.body // You can choose where to render the DataTable
});

export default app;
