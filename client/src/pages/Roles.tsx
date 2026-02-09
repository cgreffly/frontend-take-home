import { useState } from 'react'
import Search from '../components/Search'
import Table, { type Column } from '../components/Table'
import { useRoles } from '../features/roles/queries'
import { formatDate } from '../lib/formatDate'
import { useDebouncedValue } from '../lib/useDebouncedValue'
import type { Role } from '../types/role'
import { Loader2 } from 'lucide-react'

export default function Roles() {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  // Debounce the search input to prevent excessive API calls
  const debouncedSearch = useDebouncedValue(search, 250)

  const handleSearchChange = (value: string) => {
    setSearch(value)
    setPage(1)
  }

  const {
    data: roleData,
    isLoading,
    isFetching,
    error,
  } = useRoles({ page, search: debouncedSearch || undefined })

  const columns: Column<Role>[] = [
    { key: 'name', header: 'Name', accessor: 'name' },
    { key: 'description', header: 'Description', accessor: 'description' },
    {
      key: 'lastUpdated',
      header: 'Last Updated',
      accessor: (role: Role) => formatDate(role.updatedAt),
    },
  ]

  const getRowId = (role: Role) => role.id

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-20 h-20 animate-spin text-brand-purple" />
      </div>
    )
  if (error) return <div className="pt-6">Error: {error.message}</div>

  return (
    <div className="pt-6">
      <Search
        value={search}
        onChange={handleSearchChange}
        placeholder="Search by role..."
      />
      <div className="relative">
        {isFetching && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10">
            <Loader2 className="h-15 w-15 animate-spin text-brand-purple" />
          </div>
        )}
        <Table
          columns={columns}
          data={roleData?.data ?? []}
          getRowId={getRowId}
          emptyMessage="No roles found"
        />
      </div>
    </div>
  )
}
