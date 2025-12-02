
import { API_BASE_URL } from '../constants';
import { Station } from '../types';

export const fetchPhilippineStations = async (): Promise<Station[]> => {
  const endpoint = '/json/stations/search?countrycode=PH&hidebroken=true&limit=500&order=votes&reverse=true';
  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'PhilippineRadioApp/1.0',
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data: Station[] = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch stations:', error);
    throw new Error('Could not fetch radio stations. Please check your network connection.');
  }
};
