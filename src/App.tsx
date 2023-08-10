import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import CustomerList from "./components/Customer/CustomerList";
import OrderList from "./components/Order/OrderList";
import Login from "./components/Auth/Login";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <MainApp />
      </Router>
    </AuthProvider>
  );
}

export default App;

const MainApp = () => {
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) navigate('/login')

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated])

  return <div className="App">
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow">
      <Container>
        <Navbar.Brand href="/customer">DBO Frontend Test - Jessen</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {isAuthenticated && <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="d-flex">
            <Nav.Link href="/customer">Customers</Nav.Link>
            <Nav.Link href="/order">Orders</Nav.Link>
          </Nav>
        </Navbar.Collapse>}
        <Navbar.Text>
          {isAuthenticated ?
            <Button variant="dark" onClick={logout}>Logout</Button>
            :
            <Nav.Link className="ml-auto" href="/login">Login</Nav.Link>
          }
        </Navbar.Text>
      </Container>
    </Navbar>
    <main>
      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<CustomerList />} />
          <Route path="/customer" element={<CustomerList />} />
          <Route path="/order" element={<OrderList />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Container>
    </main>
    <footer className="App-footer text-center">
      <p>&copy; {new Date().getFullYear()} Jessen Reinhart</p>
    </footer>
  </div>
}