import { useMainLayoutContext } from "@/contexts/MainLayout"
import { BurgerProps, useMantineColorScheme, Burger } from "@mantine/core"

/**
 * Burger button to toggle the main menu through the context.
 * @dev TODO: move into separate file.
 */
export function ToggleMenuButton(props: Omit<BurgerProps, 'opened'>) {
  const { opened, setOpened } = useMainLayoutContext()
  const { colorScheme } = useMantineColorScheme()
  return (
    <Burger
      size="sm"
      {...props}
      color={colorScheme === 'dark' ? 'white' : 'dark'}
      opened={opened}
      onClick={() => setOpened((p) => !p)}
    />
  )
}
