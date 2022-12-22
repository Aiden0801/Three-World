import { useUserContext } from './UserContext'

export function useUserData() {
  const { session } = useUserContext()
  return session.data?.user ?? { email: '', image: '', name: '', address: '' }
}
