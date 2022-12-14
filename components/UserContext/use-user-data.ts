import { useUserContext } from "./UserContext";

export function useUserData() {
  const { session } = useUserContext()
  return session.data?.user ?? {}
}
