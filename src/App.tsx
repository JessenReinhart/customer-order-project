import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import CustomerList from "./components/Customer/CustomerList";
// import OrderList from "./components/Order/OrderList";
// import Login from "./components/Auth/Login";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar bg="dark" variant="dark" expand="lg" className="shadow">
          <Container>
            <Navbar.Brand href="/">DBO Frontend Test - Jessen</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/customer">Customers</Nav.Link>
                <Nav.Link href="/order">Orders</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <main>
          <Container className="mt-4">
            <Routes>
              <Route path="/customer" element={<CustomerList />} />
              {/* <Route path="/order" element={<OrderList />} />
              <Route path="/login" element={<Login />} /> */}
              {/* Add more routes for other components */}
            </Routes>
          </Container>
        </main>
        <footer className="App-footer text-center">
          <p>&copy; {new Date().getFullYear()} Jessen Reinhart</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
