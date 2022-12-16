import { Flex, Select, Skeleton, TextInput } from '@mantine/core'
import { useEffect } from 'react'
import { useFormValue, useGlobalConfig, useTemplateSelection } from '../../lib/landing-pages'
import { SchemaViewer } from './SchemaViewer'
import { ConfigForm } from './types'

export function GlobalForm({ showSchema }: ConfigForm) {
  const [config, initial, loading, schema] = useGlobalConfig()
  const { selectedTemplate, onSelectTemplate } = useTemplateSelection()
  const formValue = useFormValue()
  return (
    <div>
      <h2>Global Config</h2>
      <Skeleton visible={loading}>
        <Flex direction={{ xs: 'column', md: 'row' }} gap="sm" py="sm" justify="space-evenly">
          {config?.fields &&
            initial &&
            config.fields.map((field) => {
              if (field.component === 'select') {
                return (
                  <Select
                    withinPortal
                    key={field.key}
                    data={field.data}
                    label={field.label}
                    value={selectedTemplate}
                    onChange={(template) => {
                      onSelectTemplate(template)
                      formValue.setFieldValue(`global.${field.title}`, template)
                    }}
                    placeholder={field.placeholder}
                    sx={{ flex: 1 }}
                  />
                )
              } else {
                return (
                  <TextInput
                    key={field.key}
                    label={field.label}
                    placeholder={field.placeholder}
                    sx={{ flex: 1 }}
                    {...formValue.getInputProps(`global.${field.title}`)}
                  />
                )
              }
            })}
        </Flex>
        {/* <Flex gap="xs">
          <SchemaViewer title="config" schema={config} open={showSchema} />
          <SchemaViewer title="schema" schema={schema} open={showSchema} />
        </Flex> */}
      </Skeleton>
    </div>
  )
}
