import {
  useQuery,
  keepPreviousData,
  useQueryClient,
  useMutation,
} from '@tanstack/react-query'
import { ApiError, getRoles, renameRole } from '../../lib/api'
import { toast } from 'sonner'

export const useRoles = (params?: { page?: number; search?: string }) => {
  return useQuery({
    queryKey: ['roles', params],
    queryFn: () => getRoles(params),
    placeholderData: keepPreviousData,
  })
}

export function useRenameRole() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) =>
      renameRole(id, name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] })
      toast.success('Role renamed successfully')
    },
    onError: (error) => {
      if (error instanceof ApiError && error.status === 400) {
        toast.error(error.message)
      } else {
        toast.error('Failed to rename role. Please try again.')
      }
    },
  })
}
