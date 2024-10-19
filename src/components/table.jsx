"use client"
import React from 'react';
import { useTable } from 'react-table';

const DataTable = () => {
  const data = React.useMemo(
    () => [
      {
        id: 1,
        description: 'Transaction 1',
        date: '2024-10-12',
        type: 'Credit',
        amount: 100,
        status: 'Completed',
      },
      {
        id: 2,
        description: 'Transaction 2',
        date: '2024-10-11',
        type: 'Debit',
        amount: 50,
        status: 'Pending',
      },
      {
        id: 3,
        description: 'Transaction 3',
        date: '2024-10-11',
        type: 'Debit',
        amount: 50,
        status: 'Pending',
      },
      {
        id: 4,
        description: 'Transaction 4',
        date: '2024-10-11',
        type: 'Debit',
        amount: 50,
        status: 'Pending',
      },
      {
        id: 5,
        description: 'Transaction 5',
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
    <table {...getTableProps()} className="lg:min-w-full  border-collapse border ">
      <thead className="bg-gray-100">
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                key={column.id}
                className={`border border-gray-300 p-2 ${column.align === 'right' ? 'text-right' : 'text-left'}`}
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} key={row.id} className="even:bg-gray-50">
              {row.cells.map((cell) => (
                <td
                  {...cell.getCellProps()}
                  key={cell.column.id}
                  className={`border p-2 ${cell.column.align === 'right' ? 'text-right' : 'text-left'}`}
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
