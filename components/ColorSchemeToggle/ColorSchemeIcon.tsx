import { useMantineColorScheme } from "@mantine/core"
import { IconMoonStars, IconSun, TablerIconProps } from "@tabler/icons"

export function ColorSchemeIcon(props: TablerIconProps) {
  const { colorScheme } = useMantineColorScheme()
  return colorScheme === 'dark' ? (
    <IconSun size={18} {...props} />
  ) : (
    <IconMoonStars size={18} {...props} />
  )
}
