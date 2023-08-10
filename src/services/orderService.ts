import axios from 'axios';

export interface Order {
  id: number;
  customer_id: number;
  order_date: string;
  total_amount: number;
  status: string;
}

type OrderResponseType = {
  data: Order[]
  count: number
}

export async function fetchOrders(page: number = 1, itemPerPage: number = 10): Promise<OrderResponseType> {
  try {
    // Simulate a loading delay of 1 second
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const response = await axios.get('/dummy-orders.json');
    const count = (response.data as Order[]).length
    const allOrders = response.data as Order[];

    // Calculate the start and end indexes for the current page
    const startIndex = (page - 1) * itemPerPage;
    const endIndex = startIndex + itemPerPage;

    // Return the customers for the current page
    return { data: allOrders.slice(startIndex, endIndex), count };
  } catch (error) {
    console.error('Error fetching orders:', error);
    return {
      data: [],
      count: 0
    };
  }
}
