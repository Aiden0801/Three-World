/**
 * @file MainLayout.context.tsx
 * Utility context to manage the main app layout.
 *
 * This is along the Main Layout components since it's directly related to
 * its functionalities.
 */

import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from 'react'

export interface AppLayoutContextValue {
  opened: boolean
  setOpened: Dispatch<SetStateAction<boolean>>
}

export const AppLayoutContext = createContext<AppLayoutContextValue>(
  {} as AppLayoutContextValue
)

export function useAppLayoutContext() {
  return useContext(AppLayoutContext)
}

export function AppLayoutContextProvider({ children }: PropsWithChildren) {
  const [opened, setOpened] = useState(false)

  return (
    <AppLayoutContext.Provider value={{ opened, setOpened }}>
      {children}
    </AppLayoutContext.Provider>
  )
}
