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
  /** whether the navbar is currently open (mobile).
   * resets automatically when the layout is resized (both ways)
   */
  opened: boolean
  /** open action for the navbar (mobile) */
  setOpened: Dispatch<SetStateAction<boolean>>
  /** Mantine breakpoint for the layout to be desktop */
  breakpoint: MantineSize
  /** whether we're currently on a mobile width */
  isMobile: boolean
  /** static header height */
  headerHeight: number
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
  /**
   * Height of the header. Used to calculate the height of the
   * main content container, header and navbar mobile offset.
   */
  headerHeight?: number
}>

export function AppLayoutContextProvider({
  children,
  mobileBreakpoint,
  headerHeight = 64,
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
    headerHeight,
    breakpoint: mobileBreakpoint,
    isMobile: breakpointReached,
  }

  return (
    <AppLayoutContext.Provider value={value}>
      {children}
    </AppLayoutContext.Provider>
  )
}
