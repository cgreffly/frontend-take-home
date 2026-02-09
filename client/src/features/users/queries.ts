import { useQuery } from '@tanstack/react-query'
import { getUsers } from '../../lib/api'

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => getUsers(),
  })
}
