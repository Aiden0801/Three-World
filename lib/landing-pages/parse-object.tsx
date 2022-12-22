import {
  Box,
  Button,
  Checkbox,
  ColorSwatch,
  Group,
  Select,
  Text,
  TextInput,
  useMantineTheme,
  Collapse,
} from '@mantine/core'
import { IconTrash } from '@tabler/icons'
import { forwardRef } from 'react'
import type { IPropsschemaObject } from '../../utils/parser/schema_parser'
import { getInitialValue } from '../../utils/parser/schema_parser'
import { capitalize } from '../text-helpers'
import { useState } from 'react'
interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  color?: string
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(({ color, ...others }: ItemProps, ref) => {
  const theme = useMantineTheme()
  return (
    <div ref={ref} {...others}>
      <Group noWrap>
        <ColorSwatch color={theme.colors[`${color}`][6]} />

        <Text size="sm">{color}</Text>
      </Group>
    </div>
  )
})
SelectItem.displayName = 'SelectItem'

const formObject = (form, dataposition) => {
  let current = form.values
  dataposition.split('.').forEach((value, index) => {
    current = current[`${value}`]
  })
  return current
}
const colorComponent = (object: IPropsschemaObject, form, dataposition?: string) => {
  return (
    <Select
      withinPortal
      data={[
        { color: 'blue', value: 'blue', label: 'Blue' },
        { color: 'cyan', value: 'cyan', label: 'Cyan' },
        { color: 'dark', value: 'dark', label: 'Dark' },
        { color: 'grape', value: 'grape', label: 'Grape' },
        { color: 'gray', value: 'gray', label: 'Gray' },
        { color: 'green', value: 'green', label: 'Green' },
        { color: 'indigo', value: 'indigo', label: 'Indigo' },
        { color: 'lime', value: 'lime', label: 'Lime' },
        { color: 'orange', value: 'orange', label: 'Orange' },
        { color: 'pink', value: 'pink', label: 'Pink' },
        { color: 'red', value: 'red', label: 'Red' },
        { color: 'teal', value: 'teal', label: 'Teal' },
        { color: 'violet', value: 'violet', label: 'Violet' },
        { color: 'yellow', value: 'yellow', label: 'Yellow' },
      ]}
      itemComponent={SelectItem}
      {...form.getInputProps(dataposition)}
    />
  )
}
const selectComponent = (object: IPropsschemaObject, form, dataposition?: string) => {
  return (
    <>
      <Text>{capitalize(object.title)}</Text>
      <Select
        withinPortal
        // label={object.title}
        data={object.data}
        {...form.getInputProps(dataposition)}
      />
    </>
  )
}
const checkBoxComponent = (object: IPropsschemaObject, form, dataposition?: string) => {
  return <Checkbox label={object.title} {...form.getInputProps(dataposition)} />
}
const inputComponent = (object: IPropsschemaObject, form, dataposition?: string) => {
  if (object['component'] == 'select')
    return (
      <>
        <Text>{capitalize(object.title)}</Text>
        <Select withinPortal data={object.data} {...form.getInputProps(dataposition)} />
      </>
    )
  return (
    <>
      <Text>{capitalize(object.title)}</Text>
      <TextInput required={object.isRequired} placeholder={object.description} {...form.getInputProps(dataposition)} />
    </>
  )
}
const arrayComponent = (object: IPropsschemaObject, form, dataposition?: string) => {
  return (
    <>
      {formObject(form, dataposition).map((item, index) => (
        <Box key={index}>
          {ParseObject(object.items, form, dataposition + `.${index}`)}
          <Button
            compact
            variant="outline"
            onClick={() => {
              form.removeListItem(`${dataposition}`, index)
            }}>
            <IconTrash color="red" />
          </Button>
        </Box>
      ))}
      <Button
        onClick={() => {
          const temp = getInitialValue(object.items)
          form.insertListItem(dataposition, temp)
        }}>{`New ${object.title}`}</Button>
    </>
  )
}
const groupComponent = (object: IPropsschemaObject, form, dataposition?: string) => {
  return (
    <>
      <Text>{capitalize(object.title)}</Text>
      {object.fields.map((item, index) => {
        return (
          <Box key={index}>
            {ParseObject(
              item,
              form,
              dataposition == '' ? dataposition + `${item.title}` : dataposition + `.${item.title}`
            )}
          </Box>
        )
      })}
    </>
  )
}
export const ParseObject = (object: IPropsschemaObject, form, dataposition?: string) => {
  const getLevel = () => {
    return dataposition.split('.').length - 1
  }
  const Parse = () => {
    // form.setFieldvalue(dataposition + object.title, {})
    switch (object.type) {
      case 'color':
        return colorComponent(object, form, dataposition)
      case 'select':
        return selectComponent(object, form, dataposition)
      case 'boolean':
        return checkBoxComponent(object, form, dataposition)
      case 'string':
      case 'number':
        return inputComponent(object, form, dataposition)
      case 'array':
        return arrayComponent(object, form, dataposition)
      case 'group':
        return groupComponent(object, form, dataposition)
      default:
        return <Text>Loading</Text>
    }
    return <Text>ParseA</Text>
  }
  // const [opened, setOpened] = useState(true)
  return (
    <>
      <Box
        style={{
          marginLeft: `${getLevel() * 5}px`,
          marginBottom: `${getLevel() * 2}px`,
          fontSize: `${30 - getLevel() * 3}px`,
          color: '#1C7ED6',
        }}>
        {/* <Collapse in={opened} transitionDuration={1000} transitionTimingFunction="linear"> */}
        {Parse()}
        {/* </Collapse> */}
        {/* <Button onClick={() => setOpened((o) => !o)}> Coll</Button> */}
      </Box>
    </>
  )
}
