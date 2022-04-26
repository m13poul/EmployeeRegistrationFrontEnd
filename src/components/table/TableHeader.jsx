import React from 'react'
import { useTable, usePagination, useSortBy, useRowSelect, useFilters, useGlobalFilter, } from "react-table";
import GlobalFilter from "./globalFilter"
import { COLUMNS } from "./COLUMNS.js";
import { v4 as uuidv4 } from "uuid";




const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    );
  }
);


function TableHeader({ employees }) {

  const columns = COLUMNS;
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    selectedFlatRows,
    state: { pageIndex, pageSize, selectedRowIds, globalFilter },
    setGlobalFilter,
  } = useTable(
    { columns, data: employees, initialState: { pageIndex: 0 } },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        // Let's make a column for selection
        {
          id: "selection",
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );
  return (
    <table
      {...getTableProps()}
      className="min-w-full text-left text-sm text-gray-500"
    >
      <thead className="bg-[#bbd3ee] text-xs uppercase text-secondary">
        {headerGroups.map((headerGroup) => (
          <tr
            {...headerGroup.getHeaderGroupProps()}
            key={uuidv4()}
            className=""
          >
            {headerGroup.headers.map((column) => (
              <>
                <th
                  {...column.getHeaderProps(
                    column.getSortByToggleProps()
                  )}
                  className="px-6 py-3 hover:scale-110 ease-in"
                  key={uuidv4()}
                >

                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              </>
            ))}
          </tr>
        ))}
      </thead>
      {/* <div className="">{isFetching ? <p className=" ">Loading data...</p> : <p className=" ">Loading data...</p>}</div> */}
      <tbody {...getTableBodyProps()} className="">
        {page.map((row, i) => {
          prepareRow(row);
          return (
            <tr
              {...row.getRowProps}
              className="border-b bg-white  hover:bg-gray-200"
              key={uuidv4()}
            >
              {row.cells.map((cell) => (
                <td
                  {...cell.getCellProps()}
                  className="px-6 py-4"
                  key={uuidv4()}
                >
                  {cell.render("Cell")}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
      <thead className="bg-[#bbd3ee] text-xs uppercase text-secondary">
        {headerGroups.map((headerGroup) => (
          <tr
            {...headerGroup.getHeaderGroupProps()}
            key={uuidv4()}
            className=""
          >
            {headerGroup.headers.map((column) => (
              <>
                <th
                  {...column.getHeaderProps(
                    column.getSortByToggleProps()
                  )}
                  className="px-6 py-3 hover:scale-110 ease-in"
                  key={uuidv4()}
                >

                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              </>
            ))}
          </tr>
        ))}
      </thead>
    </table>
  )
}

export default TableHeader