import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Select from 'react-select';
import { groupedOptions } from '../pages/data';
// import { connectToDatabase } from "../util/mongodb";



// export async function getServerSideProps() {
//   const { db } = await connectToDatabase();

//   const item = await db
//     .collection("item")
//     .find()
//     .sort({})
//     .limit(20)
//     .toArray();

//   const brand = await db
//     .collection("brand")
//     .find()
//     .sort({})
//     .limit(20)
//     .toArray();
  
    
//   return {
//     props: {
//       item: JSON.parse(JSON.stringify(item)),
//       brand: JSON.parse(JSON.stringify(brand)),
      
//     },
    
    
//   };
  
// }


export default function BrandList({ brandChange }) {

  // console.log('brand:', brand)
  // let brandOP = []
  // let element = { label: 'brand', options: [] }
  // element.options = (brand.map((b) => ({
  //   value: b.name, label: b.name
  // })))
  // brandOP.push(element)
//   const brandOptions = brands.map(brand =>(
//     {
//         label: ''+brand.name, 
//         // value: ''+brand._id,
//       value: ''+brand.name,

//     } 
//     )
    
// )

  const groupStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };
  const groupBadgeStyles = {
    backgroundColor: '#EBECF0',
    borderRadius: '2em',
    color: '#172B4D',
    display: 'inline-block',
    fontSize: 12,
    fontWeight: 'normal',
    lineHeight: '1',
    minWidth: 1,
    padding: '0.16666666666667em 0.5em',
    textAlign: 'center',
  };

  const handleOnChange = e => {
    console.log(e.value)
    brandChange(e.value)
  }

  const formatGroupLabel = data => (
    <div style={groupStyles}>
      <span>{data.label}</span>
      <span style={groupBadgeStyles}>{data.options.length}</span>
    </div>
  );
  return (
    <div>
      ยี่ห้อสินค้า: <Select

        // options={brandOP}
        options={groupedOptions}
        // formatGroupLabel={formatGroupLabel}
        onChange={handleOnChange}
      />
    </div>
  );
}