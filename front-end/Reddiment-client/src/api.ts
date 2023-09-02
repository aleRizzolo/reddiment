export async function fetchComments() {
	try {
		const response = await fetch('http://localhost:3000/api/dataset');
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		const jsonData = await response.json();
		if (jsonData.success !== true) {
			throw new Error('API response indicates failure');
		}
		return jsonData.data;
	} catch (error) {
		console.error('Error fetching comments:', error.message);
		throw error;
	}
}
