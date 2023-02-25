
import {MDBInput, MDBCol, MDBInputGroup, MDBBtn} from 'mdb-react-ui-kit'
import {ImSearch} from 'react-icons/im'

function Search() {
    return (
     <>
       
      <div className='justify-center'>
          
        <MDBInput label='Search' id='search' type='text' style={{width: "50rem"}}/>
        <MDBBtn><ImSearch></ImSearch></MDBBtn>
            
      </div>
        
        
     </>
    );
  }
  
  export default Search;