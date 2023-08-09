import { useState } from "react";
import { Alert, Spinner, Table } from "react-bootstrap";
import CustomerModal from "./CustomerModal";
import { Customer } from "../../services/customerService";
import useCustomerData from "../hooks/useCustomerData";

function CustomerList() {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [showModal, setShowModal] = useState(false);

  const { loading, data, error } = useCustomerData();

  const handleCustomerClick = (customer: Customer) => {
    setSelectedCustomer(customer);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedCustomer(null);
    setShowModal(false);
  };

  if (error) return <Alert variant="danger">Error fetching data</Alert>;

  return (
    <div>
      <h2>Customer List</h2>
      {loading ? (
        <div className="d-flex gap-2 align-items-center">
          <Spinner animation="border" role="status" />
          <span>Loading...</span>
        </div>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {data.map((customer) => (
              <tr
                key={customer.id}
                role="button"
                onClick={() => handleCustomerClick(customer)}
              >
                <td>{customer.id}</td>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {selectedCustomer && (
        <CustomerModal
          customer={selectedCustomer}
          showModal={showModal}
          onCloseModal={handleCloseModal}
        />
      )}
    </div>
  );
}

export default CustomerList;
