import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { getRoles } from '../../lib/api'

export const useRoles = (params?: { page?: number; search?: string }) => {
  return useQuery({
    queryKey: ['roles', params],
    queryFn: () => getRoles(params),
    placeholderData: keepPreviousData,
  })
}
