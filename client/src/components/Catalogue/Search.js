
import {MDBInput, MDBBtn} from 'mdb-react-ui-kit'
import { Container, Form, Row, Col } from 'react-bootstrap';
import {ImMinus, ImPlus, ImSearch} from 'react-icons/im'
import React, { useEffect, useState } from 'react';
import { getAdvancedSearchInfo, getBooksByFilter } from '../../DBHandle/repoBooks';
import { default as Select } from "react-select";

function Search({updateResults, setShowSpinner}) {
  
  const [advSearch, setAdvSearch] = useState('false');
  
  const [locations, setLocations] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);

  const [languages, setLanguages] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  
  useEffect(() => {
    async function fetchAdvSearch() {
      const data = await getAdvancedSearchInfo();
      if(data !== {} && data !== undefined){
        var lst = []
        data["location"].map((item)=>{
          lst.push({ "value": item, "label": item })
        })
        setLocations(lst);

        lst = []
        data["language"].map((item)=>{
          lst.push({ "value": item, "label": item })
        })
        setLanguages(lst);

        lst = []
        data["category"].map((item)=>{
          lst.push({ "value": item, "label": item })
        })
        setCategories(lst);
      }
    }
    fetchAdvSearch();
  }, []);


  const handleChangeLocations = (selected) => {
    setSelectedLocations(selected);
  };
  const handleChangeLanguages = (selected) => {
    setSelectedLanguages(selected);
  };
  const handleChangeCategories = (selected) => {
    setSelectedCategories(selected);
  };

  const searchOptions = [
    {
      value: 'bookName',
      text: 'Book Name'
    },
    {
      value: 'author',
      text: 'Author'
    },
    {
      value: 'idBook',
      text: 'Book Id'
    },
    {
      value: 'seriesName',
      text: 'Series Name'
    }
  ];

  const handleSearch = async event => {
    updateResults([])
    setShowSpinner(true)
    let select = document.getElementById('searchSelect1')
    let input = document.getElementById('search1')
    let filter = {}
    filter[select.value] = select.value === "idBook" ? 
    parseInt(input.value) : { $regex: input.value, $options: 'i' }
    
    let searchQuery = filter

    if(advSearch === "true"){

      let selectAndOr = document.getElementById('orAnd')
      let select2 = document.getElementById('searchSelect2')
      let inputSearch2 = document.getElementById('search2')
      let filter2 = {}
      filter2[select2.value] = select2.value === "idBook" ? 
      parseInt(inputSearch2.value) : { $regex: inputSearch2.value, $options: 'i' }
      
      searchQuery = {}
      let lst = []
    
      if(inputSearch2.value !== ''){
        
        lst.push(filter)
        lst.push(filter2)
        if(selectAndOr.value === "or"){
          searchQuery["$or"] = lst
        }else{
          searchQuery["$and"] = lst
        }
      }else{
        searchQuery = filter
      }
      
      if(selectedLocations.length !== 0){
        searchQuery["location"] = {"$in": selectedLocations.map((itm)=>{return itm["value"]})}
      }
      if(selectedCategories.length !== 0){
        searchQuery["category"] = {"$in": selectedCategories.map((itm)=>{return itm["value"]})}
      }
      if(selectedLanguages.length !== 0){
        searchQuery["language"] = {"$in": selectedLanguages.map((itm)=>{return itm["value"]})}
      }
    }
    let res = await getBooksByFilter(searchQuery)

    updateResults(res)
    setShowSpinner(false)
  };

    return (
     <>
      <Container>
      <Row>
      <Col sm={2}>
        <Form.Select id='searchSelect1' style={{height: '36.14px'}}>
          {searchOptions.map((option, index) => (
            <option key={index} value={option.value}>
              {option.text}
            </option>
          ))}
        </Form.Select>
      </Col>
      <Col style={{padding:'0px'}}>
        <MDBInput label='Search' id='search1' type='text' />
      </Col>
      <Col md="auto" style={{padding:'0px'}}>
        <MDBBtn onClick={handleSearch} style={{height: '36.14px'}}><ImSearch></ImSearch></MDBBtn>
      </Col>
      <Col md="auto">
        <MDBBtn title='advanced search' style={{height: '36.14px'}} onClick={()=>{advSearch === "true" ? setAdvSearch("false"): setAdvSearch("true")}}>
          
          {advSearch === "true"?  <ImMinus></ImMinus>:<ImPlus></ImPlus>}
        </MDBBtn>
      </Col>
      </Row>
      <br/>
      {advSearch === "true"? 
      <>
      <Row>
        <Col sm={2}>
          <Form.Select id='orAnd' style={{height: '36.14px'}}>
            <option key={1} value="or">
              OR
            </option>
            <option key={2} value="and">
            AND
            </option>
          </Form.Select>
        </Col>
        <Col sm={2}>
          <Form.Select id='searchSelect2' style={{height: '36.14px'}}>
            {searchOptions.map((option, index) => (
              <option key={index} value={option.value}>
                {option.text}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col>
          <MDBInput label='Search' id='search2' type='text' />
        </Col>
        
      </Row>
      <br/>
      <Row>
        <Col>
          <Select
            placeholder="category"
            options={categories}
            value={selectedCategories}
            onChange={handleChangeCategories}
            isMulti
            closeMenuOnSelect={false}
          />
        </Col>
        <Col>
          <Select
            placeholder="language"
            options={languages}
            value={selectedLanguages}
            onChange={handleChangeLanguages}
            isMulti
            closeMenuOnSelect={false}
            
          />
        </Col>
        <Col>
          <Select
            placeholder="location"
            options={locations}
            value={selectedLocations}
            onChange={handleChangeLocations}
            isMulti
            closeMenuOnSelect={false}
            
          />
        </Col>
      </Row>
      </>:<></>
      }
     
      </Container>
     
     </>
    );
  }
  
  export default Search;