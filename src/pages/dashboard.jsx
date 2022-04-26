import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { COLUMNS } from "../components/table/COLUMNS.js";
import { useTable, usePagination, useSortBy, useRowSelect, useFilters, useGlobalFilter, } from "react-table";
import { v4 as uuidv4 } from "uuid";
import { IconContext } from "react-icons";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase.utils.js";
import { exportAllEmployeesToPDF, exportData } from "../../dataUtils.js";
import { MdPictureAsPdf, MdLogout, MdDelete, MdEdit, MdConstruction, MdChevronRight, MdChevronLeft, MdLastPage, MdFirstPage, } from "react-icons/md";
import { GiDatabase } from "react-icons/gi";
import GlobalFilter from "../components/table/globalFilter.jsx";
import { motion, AnimatePresence } from "framer-motion";
import { useGetAllEmployeesFromDatabaseQuery } from "../features/dataFetchAPI.js";
import ConfirmDelete from "../components/confirmDeletePopup.jsx";
import { onAuthStateChanged } from "firebase/auth";
import ErrorMessage from "../components/errorMessage.jsx";



// This file should be cleaned up a bit. Also some optimization should be done, break into components, move some functionality to store etc.. . ATM may be a bit difficult to read.

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

// Page Component
function Dashboard({ }) {
  const [deleteWarning, setDeleteWarning] = useState({ show: false });
  const [showEdit, setShowEdit] = useState({ show: false });
  const [employees, setEmployees] = useState([]);

  const navigate = useNavigate();

  const { data: allEmployees, error, isFetching } = useGetAllEmployeesFromDatabaseQuery()

  useEffect(() => {
    isFetching ? null : allEmployees ? setEmployees(allEmployees) : null
    // console.log(error)
  }, [allEmployees]);

  // If there is not user, redirect to login page
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/administration', { replace: true })
      }
    });
    return () => unsubscribe()
  }, []);

  const columns = useMemo(() => COLUMNS);
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


  function handleSignOut() {
    signOut(auth);
  }

  const handleDelete = (e, rowsToDelete) => {
    e.preventDefault();
    if (rowsToDelete.length == employees.length) {
      setEmployees([])
      fetch(`${import.meta.env.VITE_BACKEND_HOST}/${import.meta.env.VITE_API_KEY}/deleteAll`, {
        method: "DELETE"
      })
      return;
    }
    console.log(rowsToDelete);
    let rowsToBeDeleted = [];
    rowsToDelete.map((row) => {
      rowsToBeDeleted.push(row.cells[6].value);
    });
    console.log("rowToBeDeleted", rowsToBeDeleted.length);
    if (rowsToBeDeleted.length === 0) {
      console.log("fire", rowsToBeDeleted.length);
      setDeleteWarning({ ...deleteWarning, show: !deleteWarning.show });
      setTimeout(() => {
        setDeleteWarning({ ...deleteWarning, show: false });
      }, 4000);
    }
    setEmployees(
      employees.filter((employee) => !rowsToBeDeleted.includes(employee._id))
    );
    fetch(`${import.meta.env.VITE_BACKEND_HOST}/${import.meta.env.VITE_API_KEY}/rowsToBeDeleted`, {
      method: "DELETE",
      body: JSON.stringify(rowsToBeDeleted),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  const handleEdit = (e) => {
    e.preventDefault();
    setShowEdit({ ...showEdit, show: !showEdit.show });
    setTimeout(() => {
      setShowEdit({ ...showEdit, show: false });
    }, 4000);
  };
  // console.log(getSortByToggleProps)
  const spring = React.useMemo(
    () => ({
      type: 'spring',
      damping: 50,
      stiffness: 100,
    }),
    []
  )

  return (
    <>
      <AnimatePresence>
        <motion.div initial={{ opacity: 0, y: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} >
          <div className="h-screen overflow-y-scroll bg-[#E1EFFF]">
            <div className="container mx-auto grid grid-cols-12 justify-items-start bg-[#E1EFFF] font-lora text-secondary">
              <div className="mt-12 px-4  text-center">
                <div className="text-3xl">Internal Dashboard</div>
                <button
                  className="my-12 flex  items-center  rounded-md bg-[#FF9E43] p-2 text-xl transition duration-500 hover:-translate-y-2 hover:bg-[#FC7A00]"
                  onClick={() => exportAllEmployeesToPDF(employees)}
                >
                  <div>Export to PDF</div>
                  <div>
                    <MdPictureAsPdf />
                  </div>
                </button>
                <button
                  className="my-12 flex w-full items-center rounded-md bg-[#FF9E43] p-2 text-xl transition duration-500 hover:-translate-y-2 hover:bg-[#FC7A00]"
                  onClick={() => exportData(employees)}
                >
                  <div className="">Export Data </div>
                  <div>
                    <GiDatabase />
                  </div>
                </button>
                {/* <button className="my-12 flex w-full items-center rounded-md bg-[#FF9E43] p-2 text-xl transition duration-500 hover:-translate-y-2 hover:bg-[#FC7A00]">
                  Generate some data
                </button> */}
                <button
                  className="my-12 flex w-full items-center justify-center rounded-md bg-[#FF9E43] p-2 text-xl transition duration-500 hover:-translate-y-2 hover:bg-[#FC7A00]"
                  onClick={handleSignOut}
                >
                  <div className="">Logout </div>
                  <div>
                    <MdLogout />
                  </div>
                </button>
              </div>
              <div className="col-span-10 col-start-3 w-full">
                <div className="my-12 text-center text-3xl font-semibold text-secondary">
                  There are currently {employees?.length} employees registered
                </div>
                <div className="my-6 flex items-center justify-center gap-x-4">
                  <p className="rounded-md border border-secondary p-2">
                    CRUD Operations
                  </p>
                  <button
                    className="flex items-center rounded-md bg-red-600 p-2 text-white duration-500 hover:scale-110"
                    onClick={(e) => handleDelete(e, selectedFlatRows)}
                  >
                    <p>Delete</p>
                    <MdDelete />
                    {/* Delete confirmation to be implemented!!  */}
                    {/* <ConfirmDelete>
                      Are you sure you want to delete  employees ? This action is irreversible

                    </ConfirmDelete> */}
                  </button>
                  <button
                    className="flex items-center rounded-md bg-gray-600 p-2 text-white duration-500 hover:scale-110"
                    onClick={(e) => handleEdit(e)}
                  >
                    <p>Edit</p>
                    <MdEdit />
                  </button>
                  <div className="">
                    <GlobalFilter
                      filter={globalFilter}
                      setFilter={setGlobalFilter}
                    />
                  </div>
                  <p className="text-2xl font-semibold">
                    Hint: Click on a header to sort accordingly
                  </p>
                </div>
                <div>
                  {deleteWarning.show ? (
                    <motion.p
                      initial={{ opacity: 0, y: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1 }}
                      className="my-4 rounded-md bg-red-600 p-2 text-center text-2xl text-white  duration-100"
                    >
                      You should choose at least one item to remove!
                    </motion.p>
                  ) : null}
                </div>
                <div>
                  {showEdit.show ? (
                    <motion.div
                      initial={{ opacity: 0, y: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1 }}
                      className="my-4 flex items-center justify-center rounded-md bg-gray-600 p-2  text-center text-2xl text-white duration-100"
                    >
                      <MdConstruction />
                      <p>This functionality is currently under maintanance!</p>
                      <MdConstruction />
                    </motion.div>
                  ) : null}
                </div>



                {isFetching ?
                  <div className="text-5xl text-center">
                    <div className="fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center">
                      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900">
                      </div>
                    </div>
                    We fetching the data. Hold on...
                  </div>
                  :

                  <div>
                    {error ? <ErrorMessage /> : null}
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
                                <motion.th
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
                                </motion.th>
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
                                <motion.th
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
                                </motion.th>
                              </>
                            ))}
                          </tr>
                        ))}
                      </thead>
                    </table>
                  </div>
                }




                <div className="pagination mb-12 text-secondary">
                  <div className="mt-4 flex items-center justify-center">
                    <IconContext.Provider
                      value={{ style: { fontSize: "30px" } }}
                    >
                      <MdFirstPage
                        onClick={() => gotoPage(0)}
                        disabled={!canPreviousPage}
                      />
                      <MdChevronLeft
                        onClick={() => previousPage()}
                        disabled={!canPreviousPage}
                      />
                      <MdChevronRight
                        onClick={() => nextPage()}
                        disabled={!canNextPage}
                      />
                      <MdLastPage
                        onClick={() => gotoPage(pageCount - 1)}
                        disabled={!canNextPage}
                      />
                    </IconContext.Provider>
                    <span>
                      Page{" "}
                      <strong>
                        {pageIndex + 1} of {pageOptions.length}
                        {""}
                      </strong>{" "}
                    </span>{" "}
                    <span>
                      &nbsp;| Go to page:{" "}
                      <input
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={(e) => {
                          const page = e.target.value
                            ? Number(e.target.value) - 1
                            : 0;
                          gotoPage(page);
                        }}
                        style={{ width: "100px" }}
                        className=" border-none bg-transparent text-center focus:ring-0"
                      />
                    </span>{" "}
                    <select
                      value={pageSize}
                      onChange={(e) => {
                        setPageSize(Number(e.target.value));
                      }}
                      className=" border-none bg-transparent focus:ring-0"
                    >
                      {[5, 10, 20, 30].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                          Show {pageSize}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <footer className="mb-12 text-center">
                  Developed by{" "}
                  <span className=" ">
                    <a
                      href="https://github.com/m13poul"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button className="rounded-md bg-[#FF9E43] px-2 py-1 transition duration-500 hover:-translate-y-2 hover:bg-[#FC7A00] ">
                        Chris
                      </button>
                    </a>
                  </span>{" "}
                  at April 2022
                </footer>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default Dashboard;