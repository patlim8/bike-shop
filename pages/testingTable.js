import React from 'react'
// import styled from 'styled-components'
import { useTable, usePagination } from 'react-table'

import makeData from './makeData'

// const Styles = styled.div`
//   padding: 1rem;

//   table {
//     border-spacing: 0;
//     border: 1px solid black;

//     tr {
//       :last-child {
//         td {
//           border-bottom: 0;
//         }
//       }
//     }

//     th,
//     td {
//       margin: 0;
//       padding: 0.5rem;
//       border-bottom: 1px solid black;
//       border-right: 1px solid black;

//       :last-child {
//         border-right: 0;
//       }

//       input {
//         font-size: 1rem;
//         padding: 0;
//         margin: 0;
//         border: 0;
//       }
//     }
//   }

//   .pagination {
//     padding: 0.5rem;
//   }
// `

// Create an editable cell renderer
const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData, // This is a custom function that we supplied to our table instance
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue)

  const onChange = e => {
    setValue(e.target.value)
  }

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    updateMyData(index, id, value)
  }

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return <input value={value} onChange={onChange} onBlur={onBlur} />
}

// Set our editable cell renderer as the default Cell renderer
const defaultColumn = {
  Cell: EditableCell,
}

// Be sure to pass our updateMyData and the skipPageReset option
function Table({ columns, data, updateMyData, skipPageReset }) {
  // For this example, we're using pagination to illustrate how to stop
  // the current page from resetting when our data changes
  // Otherwise, nothing is different here.
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
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      // use the skipPageReset option to disable page resetting temporarily
      autoResetPage: !skipPageReset,
      // updateMyData isn't part of the API, but
      // anything we put into these options will
      // automatically be available on the instance.
      // That way we can call this function from our
      // cell renderer!
      updateMyData,
    },
    usePagination
  )

  // Render the UI for your table
  return (
    <>
      <table {...getTableProps()}>
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
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      {/* <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div> */}
    </>
  )
}

function App() {
  const columns = React.useMemo(
    () => [
      {
        // <th>ชื่อสินค้า</th>
        //     <th>รหัสสินค้า</th>
        //             <th>ยี่ห้อสินค้า</th>
        //             <th>รุ่นสินค้า</th>
        //             <th>จำนวน</th>
        //             <th>ราคา</th>
        //             <th>Edit</th>
        //             <th>Delete</th>
        Header: 'ชื่อสินค้า',
        accessor: 'product_name'
        
      },
      {
        Header: 'รหัสสินค้า',
        // columns: [
        //   {
        //     Header: 'Age',
        //     accessor: 'age',
        //   },
        //   {
        //     Header: 'Visits',
        //     accessor: 'visits',
        //   },
        //   {
        //     Header: 'Status',
        //     accessor: 'status',
        //   },
        //   {
        //     Header: 'Profile Progress',
        //     accessor: 'progress',
        //   },
        // ],
        accessor: 'code'


      },
      {
        Header: 'ยี่ห้อ',
        accessor: 'brand'
      },
      {
        Header: 'รุ่นสินค้า',
        accessor: 'model'
      },
      {
        Header: 'จำนวน',
        accessor: 'qty'
      },
      {
        Header: 'ราคา',
        accessor: 'totalP'
      }
    ],
    []
  )

  const [data, setData] = React.useState(() => makeData(20))
  const [originalData] = React.useState([{id: 0, product_name: 1, code: 2, brand: 3, model: 4, qty: 5, totalP: 6}])
  const [skipPageReset, setSkipPageReset] = React.useState(false)

  // We need to keep the table from resetting the pageIndex when we
  // Update data. So we can keep track of that flag with a ref.

  // When our cell renderer calls updateMyData, we'll use
  // the rowIndex, columnId and new value to update the
  // original data
  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true)
    setData(old =>
      // console.log(old),
      old.map((row, index) => {
        if (index === rowIndex) {
          console.log(old)
          return {
            ...old[rowIndex],
            [columnId]: value,
          }
        }
        return row
      })
    )
  }

  // After data chagnes, we turn the flag back off
  // so that if data actually changes when we're not
  // editing it, the page is reset
  React.useEffect(() => {
    setSkipPageReset(false)
    console.log(data)
  }, [data])

  // Let's add a data resetter/randomizer to help
  // illustrate that flow...
  const resetData = () => setData(originalData)

  return (
    // <Styles>
    <div>
      <button onClick={resetData}>Reset Data</button>
      <Table
        columns={columns}
        data={originalData}
        updateMyData={updateMyData}
        skipPageReset={skipPageReset}
      />
    {/* // </Styles> */}
    </div>
  )
}

export default App
