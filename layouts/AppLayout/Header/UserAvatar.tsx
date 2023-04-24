import React from 'react'
import {Avatar, type AvatarProps } from '@mantine/core'
// import { useLogout, useUserData } from '@/contexts/User'
import { useUser } from '@clerk/nextjs'

/**
 * Simple user avatar with a popover dropdown for common actions.
 */
export default function UserAvatar(props: Omit<AvatarProps, 'src' | 'alt'>) {
  // const user = useUserData()
  // return <Avatar radius="md" size={35} {...props} src={user.image} alt="user avatar" />
  const { user } = useUser()
  return <Avatar radius="md" size={35} {...props} src={user.profileImageUrl} alt="user avatar" />
}
