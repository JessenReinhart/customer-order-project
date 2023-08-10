import { Modal, Button } from "react-bootstrap";

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface CustomerDetailProps {
  customer: Customer;
  onCloseModal: () => void;
  onEdit: () => void;
}

function CustomerDetail({ customer, onCloseModal, onEdit }: CustomerDetailProps) {
  return (
    <Modal show={true} onHide={onCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Customer Detail</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>ID: {customer.id}</p>
        <p>Name: {customer.name}</p>
        <p>Email: {customer.email}</p>
        <p>Phone: {customer.phone}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onEdit}>
          Edit
        </Button>
        <Button variant="secondary" onClick={onCloseModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CustomerDetail;
