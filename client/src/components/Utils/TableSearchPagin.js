import React, { useMemo, useEffect, useState, useRef } from "react";
import { Alert, Button, FormGroup, InputGroup, Table } from "react-bootstrap";
import { useTable } from 'react-table';
import { Input, Label } from "reactstrap";
import Paging from "./Paging";

const TableSearchPagin = ({dataTable, columns, sizePage, infoMsg, renderBtn}) => {
    
    const [searchValue, setSearchValue] = useState('');
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(sizePage);
    

    const handlePageChange = (newPageIndex) => {
      setPageIndex(newPageIndex);
    };

   
    const rows_mem = useMemo(() => {
        let filteredRows = dataTable;
      
        if (searchValue) {
          const searchRegex = new RegExp(searchValue, 'i');
          filteredRows = filteredRows.filter(row =>
            Object.values(row).some(value => searchRegex.test(value))
          );
        }
        
        return filteredRows.map(row => {
          const newRow = {};
          Object.keys(row).forEach(key => {
            newRow[key] = 
              row[key]
            ;
          });
          return newRow;
        });


      }, [dataTable, searchValue]);

      const pageCount = useMemo(() => {return Math.ceil(rows_mem.length / pageSize);}, [rows_mem]);
      const data = useMemo(() => rows_mem.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize), [rows_mem, pageIndex, pageSize]);
      const {
          getTableProps,
          getTableBodyProps,
          headerGroups,
          rows,
          prepareRow
      } = useTable({
          columns,
          data
      });

    return (
        <>
        {dataTable.length === 0 ?
           <>
            <Alert variant="info" className='text-center'>{infoMsg}</Alert>
           </>
        :
            <>
            <InputGroup>
            
            <Input
            type="text"
            name="search"
            id="search"
            value={searchValue}
            placeholder="Search..."
            onChange={(e) => setSearchValue(e.target.value)}
            />
            {renderBtn()}
            </InputGroup>
            <Table {...getTableProps()} striped>
            <thead>
                {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                    ))}
                </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row);
                    return (
                    <tr {...row.getRowProps()}>
                        {row.cells.map(cell => {
                            
                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                        })}
                    </tr>
                    );
                })}
            </tbody>
            </Table>
            {(pageIndex === 0 && pageIndex === pageCount - 1 || pageCount === 0)? <></>:
            <Paging pageIndex={pageIndex}
                    pageCount={pageCount}
                    onPageChange={handlePageChange}
            />}
            
            </>
        }
        </>
    );
};

export default TableSearchPagin;
