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
        <Navbar.Brand href="/">Bike Shop Inventory Management System</Navbar.Brand>
      </Navbar>
      <Navbar bg="light" variant="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">หน้าแรก</Nav.Link>
            <Nav.Link href="/inventory">สินค้า</Nav.Link>
            <Nav.Link href="/sale">ขาย</Nav.Link>
            <NavDropdown title="บัญชี" id="basic-nav-dropdown">
              <NavDropdown.Item href="/totalSale">บัญชีรายการขาย</NavDropdown.Item>
              <NavDropdown.Item href="/balance">บัญชี-Balance</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="การแจ้งเตือน" id="basic-nav-dropdown">
              <NavDropdown.Item href="/needItem">สินค้าที่ต้องเพิ่ม</NavDropdown.Item>
              <NavDropdown.Item href="/stock">สินค้าค้างสต็อค</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}


