import { PropsWithChildren, useCallback } from 'react'
import {
  ColorSchemeProvider,
  MantineProvider,
  ColorScheme,
} from '@mantine/core'
import { useLocalStorage, useHotkeys } from '@mantine/hooks'
import { ModalsProvider } from '@mantine/modals'
import { NotificationsProvider } from '@mantine/notifications'

/**
 * Global contexts provider for all used high level mantine contexts.
 * This allows centralization of just these contexts to better understand
 * what we have running.
 *
 * primary role of this component is to provide all the mantine contexts
 * as well as the global functionalities like hotkeys and local storage.
 */
export function MantineContexts({ children }: PropsWithChildren) {
  const [colorScheme, toggleColorScheme] = useThemeLocalStorage()

  useHotkeys([
    ['mod+J', () => toggleColorScheme()],
    // @dev spotlight is not active yet, but we'll add it later.
    // ['mod+P', () => toggleSpotlight()],
  ])

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ loader: 'bars', colorScheme }}
      >
        <NotificationsProvider>
          <ModalsProvider>
            {/* <RouterTransition /> */}
            {children}
          </ModalsProvider>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

/**
 * Wrapper for mantine hooks color scheme management.
 * Uses local storage to persist color scheme and adds hotkey to toggle it.
 * @returns [ColorScheme, (value?: ColorScheme) => void]
 */
function useThemeLocalStorage(): [ColorScheme, (value?: ColorScheme) => void] {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'dark',
    getInitialValueInEffect: true,
  })
  const toggleColorScheme = useCallback(
    (value?: ColorScheme) =>
      setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark')),
    [colorScheme, setColorScheme]
  )

  return [colorScheme, toggleColorScheme]
}
