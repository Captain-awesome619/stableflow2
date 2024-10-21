"use client"
import React from 'react';
import { useTable } from 'react-table';
import send from '../app/assests/send2.png'
import Image from 'next/image';
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
    <>
    <table {...getTableProps()} className="lg:min-w-full hidden lg:block  border-collapse border ">
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

    <div className='grid gap-[0.5rem] '>
    <div className='flex items-center justify-between'>
    <h3 className='text-primary1 font-[600] text-[17px] '>Transaction</h3>
    <h3 className='text-primary2 font-[400] text-[14px] cursor-pointer '>View all</h3>
    </div>
    <div className='flex flex-row justify-between items-center'>
    <div className='flex items-center justify-center gap-[0.5rem] '>
    <Image
    height={40}
    width={40}
    alt='wallet'
    src={send}
    className='w-[40px] h-[40px] '
    />
    <div className='grid gap-[0.5rem]'>
    <h3 className='text-[#2B2B2B] font-[400] text-[16px] '>Layi Wasabi</h3>
    <h3 className='text-primary2 font-[400] text-[14px] cursor-pointer '>OCT 3,2024</h3>
    </div>
    </div>
    <h3 className='text-primary1 font-[500] text-[16px] '>+{""} N123,000</h3>
    </div>
    <div className='flex flex-row justify-between items-center'>
    <div className='flex items-center justify-center gap-[0.5rem] '>
    <Image
    height={40}
    width={40}
    alt='wallet'
    src={send}
    className='w-[40px] h-[40px] '
    />
    <div className='grid gap-[0.5rem]'>
    <h3 className='text-[#2B2B2B] font-[400] text-[16px] '>Layi Wasabi</h3>
    <h3 className='text-primary2 font-[400] text-[14px] cursor-pointer '>OCT 3,2024</h3>
    </div>
    </div>
    <h3 className='text-primary1 font-[500] text-[16px] '>+{""} N123,000</h3>
    </div>
    <div className='flex flex-row justify-between items-center'>
    <div className='flex items-center justify-center gap-[0.5rem] '>
    <Image
    height={40}
    width={40}
    alt='wallet'
    src={send}
    className='w-[40px] h-[40px] '
    />
    <div className='grid gap-[0.5rem]'>
    <h3 className='text-[#2B2B2B] font-[400] text-[16px] '>Layi Wasabi</h3>
    <h3 className='text-primary2 font-[400] text-[14px] cursor-pointer '>OCT 3,2024</h3>
    </div>
    </div>
    <h3 className='text-primary1 font-[500] text-[16px] '>+{""} N123,000</h3>
    </div>
    <div className='flex flex-row justify-between items-center'>
    <div className='flex items-center justify-center gap-[0.5rem] '>
    <Image
    height={40}
    width={40}
    alt='wallet'
    src={send}
    className='w-[40px] h-[40px] '
    />
    <div className='grid gap-[0.5rem]'>
    <h3 className='text-[#2B2B2B] font-[400] text-[16px] '>Layi Wasabi</h3>
    <h3 className='text-primary2 font-[400] text-[14px] cursor-pointer '>OCT 3,2024</h3>
    </div>
    </div>
    <h3 className='text-primary1 font-[500] text-[16px] '>+{""} N123,000</h3>
    </div>
    </div>
    </>
  );
};

export default DataTable;
