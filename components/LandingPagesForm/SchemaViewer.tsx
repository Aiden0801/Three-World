import { Group, Stack, Divider, Title, Button, Collapse, ScrollArea, Text } from "@mantine/core"
import { useState } from "react"

/**
 * Helper component to visualize the Schema while developing
 */
export function SchemaViewer({
  schema,
  open,
  title,
  height = 600,
}: {
  title: string
  schema: any
  open?: boolean
  height?: number
}) {
  const [opened, setOpened] = useState<boolean>(open)

  return (
    <Stack sx={{ flex: 1, maxWidth: '50%' }}>
      <Divider />
      <Group position="apart" mx="xs">
        <Title order={4} transform="uppercase">
          {title}
        </Title>
        <Button onClick={() => setOpened(!opened)}>
          {opened ? 'Hide' : 'Show'}
        </Button>
      </Group>
      <Collapse in={opened}>
        <ScrollArea sx={{ height }}>
          <Text component="pre" size="sm">
            {JSON.stringify(schema, null, 2)}
          </Text>
        </ScrollArea>
      </Collapse>
      <Divider />
    </Stack>
  )
}
