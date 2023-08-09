import { useEffect, useState } from "react";
import { Customer, fetchCustomers } from "../../services/customerService";

export default function useCustomerData() {
  const [data, setData] = useState<Customer[]>([]);
  const [error, setError] = useState<unknown>();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const getCustomers = async () => {
      try {
        setLoading(true);
        const cust = await fetchCustomers();
        setData(cust);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    getCustomers();
  }, []);
  return { data, loading, error };
}
