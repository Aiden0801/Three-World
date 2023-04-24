import { Code, Menu, Text, useMantineColorScheme, useMantineTheme } from '@mantine/core'

import {
  IconLogout,
  IconSettings2,
  IconUserCircle,
  TablerIconProps,
} from '@tabler/icons'
import { ColorSchemeIcon } from '@/components/ColorSchemeToggle'
import { ReactNode } from 'react'
import { FloatingPosition } from '@mantine/core/lib/Floating'
import { PopoverWidth } from '@mantine/core/lib/Popover/Popover.types'
import { OrganizationSwitcher, UserProfile, useAuth, useClerk } from '@clerk/nextjs'
import { dark } from '@clerk/themes'

/** commmon icon props, because lazy */
const icon: TablerIconProps = {
  size: 20,
  stroke: 1.25,
}

export interface UserMenuProps {
  /**
   * Single item to use as Target for the menu, i.e. what is shown and used
   * as "button" to open the menu
   */
  children: ReactNode
  /** preferred menu position relative to the menu */
  position?: FloatingPosition
  /** Width of the popover */
  width?: PopoverWidth
  /**
   * Whether to show the arrow
   * @default false
   */
  withArrow?: boolean
}

/**
 * User menu with logout and other functionalities.
 * Wraps UserButton with Mantine Menu.
 * TODO: Add usability improvements like, hotkeys, focus trap, etc.
 * what should happen (for accessibility) is that when the user opens
 * the menu through the keyboard, the focus should be trapped inside
 * the menu, and the user should be able to navigate through the menu
 * using the arrow keys, and close the menu using the escape key.
 */
export function UserMenu({ children, ...rest }: UserMenuProps) {
  const { signOut } = useAuth()
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const theme = useMantineTheme()
  const clerk = useClerk()
  return (
    <Menu
      {...rest}
      styles={(theme) => ({
        dropdown: {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        },
      })}
    >
      <Menu.Target>{children}</Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Settings</Menu.Label>
        <Menu.Item
          icon={<ColorSchemeIcon {...icon} />}
          onClick={() => toggleColorScheme()}
          rightSection={
            // TODO: This should come from a map of the hotkeys
            <Text size="xs" color="dimmed" component={Code} my={0}>
              ⌘ + J
            </Text>
          }
        >
          {colorScheme === 'dark' ? 'Light' : 'Dark'} theme
        </Menu.Item>
        <Menu.Divider />
        <Menu.Label>Account</Menu.Label>
        <Menu.Item
          icon={<IconUserCircle {...icon} />}
          onClick={() =>
            clerk.openUserProfile({
              appearance: {
                baseTheme: colorScheme === 'dark' ? dark : undefined,
                variables: {
                  borderRadius: `${theme.radius.xs}px`,
                  colorBackground: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
                }
              },

            })
          }
        >
          Profile
        </Menu.Item>
        <Menu.Item disabled icon={<IconSettings2 {...icon} />}>
          Settings
        </Menu.Item>
        <Menu.Item
          icon={<IconLogout {...icon} />}
          onClick={() => signOut({})}
          color="red.5"
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
