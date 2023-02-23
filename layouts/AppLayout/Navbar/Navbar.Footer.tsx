import { ActionIcon, Group, Stack, Text } from '@mantine/core'
import { NAVIGATION } from '@/config/website'
import { PwaInstallButton } from '@/components/PwaInstall'

export function NavbarFooter() {
  return (
    <Stack>
      <PwaInstallButton fullWidth uppercase size="sm" variant="white">
        Install App
      </PwaInstallButton>

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
    </Stack>
  )
}
