import { Modal } from "react-bootstrap";
import CustomerDetail from "./CustomerDetail";

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface CustomerModalProps {
  customer: Customer;
  showModal: boolean;
  onCloseModal: () => void;
}

function CustomerModal({
  customer,
  showModal,
  onCloseModal,
}: CustomerModalProps) {
  return (
    <Modal show={showModal} onHide={onCloseModal}>
      <CustomerDetail customer={customer} onCloseModal={onCloseModal} />
    </Modal>
  );
}

export default CustomerModal;
