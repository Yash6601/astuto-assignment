import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import {
  Box,
} from '@mui/material';

import {data} from "@/server/mock-data";

//example data type
export type Employee = {
  name: string;
  status: string;
  role: string;
  email: string;
  teams: string[];
  avatar: string;
};

//nested data is ok, see accessorKeys in ColumnDef below


const Example = () => {
  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<Employee>[]>(
    () => [
      {
        accessorFn: (row) => row.name, //accessorFn used to join multiple data into a single cell
        id: 'name', //id is still required when using accessorFn instead of accessorKey
        header: 'Name',
        size: 250,
        Cell: ({ renderedCellValue, row }) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <img
              alt="avatar"
              height={50}
              width={50}
              src={row.original.avatar}
              loading="lazy"
              style={{ borderRadius: '50%' }}
            />
            {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
            <div>
              <div className="text-lg">{renderedCellValue}</div>
              <div className="text-[#5D5D5D]">@{renderedCellValue?.toString().toLowerCase()}</div>
            </div>

          </Box>
        ),
      },
      // {
      //   accessorKey: 'name', //access nested data with dot notation
      //   header: 'Name',
      //   size: 150,
      // },
      {
        accessorKey: 'status',
        header: 'Status',
        Cell: ({ row }) => (
          <Box sx={{ display: 'flex', gap: '2ch', alignItems: 'center' }}>
            <div className="px-[8px] py-[2px] bg-[#CCE6FF] text-[#0080FF] rounded-2xl">{row.original.status}</div>
          </Box>
        ),
        size: 150,
      },
      {
        accessorKey: 'role', //normal accessorKey
        header: 'Role',
        Cell: ({ row }) => (
          <Box sx={{display: 'flex', gap: '2ch', alignItems: 'center'}}>
            <div className="text-lg">{row.original.role}</div>
          </Box>
        ),
        size: 200,
      },
      {
        accessorKey: 'email',
        header: 'Email',
        Cell: ({ row }) => (
          <Box sx={{display: 'flex', gap: '2ch', alignItems: 'center'}}>
            <div className="text-lg">{row.original.email}</div>
          </Box>
        ),
        size: 150,
      },
      {
        accessorKey: 'teams',
        header: 'Teams',
        Cell: ({ row }) => (
          <Box sx={{display: 'flex', gap: '2ch', alignItems: 'center'}}>
            <div className="flex gap-1">
              {row.original.teams.slice(0, 3).map((team, index) => (
                <div  className="px-[8px] py-[2px] bg-[#CCE6FF] text-[#0080FF] rounded-2xl" key={index}>{team}</div>
              ))}
              {row.original.teams.length > 3 && <div className="px-[8px] py-[2px] bg-[#F2F2F2] rounded-2xl">+{row.original.teams.length - 3}</div>}
            </div>
          </Box>
        ),
        size: 150,
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableRowSelection: true,
    enableKeyboardShortcuts: false,
    enableColumnActions: false,
    enableColumnFilters: false,
    enableSorting: false,
    muiTableBodyRowProps: { hover: false },
    enableTopToolbar:false,
    paginationDisplayMode: 'pages',
    muiPaginationProps:{
      showRowsPerPage: false,
    }

  });

  return <MaterialReactTable table={table} />;
};

export default Example;
