import React, { forwardRef } from 'react'
import { Group, UnstyledButton, Avatar, Text, UnstyledButtonProps, useMantineColorScheme } from '@mantine/core'
import { IconChevronRight } from '@tabler/icons'

import { UserButton as ClerkUserButton, useUser } from '@clerk/nextjs'
import { dark } from '@clerk/themes'

interface UserButtonProps extends React.ComponentPropsWithoutRef<'button'>, UnstyledButtonProps {}

// export const UserButton = React.cloneElement(UserButton, {
//   appearance: {
//     theme: dark
//   }
// })

/**
 * Navbar user button
 * @dev this is meant to replace the header UserAvatar component, adding
 * a few more features like the color theme switcher to the user menu.
 */
export const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
  ({ ...props }: UserButtonProps, ref) => {
    const { user } = useUser()
    const { colorScheme } = useMantineColorScheme()
    // console.info(user)
    // return <ClerkUserButton {...props} appearance={{
    //   baseTheme: colorScheme === 'dark' ? dark : undefined
    // }} />

    return (
      <UnstyledButton
        ref={ref}
        p="xs"
        sx={(theme) => ({
          display: 'block',
          width: `100%`,
          borderRadius: theme.radius.sm,
          // padding: theme.spacing.xs,
          color:
            theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
          '&:hover': {
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[5]
                : theme.colors.gray[1],
          },
        })}
        {...props}
      >
        <Group>
          <Avatar src={user.profileImageUrl} radius="md" size="md" />
          <div style={{ flex: 1 }}>
            <Text size="sm" weight={500}>
              {user.username}
            </Text>
            <Text color="dimmed" size="xs">
              {user.primaryEmailAddress.toString()}
            </Text>
          </div>
          <IconChevronRight size={16} />
        </Group>
      </UnstyledButton>
    )
  }
)
