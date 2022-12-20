import React, { useState } from 'react'
import { UnstyledButton, Avatar, Popover, Button, AvatarProps } from '@mantine/core'
import { IconLogout, IconSettings } from '@tabler/icons'
import { useLogout, useUserData } from '@/contexts/User'

/**
 * Simple user avatar with a popover dropdown for common actions.
 */
export default function UserAvatar(props: Omit<AvatarProps, 'src' | 'alt'>) {
  const user = useUserData()

  return <Avatar radius="md" size={35} {...props} src={user.image} alt="user avatar" />
}
