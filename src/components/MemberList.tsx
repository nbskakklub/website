import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet'

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react';

type Props = {
  members;
};
export default function MemberList({ members }: Props) {
  type Event = {
    Name: string
    Id: number
    Invitation: boolean
    Weekend: boolean
    Youth: boolean
    EloRatet: boolean
    Participants: number
    Started: boolean
    HovedKreds: number
  }

  const defaultData: Event[] = []
  members.forEach((member: Event) => {
    defaultData.push(member)
  });

  const columnHelper = createColumnHelper<Event>()

  const columns = [
    columnHelper.accessor('Name', {
      footer: info => info.column.id,
    }),
    columnHelper.accessor('Invitation', {
      footer: info => info.column.id,
    }),
    columnHelper.accessor('Participants', {
      footer: info => info.column.id,
    }),
    columnHelper.accessor('HovedKreds', {
      footer: info => info.column.id,
    }),
    columnHelper.accessor('EloRatet', {
      footer: info => info.column.id,
    }),
    columnHelper.accessor('Started', {
      footer: info => info.column.id,
    }),
  ]
  const [data, setData] = useState(() => [...defaultData])
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return(
    <Sheet variant="outlined" sx={{ borderRadius: '10px', padding: '0px', margin: '20px', maxHeight:'500px', overflowX:'hidden', overflow: 'scroll', maxWidth:'1000px' }}>
      <Table hoverRow stickyHeader sx={{ overflowX:'hidden' }} >
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
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
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </Sheet>
  );
}
