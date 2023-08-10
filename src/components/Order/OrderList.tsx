import { useState } from 'react';
import { Alert, Pagination, Spinner, Table } from 'react-bootstrap';
import OrderDetailModal from './OrderDetailModal';
import useOrderData from '../hooks/useOrderData';

import { Order } from '../../services/orderService';
import { formatCurrency } from './util';

function OrderList() {
    const [currentPage, setCurrentPage] = useState(1);
    const { data: orders, loading, error, totalPages } = useOrderData(currentPage, 5);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [showModal, setShowModal] = useState(false);

    const handleOrderClick = (order: Order) => {
        setSelectedOrder(order);
        setShowModal(true);
    };

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    if (error) return <Alert variant="danger">Error fetching data</Alert>;

    return (
        <div>
            <h2>Order List</h2>
            {loading ? (
                <div className="d-flex gap-2 align-items-center">
                    <Spinner animation="border" role="status" />
                    <span>Loading...</span>
                </div>
            ) : (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer ID</th>
                            <th>Order Date</th>
                            <th>Total Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id} role='button' onClick={() => handleOrderClick(order)}>
                                <td>{order.id}</td>
                                <td>{order.customer_id}</td>
                                <td>{order.order_date}</td>
                                <td>{formatCurrency(order.total_amount)}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
            <Pagination className="mt-2">
                {Array.from({ length: totalPages }, (_, index) => (
                    <Pagination.Item
                        key={index}
                        active={index + 1 === currentPage}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </Pagination.Item>
                ))}
            </Pagination>

            {showModal && selectedOrder && (
                <OrderDetailModal order={selectedOrder} onClose={() => setShowModal(false)} />
            )}
        </div>
    );
}

export default OrderList;
