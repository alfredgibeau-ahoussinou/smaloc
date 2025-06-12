import React from 'react';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  sortColumn?: string;
  sortDirection?: 'asc' | 'desc';
  onSort?: (column: string) => void;
  isLoading?: boolean;
  emptyMessage?: string;
}

export default function Table<T>({
  columns,
  data,
  sortColumn,
  sortDirection,
  onSort,
  isLoading = false,
  emptyMessage = 'Aucune donnée disponible',
}: TableProps<T>) {
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {columns.map((column) => (
                    <th
                      key={column.key}
                      scope="col"
                      className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                        column.sortable ? 'cursor-pointer hover:text-gray-700' : ''
                      }`}
                      onClick={() => column.sortable && onSort?.(column.key)}
                    >
                      <div className="flex items-center space-x-1">
                        <span>{column.header}</span>
                        {column.sortable && sortColumn === column.key && (
                          <span className="inline-block">
                            {sortDirection === 'asc' ? (
                              <ChevronUpIcon className="h-4 w-4" />
                            ) : (
                              <ChevronDownIcon className="h-4 w-4" />
                            )}
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {isLoading ? (
                  <tr>
                    <td
                      colSpan={columns.length}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center"
                    >
                      Chargement...
                    </td>
                  </tr>
                ) : data.length === 0 ? (
                  <tr>
                    <td
                      colSpan={columns.length}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center"
                    >
                      {emptyMessage}
                    </td>
                  </tr>
                ) : (
                  data.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      {columns.map((column) => (
                        <td
                          key={column.key}
                          className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                        >
                          {column.render
                            ? column.render(item)
                            : (item as any)[column.key]}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 