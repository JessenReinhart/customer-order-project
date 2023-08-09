import axios from 'axios';

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export async function fetchCustomers(): Promise<Customer[]> {
  try {
     // Simulate a loading delay of 1 second
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const response = await axios.get('/src/data/dummy-customers.json');
    return response.data;
  } catch (error) {
    console.error('Error fetching customers:', error);
    return [];
  }
}
