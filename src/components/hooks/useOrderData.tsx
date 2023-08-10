import { useEffect, useState } from 'react';
import { Order, fetchOrders } from '../../services/orderService';

export default function useOrderData(page: number, itemPerPage: number = 10) {
    const [data, setData] = useState<Order[]>([]);
    const [error, setError] = useState<unknown>();
    const [totalPages, setTotalPages] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const getOrders = async () => {
            try {
                setLoading(true);
                const order = await fetchOrders(page, itemPerPage);
                setData(order.data);
                setTotalPages(Math.ceil(order.count / itemPerPage))

            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        getOrders();
    }, [page, itemPerPage]);

    return { data, loading, error, totalPages };
}
