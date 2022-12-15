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
  useEffect,
  useState,
} from 'react'
import { MantineSize, useMantineTheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'

export interface AppLayoutContextValue {
  opened: boolean
  setOpened: Dispatch<SetStateAction<boolean>>
  breakpoint: MantineSize
  isMobile: boolean
}

export const AppLayoutContext = createContext({} as AppLayoutContextValue)
export const useAppLayoutContext = () => useContext(AppLayoutContext)

export type AppLayoutContextProviderProps = PropsWithChildren<{
  /**
   * defines the breakpoint (max-width) for the layout to toggle
   * between desktop and mobile view.
   * Property is reachable through hooks.
   */
  mobileBreakpoint: MantineSize
}>

export function AppLayoutContextProvider({
  children,
  mobileBreakpoint,
}: AppLayoutContextProviderProps) {
  const [opened, setOpened] = useState(false)
  const { breakpoints } = useMantineTheme()

  const breakpointReached = useMediaQuery(
    `(max-width: ${breakpoints[mobileBreakpoint]}px)`
  )

  // every time we reach the mobile breakpoint from either directions
  // close the menu
  useEffect(() => {
    console.info('breakpointReached', breakpointReached)
    setOpened(false)
  }, [breakpointReached])

  const value: AppLayoutContextValue = {
    opened,
    setOpened,
    breakpoint: mobileBreakpoint,
    isMobile: breakpointReached,
  }

  return (
    <AppLayoutContext.Provider value={value}>
      {children}
    </AppLayoutContext.Provider>
  )
}
