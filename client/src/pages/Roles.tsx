import { useState } from 'react'
import Search from '../components/Search'
import Table, { type Column } from '../components/Table'
import { useRenameRole, useRoles } from '../features/roles/queries'
import { formatDate } from '../lib/formatDate'
import { useDebouncedValue } from '../lib/useDebouncedValue'
import type { Role } from '../types/role'
import { Loader2 } from 'lucide-react'
import ActionsMenu from '../components/ActionsMenu'
import RenameRoleModal from '../components/RenameRoleModal'
import ErrorState from '../components/ErrorState'

export default function Roles() {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  // Debounce the search input to prevent excessive API calls
  const debouncedSearch = useDebouncedValue(search, 250)
  const [roleToEdit, setRoleToEdit] = useState<Role | null>(null)
  const { mutate: renameRole, isPending: isRenaming } = useRenameRole()

  const handleSearchChange = (value: string) => {
    setSearch(value)
    setPage(1)
  }

  const {
    data: roleData,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useRoles({ page, search: debouncedSearch || undefined })

  const columns: Column<Role>[] = [
    { key: 'name', header: 'Role', accessor: 'name' },
    { key: 'description', header: 'Description', accessor: 'description' },
    {
      key: 'lastUpdated',
      header: 'Last Updated',
      accessor: (role: Role) => formatDate(role.updatedAt),
    },
    {
      key: 'actions',
      header: '',
      accessor: (role: Role) => (
        <div className="flex items-center justify-end min-w-[50px]">
          <ActionsMenu
            label="Role actions"
            items={[
              {
                label: 'Rename role',
                onSelect: () => setRoleToEdit(role),
              },
            ]}
          />
        </div>
      ),
    },
  ]

  const getRowId = (role: Role) => role.id

  if (isLoading)
    return (
      <div
        className="flex items-center justify-center min-h-[50vh]"
        role="status"
        aria-label="Loading roles"
      >
        <Loader2
          className="w-20 h-20 animate-spin text-brand-purple"
          aria-hidden="true"
        />
        <span className="sr-only">Loading roles</span>
      </div>
    )
  if (error) return <ErrorState onRetry={() => refetch()} />

  return (
    <div className="mt-6">
      <Search
        value={search}
        onChange={handleSearchChange}
        placeholder="Search by role..."
        addButtonLabel="Role"
      />
      <div className="relative mt-6">
        {isFetching && (
          <div
            className="absolute inset-0 flex items-center justify-center bg-white/70 z-10"
            role="status"
            aria-label="Refreshing roles"
          >
            <Loader2
              className="h-15 w-15 animate-spin text-brand-purple"
              aria-hidden="true"
            />
            <span className="sr-only">Refreshing roles</span>
          </div>
        )}
        {roleData?.data && roleData.data.length > 0 ? (
          <Table
            columns={columns}
            data={roleData?.data ?? []}
            getRowId={getRowId}
            emptyMessage="No roles found"
            aria-label="Roles"
          />
        ) : (
          <div className="px-3 py-6 text-center" role="status">
            No roles found
          </div>
        )}
      </div>

      <RenameRoleModal
        open={roleToEdit !== null}
        onOpenChange={(open) => {
          if (!open) setRoleToEdit(null)
        }}
        currentName={roleToEdit?.name ?? ''}
        isPending={isRenaming}
        onConfirm={(newName) =>
          renameRole(
            { id: roleToEdit?.id ?? '', name: newName },
            { onSuccess: () => setRoleToEdit(null) }
          )
        }
      />
    </div>
  )
}
