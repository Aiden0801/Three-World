import { ActionIcon, Group, Text } from '@mantine/core'
import { navFooterLinks } from '../../../config/navbar.items'

export function NavbarFooter() {
  return (
    <Group position="apart">
      <Text size="xs" color="dimmed">
        ©2022 HackerHouse HQ
      </Text>
      <Group>
        {navFooterLinks.map((item) => (
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
