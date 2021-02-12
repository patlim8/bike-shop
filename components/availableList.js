import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import React, { Component } from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import { groupedOptions } from './data';

const animatedComponents = makeAnimated();

const options = {groupedOptions}

export default function AvailableList() {
    return (
  //     <InputGroup>
  //   <FormControl
  //     placeholder="รุ่นที่ใช้ได้"
  //     aria-label="Recipient's username"
  //     aria-describedby="basic-addon2"
  //   />

  //   <DropdownButton
  //     as={InputGroup.Append}
  //     variant="outline-secondary"
  //     title="Dropdown"
  //     id="input-group-dropdown-2"
  //   >
  //     <Dropdown.Item href="#">Action</Dropdown.Item>
  //     <Dropdown.Item href="#">Another action</Dropdown.Item>
  //     <Dropdown.Item href="#">Something else here</Dropdown.Item>
  //     <Dropdown.Divider />
  //     <Dropdown.Item href="#">Separated link</Dropdown.Item>
  //   </DropdownButton>
  // </InputGroup>

  
  
  
    <div>

    รุ่นที่ใช้ได้: <Select
    components={animatedComponents}
    isMulti
    options={options} />
    </div>
  
    );
}