import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet'
import Button from '@mui/joy/Button'
import parse from 'html-react-parser'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  Row,
} from '@tanstack/react-table'
import { Fragment, useRef, useState } from 'react';
import { ButtonGroup, IconButton, MenuItem, MenuList } from '@mui/joy';
import { ClickAwayListener, Grow, Paper, Popper, Slide } from '@mui/material';

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

function RegisterButton(row: Row<Turnament>) {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);

  const handleClick = (option: number, eventId: number) => {
    let url = '';
    switch(option) {
      case 0:
        url = 'https://turnering.skak.dk/Player/AddPlayerDSU/' + eventId;
        break;
      case 1:
        url = 'https://turnering.skak.dk/Player/AddPlayerFide/' + eventId;
        break;
      case 3:
        url = 'https://turnering.skak.dk/Player/AddPlayerNotDSU/' + eventId;
        break;
      case 2:
        url = 'https://turnering.skak.dk/Player/AddPlayerFideEn/' + eventId;
        break;
    }
    window.open(url, '_blank')
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <ButtonGroup ref={anchorRef} aria-label="split button">
        <Button variant="solid" onClick={() => {handleClick(0, row.original.Id)}}>{options[0]}</Button>
        <Button
          variant="solid"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={() => {setOpen((prevOpen) => !prevOpen)}}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex:99,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu">
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      onClick={() => handleClick(index, row.original.Id)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  )
}

function Row(row: Row<Turnament>) {
  const [open, setOpen] = useState(false);
  const dataRef = useRef(null)

  return(
    <Fragment>
      <tr ref={dataRef} key={row.id} style={{ position:'relative', backgroundColor: '#FBFCFE', zIndex:1 }}>
        {row.getVisibleCells().map(cell => (
          <td key={cell.id} >
            { cell.column.columnDef.header == 'Tilmeld' ? (
              row.original.Invitation ? (<RegisterButton { ...row } />) : 'Ingen tilmelding'
            ) : (
              <div style={{ display: 'flex' }}>
                {row.original.Description && cell.column.columnDef.header == 'Turnering' ? (<IconButton onClick={()=>setOpen(!open)} sx={{ marginRight: '10px' }} >{open ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}</IconButton>) : null}
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </div>
            )}
          </td>
        ))}
      </tr>
      <Slide container={dataRef.current} mountOnEnter unmountOnExit in={open} style={{ position: 'relative', zIndex: 0 }} ><tr key={row.id + "description"} className="description" ><td colSpan={6} key={row.id + "description-data"} style={{ padding: '15px' }}>{parse(row.original.Description)}</td></tr></Slide>
    </Fragment>
  );
}
const options = ['DSU', 'FIDE', 'FIDE (EN)', 'Uden medlemskab'];

export default function TurnamentList({ turnaments }: Props) {
  const columnHelper = createColumnHelper<Turnament>()

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
      cell: info => info.row.original.Youth ? 'Ja' : 'Nej',
      footer: info => info.column.id,
    }),
    columnHelper.accessor('Participants', {
      header: 'Deltagere',
      footer: info => info.column.id,
    }),
    columnHelper.accessor('EloRatet', {
      header: 'Elo ratet',
      cell: info => info.row.original.EloRatet ? 'Ja' : 'Nej',
      footer: info => info.column.id,
    }),
    columnHelper.accessor('Started', {
      header: 'I gang',
      cell: info => info.row.original.Started ? 'Ja' : 'Nej',
      footer: info => info.column.id,
    }),
    columnHelper.display({
      header: 'Tilmeld',
    }),
  ]
  const [data, setData] = useState(() => [...turnaments])
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return(
    <Sheet variant="outlined" sx={{ borderRadius: '10px', padding: '0px', margin: '20px', maxHeight:'75vh', overflowX:'hidden', overflow: 'scroll', maxWidth:'1000px' }}>
      <Table stickyHeader sx={{ overflowX:'hidden', maxHeight:'75vh' }} >
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
