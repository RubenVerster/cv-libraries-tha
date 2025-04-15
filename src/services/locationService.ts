interface LocationResponse {
  id: number;
  name: string;
}

export async function searchLocations(query: string): Promise<LocationResponse[]> {
  if (query.length < 2) {
    return [];
  }

  try {
    const response = await fetch(
      `https://api.cv-library.co.uk/v1/locations?q=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching locations:', error);
    
    // Return mock data for development
    return [
      { id: 1, name: 'London' },
      { id: 2, name: 'Liverpool' },
      { id: 3, name: 'Leeds' },
      { id: 4, name: 'Leicester' },
      { id: 5, name: 'Luton' },
    ].filter(location => 
      location.name.toLowerCase().includes(query.toLowerCase())
    );
  }
}
