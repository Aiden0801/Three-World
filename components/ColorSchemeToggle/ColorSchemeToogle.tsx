import { useMantineColorScheme, ActionIcon, ActionIconProps } from '@mantine/core'
import { ColorSchemeIcon } from './ColorSchemeIcon'

export function ColorSchemeToggle(props: ActionIconProps) {
  const { toggleColorScheme } = useMantineColorScheme()
  return (
    <ActionIcon
      onClick={() => toggleColorScheme()}
      size="lg"
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[6]
            : theme.colors.gray[2],
        color:
          theme.colorScheme === 'dark'
            ? theme.colors.yellow[4]
            : theme.colors.blue[6],
      })}
      {...props}
    >
      <ColorSchemeIcon/>
    </ActionIcon>
  )
}
