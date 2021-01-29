import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';


// export default function Search({keyword,setKeyword}) {
//     const BarStyling = {width:"20rem",background:"#F2F1F9", border:"none", padding:"0.5rem"};
//   return (
//     <input 
//      style={BarStyling}
//      key="random1"
//      value={keyword}
//      placeholder={"search country"}
//      onChange={(e) => setKeyword(e.target.value)}
//     />
//   );
// }

const SearchBar = ({input:keyword, onChange:setKeyword}) => {
  const BarStyling = {width:"20rem",background:"#F2F1F9", border:"none", padding:"0.5rem"};
  return (

    <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">ค้นหา</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="ชื่อสินค้า"
              aria-label="Item name"
              aria-describedby="basic-addon1"
              key="random1"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </InputGroup>
    // <input 
    //  style={BarStyling}
    //  key="random1"
    //  value={keyword}
    //  placeholder={"search country"}
    //  onChange={(e) => setKeyword(e.target.value)}
    // />
  );
}

export default SearchBar