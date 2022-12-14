import { useState } from "react"
import { Divider, Flex, Group, Select, Skeleton, Title } from "@mantine/core"
import { useSectionsConfig } from "../../lib/landing-pages"
import { SchemaViewer } from "./SchemaViewer"
import { ConfigForm } from "./types"

export function SectionsForm({
  showSchema,
}: ConfigForm) {
  const [config, initial, loading, schema] = useSectionsConfig()
  const [selected, setSelected] = useState<string>('')

  return (
    <div>
      <h1>Sections Config</h1>
      {config ? (
        <Group grow>
          <Select
            dropdownPosition="bottom"
            maxDropdownHeight={180}
            label="pick a section"
            data={Object.keys(config?.sections?.fields ?? {})}
            onChange={(value) => setSelected(value)}
          />
        </Group>
      ) : (
        <Skeleton visible={loading} height={64} />
      )}

      <Skeleton visible={loading || !config}>
        <SchemaViewer title={`Sections`} schema={config} open={showSchema} />

        {/* <Group grow>
          {Object.values(config?.sections?.fields ?? {}).map((value) => (
            <Title order={4}>{(value as any).title}</Title>
          ))}
        </Group>

        <SectionsSchemas config={config} detail={selected} schema={schema} /> */}
      </Skeleton>
    </div>
  )
}

function SectionsSchemas({
  config,
  detail,
  schema,
  showSchema,
}: {
  detail: string
  config: any
  schema: any
  showSchema?: boolean
}) {
  return (
    <>
      <Flex gap="xs">
        {detail ? (
          <>
            <SchemaViewer
              title={`${detail} config`}
              schema={config?.sections?.properties?.[detail]}
              height={900}
            />
            <SchemaViewer title="schema" schema={schema} />
          </>
        ) : (
          <Title order={4} mb="xl">Select a section</Title>
        )}
      </Flex>
      <Divider />
      <Flex gap="xs">
        <SchemaViewer title={`config`} schema={config} open={showSchema} />
        <SchemaViewer title="schema" schema={schema} open={showSchema} />
      </Flex>
    </>
  )
}
