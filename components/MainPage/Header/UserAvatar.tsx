import React, { useState } from 'react'
import { UnstyledButton, Avatar, Popover, Button } from '@mantine/core'
import { IconLogout, IconSettings } from '@tabler/icons'
import { useLogout } from '../../UserContext'
import { useUserData } from '../../UserContext'

/**
 * Simple user avatar with a popover dropdown for common actions.
 */
export default function UserAvatar() {
  const logout = useLogout()
  const [opened, setOpened] = useState(false)
  const user = useUserData()

  return (
    <Popover opened={opened} onChange={setOpened}>
      <Popover.Target>
        <UnstyledButton onClick={() => setOpened((o) => !o)}>
          <Avatar radius="xl" size={35} src={user.image} alt="img" />
        </UnstyledButton>
      </Popover.Target>
      <Popover.Dropdown>
        <Button
          fullWidth
          my="sm"
          variant="outline"
          leftIcon={<IconSettings stroke={1.5} />}
        >
          Settings
        </Button>
        <Button
          fullWidth
          variant="outline"
          leftIcon={<IconLogout stroke={1.5} />}
          onClick={logout}
        >
          Logout
        </Button>
      </Popover.Dropdown>
    </Popover>
  )
}
