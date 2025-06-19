import {
  ButtonGroup,
  Checkbox,
  CloseButton,
  Flex,
  IconButton,
  Input,
  InputGroup,
  Pagination,
  Stack,
  Table,
  type TableRootProps,
} from '@chakra-ui/react';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortDirection,
  type SortingState,
} from '@tanstack/react-table';
import { ArrowDownNarrowWide, ArrowDownUp, ArrowUpNarrowWide, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const PAGE_SIZE = 10;
export type DataTableProps<T> = {
  columns: ColumnDef<T>[];
  data: T[];
  customTableProps?: TableRootProps;
  setSelectedRows: (rows: T[]) => void;
  emptyStateElement?: React.ReactNode;
};

export const DataTable = <T extends { id: string }>(props: DataTableProps<T>) => {
  const { columns, data, customTableProps, setSelectedRows, emptyStateElement } = props;

  const inputRef = useRef<HTMLInputElement>(null);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const endElement = globalFilter ? (
    <CloseButton
      size="xs"
      onClick={() => {
        setGlobalFilter('');
        inputRef.current?.focus();
      }}
      me="-2"
    />
  ) : undefined;

  useEffect(() => {
    const selected = table.getSelectedRowModel().rows.map((r) => r.original);
    setSelectedRows(selected);
  }, [rowSelection]);

  const selectionColumn: ColumnDef<T> = {
    id: 'select',
    header: ({ table }) => (
      <Checkbox.Root
        cursor="pointer"
        colorPalette="brandPalette"
        border="1px solid"
        boxSizing="border-box"
        borderColor="white"
        color="white"
        checked={
          table.getIsAllRowsSelected() ? true : table.getSelectedRowModel().rows.length > 0 ? 'indeterminate' : false
        }
        onChange={table.getToggleAllRowsSelectedHandler()}>
        <Checkbox.HiddenInput />
        <Checkbox.Control />
      </Checkbox.Root>
    ),
    cell: ({ row }) => (
      <Checkbox.Root
        cursor="pointer"
        colorPalette="accentPalette"
        color="white"
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}>
        <Checkbox.HiddenInput />
        <Checkbox.Control />
      </Checkbox.Root>
    ),
    enableSorting: false,
    enableColumnFilter: false,
    size: 30,
  };

  const table = useReactTable({
    data,
    columns: [selectionColumn, ...columns],
    state: {
      globalFilter,
      sorting,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: PAGE_SIZE,
      },
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getRowId: (row) => row.id, // important for selection to work
    enableRowSelection: true,
  });

  return (
    <Stack gap={4}>
      <InputGroup
        startElement={<Search size="14px" />}
        endElement={endElement}
        w="25%"
        colorPalette="brandPalette">
        <Input
          bg="white"
          placeholder="Search..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          size="sm"
          ref={inputRef}
        />
      </InputGroup>
      <Table.Root
        variant="outline"
        tableLayout="fixed"
        {...customTableProps}>
        <Table.Header>
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.Row key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Table.ColumnHeader
                  fontWeight="bold"
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  cursor={header.column.getCanSort() ? 'pointer' : 'default'}
                  w={header.column.getSize()}>
                  <Flex
                    align="center"
                    gap={2}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {{
                      asc: <ArrowUpNarrowWide size="16px" />,
                      desc: <ArrowDownNarrowWide size="16px" />,
                    }[header.column.getIsSorted() as SortDirection] ??
                      (header.column.getCanSort() ? <ArrowDownUp size="16px" /> : null)}
                  </Flex>
                </Table.ColumnHeader>
              ))}
            </Table.Row>
          ))}
        </Table.Header>
        <Table.Body bg="white">
          {data.length === 0 ? (
            <Table.Row>
              <Table.Cell
                py={6}
                colSpan={columns.length + 1}
                textAlign="center"
                justifyItems="center">
                {emptyStateElement}
              </Table.Cell>
            </Table.Row>
          ) : (
            table.getRowModel().rows.map((row) => (
              <Table.Row key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Table.Cell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Table.Cell>
                ))}
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table.Root>
      <Pagination.Root
        w="100%"
        count={data.length}
        pageSize={PAGE_SIZE}
        page={table.getState().pagination.pageIndex + 1}
        display="flex"
        colorPalette="brandPalette"
        justifyContent="flex-end">
        <ButtonGroup
          variant="ghost"
          size="sm"
          wrap="wrap">
          <Pagination.PrevTrigger asChild>
            <IconButton
              aria-label="Previous page"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}>
              <ChevronLeft />
            </IconButton>
          </Pagination.PrevTrigger>

          <Pagination.Items
            render={(page) => (
              <IconButton
                onClick={() => table.setPageIndex(page.value - 1)}
                key={page.value}
                aria-label={`Page ${page.value}`}
                variant={{ base: 'ghost', _selected: 'outline' }}>
                {page.value}
              </IconButton>
            )}
          />

          <Pagination.NextTrigger asChild>
            <IconButton
              aria-label="Next page"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}>
              <ChevronRight />
            </IconButton>
          </Pagination.NextTrigger>
        </ButtonGroup>
      </Pagination.Root>
    </Stack>
  );
};
