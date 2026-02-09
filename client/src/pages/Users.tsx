import type { User } from '../types'
import Table, { type Column } from '../components/Table'
import { useUsers } from '../features/users/queries'
import { useRoles } from '../features/roles/queries'
import { useMemo } from 'react'

export default function Users() {
  const { data: userData, isLoading, error } = useUsers()
  const { data: roleData } = useRoles()

  const getRoleName = useMemo(() => {
    return (roleId: string) => {
      const role = roleData?.data?.find((role) => role.id === roleId)
      return role?.name
    }
  }, [roleData])

  const columns: Column<User>[] = [
    { key: 'first', header: 'User', accessor: 'first' },
    {
      key: 'roleId',
      header: 'Role',
      accessor: (user: User) => getRoleName(user.roleId),
    },
    { key: 'createdAt', header: 'Joined', accessor: 'createdAt' },
  ]

  const getRowId = (user: User) => user.id

  // TODO: Add better loading and error states
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div className="p-6">
      <Table
        columns={columns}
        data={userData?.data ?? []}
        getRowId={getRowId}
        emptyMessage="No users found"
      />
    </div>
  )
}
