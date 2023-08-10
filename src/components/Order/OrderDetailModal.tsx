import { Modal, Button } from 'react-bootstrap';
import { Order } from '../../services/orderService';
import { formatCurrency } from './util';

type OrderDetailPropType = {
    order: Order
    onClose: () => void
}

function OrderDetailModal({ order, onClose }: OrderDetailPropType) {
    return (
        <Modal show={true} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Order Detail</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Order ID: {order.id}</p>
                <p>Customer ID: {order.customer_id}</p>
                <p>Order Date: {order.order_date}</p>
                <p>Total Amount: {formatCurrency(order.total_amount)}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default OrderDetailModal;