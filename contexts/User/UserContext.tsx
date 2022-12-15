import { useSession } from "next-auth/react";
import { createContext, useContext } from "react";

export interface UserContext {
  session: ReturnType<typeof useSession>
}

const UserContext = createContext<UserContext>({} as UserContext)

export function useUserContext() {
  return useContext(UserContext)
}

/**
 * Context provider for the logged user.
 * This needs to be used in routes that require authentication, so we can
 * safely access the user data and functionalities.
 */
export function UserContextProvider({ children }: { children: React.ReactNode }) {
  const session = useSession()

  return (
    <UserContext.Provider value={{ session }}>
      {children}
    </UserContext.Provider>
  )
}

// TODO: Add all user functionalities and data in here.
