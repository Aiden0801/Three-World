/**
 * @file MainLayout.context.tsx
 * Utility context to manage the main app layout.
 *
 * This is along the Main Layout components since it's directly related to
 * its functionalities.
 */

import { Burger, BurgerProps, useMantineColorScheme } from '@mantine/core'
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

/**
 * Burger button to toggle the main menu through the context.
 * @dev TODO: move into separate file.
 */
export function ToggleMenuButton(props: Omit<BurgerProps, 'opened'>) {
  const { opened, setOpened } = useMainLayoutContext()
  const { colorScheme } = useMantineColorScheme()
  return (
    <Burger
      size="sm"
      {...props}
      color={colorScheme === 'dark' ? 'white' : 'dark'}
      opened={opened}
      onClick={() => setOpened((p) => !p)}
    />
  )
}
