import { Menu, useMantineColorScheme } from '@mantine/core'

import {
  IconLogout,
  IconSettings,
  IconUserCircle,
  TablerIconProps,
} from '@tabler/icons'
import { ColorSchemeIcon } from '@/components/ColorSchemeToggle'
import { UserButton } from './UserButton'
import { useLogout } from '@/contexts/User'

/** commmon icon props, because lazy */
const icon: TablerIconProps = {
  size: 20,
  stroke: 1.25,
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
export function UserMenu() {
  const logout = useLogout()
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()

  return (
    <Menu
      withArrow
      width="target"
      styles={(theme) => ({
        dropdown: {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        },
      })}
    >
      <Menu.Target>
        <UserButton />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item disabled icon={<IconUserCircle {...icon} />}>
          Profile
        </Menu.Item>
        <Menu.Item disabled icon={<IconSettings {...icon} />}>
          Settings
        </Menu.Item>

        <Menu.Item
          icon={<ColorSchemeIcon {...icon} />}
          onClick={() => toggleColorScheme()}
        >
          {colorScheme === 'dark' ? 'Light' : 'Dark'} theme
        </Menu.Item>

        <Menu.Divider />

        <Menu.Item
          icon={<IconLogout {...icon} />}
          onClick={logout}
          color="red.5"
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
