import type { User } from '../types'
import Table, { type Column } from '../components/ui/Table'
import Avatar from '../components/ui/Avatar'
import { useDeleteUser, useUsers } from '../features/users/queries'
import { useRoles } from '../features/roles/queries'
import { useMemo, useState } from 'react'
import { formatDate } from '../lib/formatDate'
import Search from '../components/ui/Search'
import { useDebouncedValue } from '../lib/useDebouncedValue'
import { Loader2 } from 'lucide-react'
import ActionsMenu from '../components/ui/ActionsMenu'
import DeleteUserModal from '../features/users/DeleteUserModal'
import ErrorState from '../components/ui/ErrorState'

export default function Users() {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [userToDelete, setUserToDelete] = useState<User | null>(null)
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
    refetch,
  } = useUsers({ page, search: debouncedSearch || undefined })
  const { data: roleData } = useRoles()

  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser()

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
    {
      key: 'actions',
      header: '',
      width: '60px',
      accessor: (user: User) => (
        <div className="flex items-center justify-end">
          <ActionsMenu
            label="User actions"
            items={[
              {
                // not wired up yet, but wanted to include this to match the design
                label: 'Edit user',
                onSelect: () => console.log('Edit user', user.id),
              },
              {
                label: 'Delete user',
                onSelect: () => setUserToDelete(user),
              },
            ]}
          />
        </div>
      ),
    },
  ]
  const getRowId = (user: User) => user.id

  if (isLoading)
    return (
      <div
        className="flex items-center justify-center min-h-[50vh]"
        role="status"
        aria-label="Loading users"
      >
        <Loader2
          className="w-20 h-20 animate-spin text-brand-purple"
          aria-hidden="true"
        />
        <span className="sr-only">Loading users</span>
      </div>
    )
  if (error) return <ErrorState onRetry={() => refetch()} />

  return (
    <div className="mt-6">
      <Search
        value={search}
        onChange={handleSearchChange}
        addButtonLabel="User"
      />
      <div className="relative mt-6">
        <div
          className={`absolute inset-0 flex items-center justify-center bg-white/70 z-10 transition-opacity duration-300 ${isFetching ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          role="status"
          aria-label="Refreshing users"
        >
          <Loader2
            className="h-15 w-15 animate-spin text-brand-purple"
            aria-hidden="true"
          />
          <span className="sr-only">Refreshing users</span>
        </div>
        {userData?.data && userData.data.length > 0 ? (
          <Table
            columns={columns}
            data={userData?.data ?? []}
            getRowId={getRowId}
            emptyMessage="No users found"
            aria-label="Users"
            hasPrevPage={userData?.prev !== null}
            hasNextPage={userData?.next !== null}
            onPrevPage={() => setPage((p) => Math.max(1, p - 1))}
            onNextPage={() => setPage((p) => p + 1)}
          />
        ) : (
          <div className="px-3 py-6 text-center" role="status">
            No users found
          </div>
        )}
      </div>

      <DeleteUserModal
        open={userToDelete !== null}
        onOpenChange={(open) => {
          if (!open) setUserToDelete(null)
        }}
        userName={
          userToDelete ? `${userToDelete.first} ${userToDelete.last}` : ''
        }
        isPending={isDeleting}
        onConfirm={() =>
          deleteUser(userToDelete?.id ?? '', {
            onSuccess: () => {
              setUserToDelete(null)
              if (userData?.data.length === 1 && page > 1) {
                setPage(1)
              }
            },
          })
        }
      />
    </div>
  )
}
