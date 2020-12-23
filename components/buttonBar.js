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

        <DropdownButton as={ButtonGroup} title="Dropdown" id="bg-nested-dropdown">
          <Dropdown.Item eventKey="1">Dropdown link</Dropdown.Item>
          <Dropdown.Item eventKey="2">Dropdown link</Dropdown.Item>
        </DropdownButton>

        <DropdownButton as={ButtonGroup} title="Dropdown" id="bg-nested-dropdown">
          <Dropdown.Item eventKey="1">Dropdown link</Dropdown.Item>
          <Dropdown.Item eventKey="2">Dropdown link</Dropdown.Item>
        </DropdownButton>

      </ButtonGroup>
    );
    }


  