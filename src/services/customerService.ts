import axios from 'axios';

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
}
type CustomerResponse = {
  data: Customer[]
  count: number
}

const CUSTOMERS_PER_PAGE = 10; // Number of customers per page

export async function fetchCustomers(page: number = 1, itemPerPage: number = CUSTOMERS_PER_PAGE): Promise<CustomerResponse> {
  try {
    // Simulate a loading delay of 1 second
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const response = await axios.get('/src/data/dummy-customers.json');
    const count = (response.data as Customer[]).length
    const allCustomers = response.data as Customer[];

    // Calculate the start and end indexes for the current page
    const startIndex = (page - 1) * itemPerPage;
    const endIndex = startIndex + itemPerPage;

    // Return the customers for the current page
    return { data: allCustomers.slice(startIndex, endIndex), count };
  } catch (error) {
    console.error('Error fetching customers:', error);
    return {
      data: [],
      count: 0
    };
  }
}
