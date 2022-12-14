import { Code, Text, TextInput, TextInputProps } from '@mantine/core'
import { IconSearch } from '@tabler/icons'

export function SearchBox(props: TextInputProps) {
  const rightSection = (
    <Text size="xs" component={Code}>
      Ctrl + K
    </Text>
  )
  /**
   * If we want to use hotkeys, we need to configure it and make it so
   * the input is focused when the hotkey is pressed.
   * This would also require to have a single input for search, not two
   */
  return (
    <TextInput
      placeholder="Search"
      {...props}
      icon={<IconSearch size={12} stroke={1.5} />}
      rightSectionWidth={70}
      rightSection={rightSection}
      styles={{ rightSection: { pointerEvents: 'none' } }}
    />
  )
}
