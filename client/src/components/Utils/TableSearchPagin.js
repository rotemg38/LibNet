import React, { useMemo, useState } from "react";
import { Alert, InputGroup, Table } from "react-bootstrap";
import { useTable } from 'react-table';
import { Input } from "reactstrap";
import Paging from "./Paging";

const TableSearchPagin = ({ idTable, dataTable, columns, sizePage, infoMsg, renderBtn }) => {

  const [searchValue, setSearchValue] = useState('');
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(sizePage);


  const handlePageChange = (newPageIndex) => {
    setPageIndex(newPageIndex);
  };

  /**
   * Given a search value search from the filteredRows the relevant rows
   * @param {*} searchValue contain single value or header name with value
   * @param {*} filteredRows data rows we search them
   * @returns the filtered rows
   */
  const search_header = (searchValue, filteredRows) => {
    let result = []
    // if include the # means search by header name
    if (searchValue.includes('#')) {
      let splitted = searchValue.split('#')
      let value = splitted[splitted.length - 1]
      let headers = splitted.slice(0, splitted.length - 1)

      result = filteredRows.filter(row =>
        headers.some(header =>
          Object.prototype.hasOwnProperty.call(row, header) &&
          new RegExp(value, 'i').test(row[header])
        )
      );
    } else {
      const searchRegex = new RegExp(searchValue, 'i');
      result = filteredRows.filter(row =>
        Object.values(row).some(value => searchRegex.test(value))
      );
    }
    return result
  }

  /**
   * Given search query calculate the relevant rows
   * @param {*} searchValue search query contains AND (^), OR (|), Header (#)
   * @param {*} filteredRows rows we search them
   * @returns the filtered rows
   */
  const search_calculate = (searchValue, filteredRows) => {
    if (searchValue) {
      const or_splitted = searchValue.split('|');

      //for every row we check if stands in the condition search
      const result = filteredRows.filter(row =>
        or_splitted.some(orCondition =>
          orCondition.split('^').every(andCondition =>
            search_header(andCondition, [row]).length > 0
          )
        )
      );

      return result;
    }

    return filteredRows;
  };

  const rows_mem = useMemo(() => {
    let filteredRows = dataTable;
    filteredRows = search_calculate(searchValue, filteredRows)

    return filteredRows.map(row => {
      const newRow = {};
      Object.keys(row).forEach(key => {
        newRow[key] = row[key];
      });
      return newRow;
    });


  }, [dataTable, searchValue]);

  const pageCount = useMemo(() => { return Math.ceil(rows_mem.length / pageSize); }, [rows_mem]);
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
              title="AND (^), OR (|), After Header Name(#)"
              value={searchValue}
              placeholder="Search..."
              onChange={(e) => setSearchValue(e.target.value)}
            />
            {renderBtn()}
          </InputGroup>
          <Table id={idTable} {...getTableProps()} striped>
            <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()}>
                      <span title={column.id}>
                        {column.render('Header')}
                      </span>
                    </th>
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
          {(pageIndex === 0 && pageIndex === pageCount - 1 || pageCount === 0) ? <></> :
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
