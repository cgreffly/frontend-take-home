import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { getUsers } from '../../lib/api'

export const useUsers = (params?: { page?: number; search?: string }) => {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => getUsers(params),
    placeholderData: keepPreviousData,
  })
}
