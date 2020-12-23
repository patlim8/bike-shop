import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

export default function ButtonBar() {
    return (
        <ButtonGroup>
        <Button href="/home">Home</Button>
        <Button href="/inventory">Inventory</Button>
        <Button href="/sale">Sale</Button>

        <DropdownButton as={ButtonGroup} title="Account" id="bg-nested-dropdown">
          <Dropdown.Item eventKey="1" href="/totalSale">Total Sale</Dropdown.Item>
          <Dropdown.Item eventKey="2" href="/balance">Account Balance</Dropdown.Item>
        </DropdownButton>

        <DropdownButton as={ButtonGroup} title="Notification" id="bg-nested-dropdown">
          <Dropdown.Item eventKey="1" href="/needItem">Need Item</Dropdown.Item>
          <Dropdown.Item eventKey="2" href="/stock">Stock</Dropdown.Item>
        </DropdownButton>

      </ButtonGroup>
    );
    }


  