import { VpgLogo } from '@/components/VpgLogo'
import {
  Box,
  Group,
  Image,
  MediaQuery,
  Text,
  Title,
  TitleProps,
  useMantineTheme,
} from '@mantine/core'

export function TextLogo(props: Omit<TitleProps, 'order'>) {
  const theme = useMantineTheme()
  return (
    <Title {...props} order={2}>
      <Group>
        <VpgLogo height={48} />
        <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
          <Text component="span">
            Virtual
            <Text
              span
              size="xl"
              color={theme.colors[theme.primaryColor][4]}
              inherit
            >
              Cockpit
            </Text>
          </Text>
        </MediaQuery>
      </Group>
    </Title>
  )
}
