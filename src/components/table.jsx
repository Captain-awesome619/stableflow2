"use client"
import React from 'react';
import { useTable } from 'react-table';

const DataTable = () => {
  const data = React.useMemo(
    () => [
      {
        description: 'Transaction 1',
        date: '2024-10-12',
        type: 'Credit',
        amount: 100,
        status: 'Completed',
      },
      {
        description: 'Transaction 2',
        date: '2024-10-11',
        type: 'Debit',
        amount: 50,
        status: 'Pending',
      },
      {
        description: 'Transaction 2',
        date: '2024-10-11',
        type: 'Debit',
        amount: 50,
        status: 'Pending',
      },
      {
        description: 'Transaction 2',
        date: '2024-10-11',
        type: 'Debit',
        amount: 50,
        status: 'Pending',
      },
      {
        description: 'Transaction 2',
        date: '2024-10-11',
        type: 'Debit',
        amount: 50,
        status: 'Pending',
      },
      // Add more rows as needed
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: 'Description',
        accessor: 'description',
        align: 'left',
      },
      {
        Header: 'Date',
        accessor: 'date',
        align: 'left',
      },
      {
        Header: 'Type',
        accessor: 'type',
        align: 'left',
      },
      {
        Header: 'Amount',
        accessor: 'amount',
        align: 'right',
      },
      {
        Header: 'Status',
        accessor: 'status',
        align: 'left',
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <table {...getTableProps()} className="min-w-full border-collapse border ">
      <thead className="bg-gray-100">
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
                {...column.getHeaderProps()}
                className={`border border-gray-300 p-2 ${column.align === 'right' ? 'text-right' : 'text-left'}`}
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} className="even:bg-gray-50">
              {row.cells.map(cell => (
                <td
                  {...cell.getCellProps()}
                  className={`border  p-2 ${cell.column.align === 'right' ? 'text-right' : 'text-left'}`}
                >
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DataTable;
