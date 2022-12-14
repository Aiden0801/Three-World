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

export interface MainLayoutContextValue {
  opened: boolean
  setOpened: Dispatch<SetStateAction<boolean>>
}

export const MainLayoutContext = createContext<MainLayoutContextValue>(
  {} as MainLayoutContextValue
)

export function useMainLayoutContext() {
  return useContext(MainLayoutContext)
}

export function MainLayoutContextProvider({ children }: PropsWithChildren) {
  const [opened, setOpened] = useState(false)

  return (
    <MainLayoutContext.Provider value={{ opened, setOpened }}>
      {children}
    </MainLayoutContext.Provider>
  )
}
