import type { User } from '../types'
import Table, { type Column } from '../components/Table'
import Avatar from '../components/Avatar'
import { useUsers } from '../features/users/queries'
import { useRoles } from '../features/roles/queries'
import { useMemo, useState } from 'react'
import { formatDate } from '../lib/formatDate'
import Search from '../components/Search'
import { useDebouncedValue } from '../lib/useDebouncedValue'
import { Loader2 } from 'lucide-react'

export default function Users() {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  // Debounce the search input to prevent excessive API calls
  const debouncedSearch = useDebouncedValue(search, 250)

  const handleSearchChange = (value: string) => {
    setSearch(value)
    setPage(1)
  }

  const {
    data: userData,
    isLoading,
    isFetching,
    error,
  } = useUsers({ page, search: debouncedSearch || undefined })
  const { data: roleData } = useRoles()

  const getRoleName = useMemo(() => {
    return (roleId: string) => {
      const role = roleData?.data?.find((role) => role.id === roleId)
      return role?.name
    }
  }, [roleData])

  const columns: Column<User>[] = [
    {
      key: 'firstLastName',
      header: 'User',
      accessor: (user: User) => (
        <div className="flex items-center gap-2">
          <Avatar src={user.photo} alt={`${user.first} ${user.last}`} />
          <span>
            {user.first} {user.last}
          </span>
        </div>
      ),
    },
    {
      key: 'roleId',
      header: 'Role',
      accessor: (user: User) => getRoleName(user.roleId),
    },
    {
      key: 'createdAt',
      header: 'Joined',
      accessor: (user: User) => formatDate(user.createdAt),
    },
  ]

  const getRowId = (user: User) => user.id

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
        placeholder="Search by name..."
      />
      <div className="relative">
        {isFetching && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10">
            <Loader2 className="h-15 w-15 animate-spin text-brand-purple" />
          </div>
        )}
        <Table
          columns={columns}
          data={userData?.data ?? []}
          getRowId={getRowId}
          emptyMessage="No users found"
        />
      </div>
    </div>
  )
}
