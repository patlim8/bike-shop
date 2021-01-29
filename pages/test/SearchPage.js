import React, { useState, useEffect } from 'react';
import SearchBar from './search_name';
import ItemList from './itemList';
import { connectToDatabase } from "../../util/mongodb";

const SearchPage = (props) => {
  const [input, setInput] = useState('');
  const [countryListDefault, setCountryListDefault] = useState();
  const [countryList, setCountryList] = useState();
//   console.log("Pass 111111111111111111111111111111111 ")

  const fetchData = async () => {
    return await fetch('https://restcountries.eu/rest/v2/all')
      .then(response => response.json())
    //   console.log("passssssssssssssssssssss")
      .then(data => {
         setCountryList(data) 
         setCountryListDefault(data)
         
      console.log("passsssssssssssssssss", data[0])
       });}

  const updateInput = async (input) => {
     const filtered = countryListDefault.filter(country => {
      return country.name.toLowerCase().includes(input.toLowerCase())
     })
     setInput(input);
     setCountryList(filtered);
  }

  useEffect( () => {fetchData()},[]);
	
  return (
    <>
      <h1>Country List</h1>
      <SearchBar 
       input={input} 
       onChange={updateInput}
      />
      <ItemList ItemList={countryList}/>
    </>
   );
}

export default SearchPage


export async function getServerSideProps() {

    console.log("Pass ")
    const { db } = await connectToDatabase();
  
    const item = await db
      .collection("item")
      .find()
      .sort({})
      .limit(20)
      .toArray();
  
    console.log("Pass 111111111111111111111111111111111 ");
    return {
       
      
      props: {
        
        item: JSON.parse(JSON.stringify(item)),
        
        // setCountryList(item),
        // setCountryListDefault(item) 
        
        
      },
      
      
    } 
    // .then(data => {
    //     setCountryList(data) 
    //     setCountryListDefault(data)
    //   });
  }