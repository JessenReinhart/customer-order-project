import axios from 'axios';

interface Order {
  id: number;
  customerId: number;
  orderDate: string;
  totalAmount: number;
  status: string;
}

export async function fetchOrders(): Promise<Order[]> {
  try {
    const response = await axios.get('/src/data/dummy-orders.json');
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
}
