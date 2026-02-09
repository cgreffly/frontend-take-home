import Table, { type Column } from '../components/Table'
import { useRoles } from '../features/roles/queries'
import type { Role } from '../types/role'

export default function Roles() {
  const { data: roleData, isLoading, error } = useRoles()

  const columns: Column<Role>[] = [
    { key: 'name', header: 'Name', accessor: 'name' },
    { key: 'description', header: 'Description', accessor: 'description' },
    { key: 'lastUpdated', header: 'Last Updated', accessor: 'updatedAt' },
  ]

  const getRowId = (role: Role) => role.id

  // TODO: Add better loading and error states
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div className="p-6">
      <Table
        columns={columns}
        data={roleData?.data ?? []}
        getRowId={getRowId}
        emptyMessage="No roles found"
      />
    </div>
  )
}
