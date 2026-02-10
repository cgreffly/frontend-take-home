type Column<T> = {
  key: string
  header: React.ReactNode
  accessor: keyof T | ((row: T) => React.ReactNode)
}

type TableProps<T> = {
  columns: Column<T>[]
  data: T[]
  getRowId: (row: T) => string
  emptyMessage?: string
  'aria-label'?: string
}

function getCellValue<T>(
  row: T,
  accessor: Column<T>['accessor']
): React.ReactNode {
  if (typeof accessor === 'function') {
    return accessor(row)
  }
  const value = row[accessor]
  return value == null ? null : String(value)
}

export default function Table<T>({
  columns,
  data,
  getRowId,
  emptyMessage = 'No results',
  'aria-label': ariaLabel,
}: TableProps<T>) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200">
      <table className="w-full text-sm text-gray-400" aria-label={ariaLabel}>
        <thead>
          <tr className="text-left font-medium bg-gray-100 border-b border-gray-200">
            {columns.map((col) => (
              <th
                key={col.key ?? col.header}
                scope="col"
                className="px-3 py-3 align-middle"
              >
                {col.header || (
                  <span className="sr-only">Actions</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-3 py-6 text-center"
                role="status"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr
                key={getRowId(row)}
                className="border-b border-gray-200 last:border-b-0"
              >
                {columns.map((col) => (
                  <td
                    key={col.key ?? col.header}
                    className="px-3 py-3 align-middle"
                  >
                    {getCellValue(row, col.accessor)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export type { Column, TableProps }
