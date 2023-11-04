import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet'
import Button from '@mui/joy/Button'
import parse from 'html-react-parser'
import ModalOverflow from '@mui/joy/ModalOverflow';
import ModalDialog from '@mui/joy/ModalDialog';


import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react';
import { Modal, ModalClose, Typography } from '@mui/joy';

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
    Description: string
  }

  const defaultData: Event[] = members.filter((member: Event) => member.HovedKreds == 1)

  const columnHelper = createColumnHelper<Event>()

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [modalTitle, setModalTitle] = useState('');

  const columns = [
    columnHelper.accessor('Name', {
      header: 'Navn',
      footer: info => info.column.id,
    }),
    columnHelper.accessor('Youth', {
      header: 'Ungdom',
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
    columnHelper.display({
      header: 'Description',
      cell: info => (<Button onClick={() => {
        setModalContent(info.row.original.Description ? info.row.original.Description : 'Ingen beskrivelse')
        setModalTitle(info.row.original.Name)
        setModalOpen(true)
      }} variant="solid">Click me</Button>),
    }),
  ]
  const [data, setData] = useState(() => [...defaultData])
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return(
    <div>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <ModalOverflow>
          <ModalDialog
            layout='center'
            sx={{
              maxWidth: 500,
              borderRadius: 'md',
              p: 3,
              boxShadow: 'lg',
            }}
          >
            <div>
              <ModalClose variant="plain" />
              <Typography
                component="h2"
                id="modal-title"
                level="h4"
                textColor="inherit"
                fontWeight="lg"
                marginRight={3}
                mb={1}
              >
                {modalTitle}
              </Typography>
            </div>
            <Typography id="modal-desc" textColor="inherit" >{parse(modalContent)}</Typography>
          </ModalDialog>
        </ModalOverflow>
      </Modal>
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
    </div>
  );
}
