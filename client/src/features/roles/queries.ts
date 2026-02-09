import { useQuery } from '@tanstack/react-query'
import { getRoles } from '../../lib/api'

export const useRoles = () => {
  return useQuery({
    queryKey: ['roles'],
    queryFn: () => getRoles(),
  })
}
