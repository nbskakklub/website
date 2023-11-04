import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet'
import Button from '@mui/joy/Button'
import parse from 'html-react-parser'
import ModalOverflow from '@mui/joy/ModalOverflow';
import ModalDialog from '@mui/joy/ModalDialog';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import {
  ExpandedState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  Table as TableType,
  Row,
} from '@tanstack/react-table'
import { Fragment, useState } from 'react';
import { IconButton, Modal, ModalClose, Typography } from '@mui/joy';

type Props = {
  turnaments: Turnament[];
};

export type Turnament = {
  Name: string
  Id: number
  Invitation: boolean
  Weekend: boolean
  Youth: boolean
  EloRatet: boolean
  Participants: number
  Started: boolean
  HovedKreds: number
  EndDate: string
  StartDate: string
  IsBlitz: boolean
  IsRapid: boolean
  NationalRated: boolean
  HasWheelchair: boolean
  EnrolmentOpen: boolean
  Description: string
}

function Row(row: Row<Turnament>) {
  const [open, setOpen] = useState(false);

  return(
    <Fragment>
      <tr key={row.id}>
        {row.getVisibleCells().map(cell => (
          <td key={cell.id}>
            {row.original.Description && cell.column.columnDef.header == 'Turnering' ? (<IconButton onClick={()=>setOpen(!open)} >{open ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}</IconButton>) : null}
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        ))}
      </tr>
      { open ? (
        <tr key="what">{parse(row.original.Description)}</tr>
      ) : null }
    </Fragment>
  );
}

export default function TurnamentList({ turnaments }: Props) {
  const defaultData: Turnament[] = turnaments.filter((turnament: Turnament) => turnament.HovedKreds == 1)

  const columnHelper = createColumnHelper<Turnament>()

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [modalTitle, setModalTitle] = useState('');

  const columns = [
    columnHelper.accessor('Name', {
      header: 'Turnering',
      cell: ({ row, getValue }) => (
        <div>
          {getValue()}
        </div>
      ),
      footer: info => info.column.id,
    }),
    columnHelper.accessor('Youth', {
      header: 'Ungdom',
      cell: info => info.row.original.Started ? 'Ja' : 'Nej',
      footer: info => info.column.id,
    }),
    columnHelper.accessor('Participants', {
      header: 'Deltagere',
      footer: info => info.column.id,
    }),
    columnHelper.accessor('HovedKreds', {
      header: 'Hovedkreds',
      footer: info => info.column.id,
    }),
    columnHelper.accessor('EloRatet', {
      header: 'Elo ratet',
      cell: info => info.row.original.Started ? 'Ja' : 'Nej',
      footer: info => info.column.id,
    }),
    columnHelper.accessor('Started', {
      header: 'I gang',
      cell: info => info.row.original.Started ? 'Ja' : 'Nej',
      footer: info => info.column.id,
    }),
    columnHelper.display({
      header: 'Beskrivelse',
      cell: info => (<Button onClick={() => {
        setModalContent(info.row.original.Description ? info.row.original.Description : 'Ingen beskrivelse')
        setModalTitle(info.row.original.Name)
        setModalOpen(true)
      }} variant="solid" sx={{ minWidth: '75' }}>Vis</Button>),
    }),
  ]
  const [data, setData] = useState(() => [...defaultData])
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return(
    <div style={{ maxHeight:'80vh' }}>
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
      <Sheet variant="outlined" sx={{ borderRadius: '10px', padding: '0px', margin: '20px', maxHeight:'75vh', overflowX:'hidden', overflow: 'scroll', maxWidth:'1000px' }}>
        <Table hoverRow stickyHeader sx={{ overflowX:'hidden', maxHeight:'75vh' }} >
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
              <Row {...row} />
            ))}
          </tbody>
        </Table>
      </Sheet>
    </div>
  );
}
