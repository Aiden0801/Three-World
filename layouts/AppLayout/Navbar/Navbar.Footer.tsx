import { ActionIcon, Group, Text } from '@mantine/core'
import { NAVIGATION } from '@/config/website'

export function NavbarFooter() {
  return (
    <Group position="apart">
      <Text size="xs" color="dimmed">
        ©2022 Virtual Professionals
      </Text>
      <Group>
        {NAVIGATION.FOOTER.map((item) => (
          <ActionIcon
            key={item.label}
            size="lg"
            component="a"
            href={item.href}
            target={item.target}
            rel="noopener noreferrer"
          >
            <item.icon size={20} stroke={1} />
          </ActionIcon>
        ))}
      </Group>
    </Group>
  )
}
