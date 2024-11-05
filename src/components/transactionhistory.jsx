import React from 'react'
import { useTable } from 'react-table';
import { CiWallet } from "react-icons/ci";
const Transactionhistory = ({transacthistory}) => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Description',
        accessor: 'description',
        align: 'left',
      },
      {
        Header: 'Date',
        accessor: 'createdAt',
        align: 'left',
      },
      {
        Header: 'CustomerName',
        accessor: 'customerName',
        align: 'left',
      },
      {
        Header: 'Amount(NGN)',
        accessor: 'amountInNGN',
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
  } = useTable({ columns, data : transacthistory });

  return (
    <>
      { transacthistory ? 
    <table {...getTableProps()} className="w-[full] hidden lg:table  border-collapse border  ">
      <thead className="bg-gray-100 ">
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
                  className={`border px-10 py-3 ${cell.column.align === 'right' ? 'text-right' : 'text-left'}`}
                >
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
 :  <h3 className='lg:flex hidden items-center justify-center text-[16px] text-primary1 '>You have no Transactions yet</h3> }

    <div className='grid gap-[0.5rem] lg:hidden '>
    <div className='flex items-center justify-between'>
    <h3 className='text-primary1 font-[600] text-[17px] '>Transactions</h3>
    <h3 className='text-primary2 font-[400] text-[14px] cursor-pointer '></h3>
    </div>
{transacthistory ?  transacthistory.map((transaction) => (
    <div className='flex flex-row justify-between items-center'>
    <div className='flex items-center justify-center gap-[0.5rem] '>
    <div className=' bg-[#D2E9FF] rounded-[50%] flex items-center justify-center w-[40px] h-[40px] '>
    <CiWallet size={25} className=' ' />
    </div>
    <div className='grid gap-[0.5rem]'>
    <h3 className='text-[#2B2B2B] font-[400] text-[16px] '>{transaction.customerName}</h3>
    <h3 className='text-primary2 font-[400] text-[14px] cursor-pointer '>{transaction.createdAt}</h3>
    </div>
    </div>
    <h3 className='text-primary1 font-[500] text-[16px] '>+{""} N{transaction.amountInNGN}</h3>
    </div>
  ))  : <h3 className='flex lg:hidden items-center justify-center text-[16px] text-primary1 '>You have no Transactions yet</h3>} 
    </div>
    </>
  );
};
export default Transactionhistory