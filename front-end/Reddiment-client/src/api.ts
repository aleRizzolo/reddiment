export async function fetchComments(): Promise<Response> {
	try {
		const response = await fetch('http://localhost:3000/api/dataset');
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		return response;
	} catch (error) {
		if (error instanceof Error) console.error('Error fetching comments:', error.message);
		throw error;
	}
}

export async function fetchBarChart(): Promise<Response> {
	try {
		const response = await fetch('http://localhost:3000/api/barChart');
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		return response;
	} catch (error) {
		if (error instanceof Error) console.error('Error fetching barChart data:', error.message);
		throw error;
	}
}

export async function fetchBarGraph(): Promise<Response> {
	try {
		const response = await fetch('http://localhost:3000/api/barGraph');
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		return response;
	} catch (error) {
		if (error instanceof Error) console.error('Error fetching barGraph data:', error.message);
		throw error;
	}
}

export async function fetchHistogram(): Promise<Response> {
	try {
		const response = await fetch('http://localhost:3000/api/histogram');
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		return response;
	} catch (error) {
		if (error instanceof Error) console.error('Error fetching histogram data:', error.message);
		throw error;
	}
}

export async function fetchScatter(): Promise<Response> {
	try {
		const response = await fetch('http://localhost:3000/api/scatter');
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		return response;
	} catch (error) {
		if (error instanceof Error) console.error('Error fetching scatter data:', error.message);
		throw error;
	}
}

export async function fetchCollections(): Promise<Response> {
	try {
		const response = await fetch('http://localhost:3000/api/collections');
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		return response;
	} catch (error) {
		if (error instanceof Error) console.error('Error fetching collections data:', error.message);
		throw error;
	}
}

export async function fetchWordCloud(): Promise<Response> {
	try {
		const response = await fetch('http://localhost:3000/api/wordcloud');
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		return response;
	} catch (error) {
		if (error instanceof Error) console.error('Error fetching wordcloud data:', error.message);
		throw error;
	}
}
