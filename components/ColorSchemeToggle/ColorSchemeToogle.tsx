import {
  useMantineColorScheme,
  ActionIcon,
  ActionIconProps,
  MantineTheme,
} from '@mantine/core'
import { ColorSchemeIcon } from './ColorSchemeIcon'

export function ColorSchemeToggle(props: ActionIconProps) {
  const { toggleColorScheme } = useMantineColorScheme()
  const isSubtle = props.variant === 'subtle'
  return (
    <ActionIcon
      onClick={() => toggleColorScheme()}
      size="lg"
      sx={(theme) => ({
        backgroundColor: isSubtle ? undefined : backgroundColor(theme),
        color: iconColor(theme),
      })}
      {...props}
    >
      <ColorSchemeIcon />
    </ActionIcon>
  )
}

function backgroundColor({ colorScheme, colors }: MantineTheme) {
  return colorScheme === 'dark' ? colors.dark[6] : colors.gray[2]
}

function iconColor({ colorScheme, colors }: MantineTheme) {
  return colorScheme === 'dark' ? colors.yellow[4] : colors.blue[6]
}
