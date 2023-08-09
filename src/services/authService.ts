import axios from 'axios';

interface LoginData {
  username: string;
  password: string;
}

export async function fetchLoginData(): Promise<LoginData> {
  try {
    const response = await axios.get('/src/data/dummy-login.json');
    return response.data;
  } catch (error) {
    console.error('Error fetching login data:', error);
    return { username: '', password: '' };
  }
}
