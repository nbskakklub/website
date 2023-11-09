'use client';

import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet'

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  Row,
} from '@tanstack/react-table'
import { Fragment, useState } from 'react';

type Props = {
  members: Member[];
};

type Member = {
  Nummer: string;
  Navn: string;
  Klub: string;
  Titel: string;
  Rating: string;
  Lyn: string;
  Fiderating: string;
  Fide: string;
  K_factor: string;
  Foedtaar: string;
  Hurtig: string;
};

function Row(row: Row<Member>) {
  return (
    <Fragment>
      <tr key={row.id} style={{ position: 'relative', backgroundColor: '#FBFCFE', zIndex: 1 }}>
        {row.getVisibleCells().map(cell => (
          <td key={cell.id} >
              <div style={{ display: 'flex' }}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </div>
          </td>
        ))}
      </tr>
    </Fragment>
  );
}

export default function TurnamentList({ members }: Props) {
  const columnHelper = createColumnHelper<Member>()

  const columns = [
    columnHelper.accessor('Navn', {
      header: 'Navn',
      footer: info => info.column.id,
    }),
    columnHelper.accessor('Rating', {
      header: 'Rating',
      footer: info => info.column.id,
    }),
    columnHelper.accessor('Lyn', {
      header: 'Lyn rating',
      footer: info => info.column.id,
    }),
    columnHelper.accessor('Hurtig', {
      header: 'Hurtig rating',
      footer: info => info.column.id,
    }),
    columnHelper.accessor('Fiderating', {
      header: 'Fide rating',
      footer: info => info.column.id,
    }),
    columnHelper.accessor('K_factor', {
      header: 'K faktor',
      footer: info => info.column.id,
    }),
  ]
  const [data, setData] = useState(() => [...members])
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <Sheet variant="outlined" sx={{ borderRadius: '10px', padding: '0px', margin: '20px', maxHeight: '75vh', overflowX: 'hidden', overflowY: 'scroll', maxWidth: '1000px' }}>
      <Table stickyHeader sx={{ overflowX: 'hidden', maxHeight: '75vh' }} >
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id} >
              {headerGroup.headers.map(header => (
                <th key={header.id} style={{ width: (header.column.columnDef.header == 'Turnering' ? '30%' : '') }}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <Row key={row.id} {...row} />
          ))}
        </tbody>
      </Table>
    </Sheet>
  );
}
