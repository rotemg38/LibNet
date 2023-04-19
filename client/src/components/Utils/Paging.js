import React from 'react';
import { Pagination } from 'react-bootstrap';

function Paging({ pageIndex, pageCount, onPageChange }) {
  const handlePrevPage = () => {
    if (pageIndex > 0) {
      onPageChange(pageIndex - 1);
    }
  };

  const handleNextPage = () => {
    if (pageIndex < pageCount - 1) {
      onPageChange(pageIndex + 1);
    }
  };

  return (
    
    <Pagination>
        <Pagination.Prev onClick={handlePrevPage} disabled={pageIndex === 0}/>
        <Pagination.Next onClick={handleNextPage} disabled={pageIndex === pageCount - 1}/>
    </Pagination>
      
    
  );
}

export default Paging;
