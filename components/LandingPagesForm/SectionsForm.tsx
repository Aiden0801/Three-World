import { useCallback, useState } from 'react'
import { Button, Divider, Flex, Group, Select, Skeleton, Title, Box, Table, Text, ActionIcon } from '@mantine/core'
import { useFormValue, useSectionsConfig } from '../../lib/landing-pages'
import { SchemaViewer } from './SchemaViewer'
import { ConfigForm } from './types'
import { IconTrash, IconArrowUp, IconArrowDown, IconListDetails } from '@tabler/icons'
import { ParseObject } from '../../lib/landing-pages/parse-object'
import { getInitialValue } from '../../utils/parser/schema_parser'
import { useEffect } from 'react'
import { capitalize } from '../../lib/text-helpers'

import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
type TcurSelection = {
  section_type?: number
  index?: number
}
export function SectionsForm({ showSchema }: ConfigForm) {
  const [config, initial] = useSectionsConfig()

  const formValue = useFormValue()
  const [selected, setSelected] = useState<string>('3')
  const [currentSection, setCurrentSection] = useState<TcurSelection>(undefined)
  const handleAddSection = useCallback(() => {
    formValue.insertListItem('template.sections', {
      ...getInitialValue(config.fields[selected]),
      section_type: selected,
    })
  }, [config.fields, selected])
  const handleRemoveSection = (index) => {
    formValue.removeListItem('template.sections', index)
    if (currentSection && currentSection.index == index) setCurrentSection(undefined)
  }
  const handleReorderSection = (index, newIndex) => {
    formValue.reorderListItem('template.sections', { from: index, to: newIndex })
    if ((currentSection && currentSection.index == index) || currentSection.index == newIndex)
      setCurrentSection({ section_type: currentSection.section_type, index: newIndex + index - currentSection.index })
  }
  const getSectionsName = (): Array<any> => {
    if (config.fields == null || config.fields == undefined) return []
    let result = []
    config.fields.forEach((field, index) => {
      result = [...result, { label: capitalize(field.key), value: `${index}` }]
    })
    console.log('get', result)
    return result
  }
  return (
    <div>
      <h1>Sections Config</h1>
      {config ? (
        <>
          <Box
            sx={{
              position: 'sticky',
              top: '20px',
            }}>
            <Flex align="flex-end" gap="sm" py="sm" justify="space-evenly" direction={{ xs: 'column', md: 'row' }}>
              <Select
                // dropdownPosition="bottom"
                // maxDropdownHeight={80}
                zIndex={2}
                label="Pick a section"
                data={getSectionsName()}
                onChange={(value) => {
                  setSelected(value)
                }}
                sx={{ flex: 1 }}
              />
              <Button onClick={() => handleAddSection()}>Add</Button>
            </Flex>
            <Table
              striped
              withBorder
              highlightOnHover
              style={{
                textAlign: 'left',
              }}>
              <thead>
                <tr>
                  <th style={{ width: '70px' }}>Edit</th>
                  <th>Section Name</th>
                  <th>Action</th>
                  <th style={{ width: '70px' }}>Order</th>
                </tr>
              </thead>
              <tbody>
                {config?.fields &&
                  formValue.values.template.sections.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <ActionIcon
                          variant="subtle"
                          onClick={(e) => {
                            e.preventDefault()
                            setCurrentSection({
                              section_type: item.section_type,
                              index: index,
                            })
                          }}
                          color={currentSection?.index == index ? 'red' : 'blue'}>
                          <IconListDetails />
                        </ActionIcon>
                      </td>
                      <td>
                        <Text align="left" color={currentSection?.index == index ? 'red' : 'blue'}>
                          {config?.fields?.[item.section_type]?.label ?? 'Unknown'}
                        </Text>
                      </td>
                      <td>
                        <ActionIcon variant="subtle" onClick={() => handleRemoveSection(index)} color="red">
                          <IconTrash />
                        </ActionIcon>
                      </td>
                      <td>
                        <Button.Group orientation="vertical">
                          <Button
                            compact
                            variant="subtle"
                            disabled={index > 0 ? false : true}
                            onClick={() => handleReorderSection(index, index - 1)}>
                            <IconArrowUp size={15} />
                          </Button>
                          <Button
                            compact
                            variant="subtle"
                            onClick={() => handleReorderSection(index, index + 1)}
                            disabled={index < formValue.values.template.sections.length - 1 ? false : true}>
                            <IconArrowDown size={15} />
                          </Button>
                        </Button.Group>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Box>
          {config?.fields &&
            currentSection &&
            ParseObject(
              config.fields[currentSection.section_type],
              formValue,
              'template.sections' + `.${currentSection.index}`
            )}
        </>
      ) : (
        <Skeleton visible={true} height={64} />
      )}
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
            <SchemaViewer title={`${detail} config`} schema={config?.sections?.properties?.[detail]} height={900} />
            <SchemaViewer title="schema" schema={schema} />
          </>
        ) : (
          <Title order={4} mb="xl">
            Select a section
          </Title>
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
