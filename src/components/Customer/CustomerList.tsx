import { useState } from "react";
import { Alert, Button, Pagination, Spinner, Table } from "react-bootstrap";
import CustomerDetail from "./CustomerDetail";
import useCustomerData from "../hooks/useCustomerData";
import { Customer } from "../../services/customerService";
import CustomerForm from "./CustomerForm";

function CustomerList() {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [showCreate, setShowCreate] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState(1);
  const { data, loading, error, totalPages } = useCustomerData(currentPage, 5);

  const handleCustomerClick = (customer: Customer) => {
    setSelectedCustomer(customer);
  };

  const handleCloseModal = () => {
    setSelectedCustomer(null);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  if (error) return <Alert variant="danger">Error fetching data</Alert>;

  return (
    <div>
      <span className="d-flex flex-row justify-content-between mb-2">
        <h2>Customer List</h2>
        <Button onClick={() => setShowCreate(true)}>Create Customer</Button>
      </span>
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

      {showCreate && <CustomerForm formData={selectedCustomer ? {
        name: selectedCustomer.name,
        email: selectedCustomer.email,
        phone: selectedCustomer.phone
      } : undefined} onCloseModal={() => setShowCreate(false)} />}

      {selectedCustomer && (
        <CustomerDetail
          customer={selectedCustomer}
          onCloseModal={handleCloseModal}
          onEdit={() => setShowCreate(true)}
        />
      )}
    </div>
  );
}

export default CustomerList;
