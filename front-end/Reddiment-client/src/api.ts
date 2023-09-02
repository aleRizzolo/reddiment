//api.ts
export async function fetchComments(): Promise<Response> {
	try {
		const response = await fetch('http://localhost:3000/api/dataset');
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		return response;
	} catch (error) {
		console.error('Error fetching comments:', error.message);
		throw error;
	}
}
