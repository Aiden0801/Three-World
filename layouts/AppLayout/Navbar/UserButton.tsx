import { forwardRef } from 'react'
import { Group, UnstyledButton, Avatar, Text } from '@mantine/core'
import { IconChevronRight } from '@tabler/icons'
import { useUserData } from '@/contexts/User'

interface UserButtonProps extends React.ComponentPropsWithoutRef<'button'> {}

/**
 * Navbar user button
 * @dev this is meant to replace the header UserAvatar component, adding
 * a few more features like the color theme switcher to the user menu.
 */
export const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
  ({ ...props }: UserButtonProps, ref) => {
    const user = useUserData()

    return (
      <UnstyledButton
        ref={ref}
        py="xs"
        px="sm"
        sx={(theme) => ({
          display: 'block',
          width: '100%',
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
          <Avatar src={user.image} radius="md" size="md" />
          <div style={{ flex: 1 }}>
            <Text size="sm" weight={500}>
              {user.name}
            </Text>
            <Text color="dimmed" size="xs">
              {user.email}
            </Text>
          </div>
          <IconChevronRight size={16} />
        </Group>
      </UnstyledButton>
    )
  }
)
