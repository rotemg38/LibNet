import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Search from './Search';

function Catalogue() {
  return (
   <>
   <div className='justify-center'>
      <h1 className='text-uppercase' style={{padding: "2rem"}}>Books Catalogue</h1>
   </div>
   <Search></Search>
   </>
  );
}

export default Catalogue;