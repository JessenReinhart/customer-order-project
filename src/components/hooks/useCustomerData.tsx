import { useEffect, useState } from "react";
import { Customer, fetchCustomers } from "../../services/customerService";

export default function useCustomerData(page: number, itemPerPage: number = 10) {
  const [data, setData] = useState<Customer[]>([]);
  const [error, setError] = useState<unknown>();
  const [loading, setLoading] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(0)

  useEffect(() => {
    const getCustomers = async () => {
      try {
        setLoading(true);
        const cust = await fetchCustomers(page, itemPerPage); // Pass the page parameter
        setData(cust.data);

        setTotalPages(Math.ceil(cust.count / itemPerPage))
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    getCustomers();
  }, [page, itemPerPage]); // Re-run effect when the page parameter changes

  return { data, loading, error, totalPages };
}
