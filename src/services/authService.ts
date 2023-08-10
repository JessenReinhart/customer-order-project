import axios from 'axios';

export interface LoginData {
  username: string;
  password: string;
}

export async function fetchLoginData(): Promise<LoginData> {
  try {
    // Simulate a loading delay of 1 second
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const response = await axios.get('/src/data/dummy-login.json');
    return response.data;
  } catch (error) {
    console.error('Error fetching login data:', error);
    return { username: '', password: '' };
  }
}
