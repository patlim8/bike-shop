import Button from 'react-bootstrap/Button';
//import DropdownButton from 'react-bootstrap/DropdownButton';
//import Dropdown from 'react-bootstrap/Dropdown';
//import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function ButtonBar() {
  return (
    <div>
      <Navbar bg="dark" variant="dark" >
        <Navbar.Brand href="/index">Bike Shop Inventory Management System</Navbar.Brand>
      </Navbar>
      <Navbar bg="light" variant="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/index">Home</Nav.Link>
            <Nav.Link href="/inventory">Inventory</Nav.Link>
            <Nav.Link href="/sale">Sale</Nav.Link>
            <NavDropdown title="Account" id="basic-nav-dropdown">
              <NavDropdown.Item href="/totalSale">Total Sale</NavDropdown.Item>
              <NavDropdown.Item href="/balance">Account Balance</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Notification" id="basic-nav-dropdown">
              <NavDropdown.Item href="/needItem">Need Item</NavDropdown.Item>
              <NavDropdown.Item href="/stock">Stock</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}


