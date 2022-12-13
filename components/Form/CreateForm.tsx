import {
   Box,
   Button,
   Checkbox,
   Code,
   ColorPicker,
   ColorSwatch,
   Select,
   Text,
   TextInput,
   Group,
} from '@mantine/core'
import { forwardRef } from 'react'
import { useForm } from '@mantine/form'
import { IconTrash } from '@tabler/icons'
import { useEffect, useState } from 'react'
import { IPropsCreateForm } from '../../types'
import { useMantineTheme } from '@mantine/core'
import { useGlobalConfig } from '../../utils/parser/globalconfig'
import {
   getInitialValue,
   IPropsschemaObject,
} from '../../utils/parser/schma_parser'
import { useTemplateConfig } from '../../utils/parser/templateconfig'

/**
 *
 * @param schema Schema needed for creating form
 * @param initialData data for init maybe loaded from DB or create template from schema
 * @param handleOnSubmit calls on submit button
 * @returns
 */
export const CreateFormFromConfigObject = ({
   url,
   savedData,
   handleOnSubmit,
}: IPropsCreateForm) => {
   const theme = useMantineTheme()
   const [global, initGlobal] = useGlobalConfig(url)
   const [templateName, setTemplateName] = useState(null)
   const [template, initTemplate] = useTemplateConfig(url, templateName)
   // console.log('saved', savedGlobal, savedTemplate)
   const form = useForm({
      initialValues: {
         name: savedData ? savedData.name : '',
         global: savedData ? savedData.global : {},
         template: savedData ? savedData.template : {},
      },
   })
   console.log(form.values)
   useEffect(() => {
      if (initGlobal != null && savedData == undefined)
         form.setFieldValue('global', initGlobal)
   }, [initGlobal])
   useEffect(() => {
      if (savedData == undefined) form.setFieldValue('template', initTemplate)
   }, [initTemplate])
   useEffect(() => {
      if (form.values.global.hasOwnProperty('template')) {
         console.log(form.values.global['template'])
         setTemplateName(form.values.global['template'])
      }
   }, [form.values.global])
   const [submittedValues, setSubmittedValues] = useState('')
   return (
      <>
         <form
            onSubmit={form.onSubmit((values) => {
               setSubmittedValues(JSON.stringify(values, null, 2))
               handleOnSubmit(values)
            })}>
            {savedData ? (
               <></>
            ) : (
               <TextInput
                  required
                  disabled={savedData ? true : false}
                  label="Business Name"
                  {...form.getInputProps('name')}
               />
            )}
            {!global && <div>Parsing Global</div>}
            {templateName && !template && <div>Parsing {templateName}</div>}
            {form.values.global &&
               global &&
               ParseObject(global, form, 'global')}
            {templateName &&
               template &&
               form.values.template &&
               ParseObject(template, form, 'template')}
            <Button type="submit" mt="md">
               Submit
            </Button>
         </form>
         {submittedValues && <Code block>{submittedValues}</Code>}
      </>
   )
}
/***
 * ! get Initival Value from the config object
 * @dev should add default value LATER
 */

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
   color?: string
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
   ({ color, ...others }: ItemProps, ref) => {
      const theme = useMantineTheme()
      return (
         <div ref={ref} {...others}>
            <Group noWrap>
               <ColorSwatch color={theme.colors[`${color}`][6]} />

               <Text size="sm">{color}</Text>
            </Group>
         </div>
      )
   }
)
SelectItem.displayName = 'SelectItem'
const ParseObject = (
   object: IPropsschemaObject,
   form,
   dataposition?: string
) => {
   const Parse = () => {
      // form.setFieldvalue(dataposition + object.title, {})
      switch (object.type) {
         case 'color':
            return (
               <Select
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
         case 'select':
            return (
               <Select
                  label={object.title}
                  data={object.data}
                  {...form.getInputProps(dataposition)}
               />
            )
         case 'boolean':
            return (
               <Checkbox
                  label={object.title}
                  {...form.getInputProps(dataposition)}
               />
            )
         case 'string':
         case 'number':
            return (
               <TextInput
                  label={object.title}
                  placeholder={object.description}
                  onChange={() => {
                     // form.setFieldValue('global', {
                     //    description: 'A',
                     //    template: 'B',
                     //    title: 'C',
                     // })
                  }}
                  {...form.getInputProps(dataposition)}
               />
            )
         case 'array':
            const formObject = () => {
               let current = form.values
               dataposition.split('.').forEach((value, index) => {
                  current = current[`${value}`]
               })
               return current
            }
            return (
               <>
                  <Button
                     onClick={() => {
                        const temp = getInitialValue(object.item)
                        console.log(temp)
                        form.insertListItem(dataposition, temp)
                     }}>{`New ${object.title}`}</Button>
                  {formObject().map((item, index) => (
                     <>
                        <Box key={dataposition}>
                           {ParseObject(
                              object.item,
                              form,
                              dataposition + `.${index}`
                           )}
                        </Box>
                        <Button
                           compact
                           variant="outline"
                           onClick={() => {
                              form.removeListItem(`${dataposition}`, index)
                           }}>
                           <IconTrash color="red" />
                        </Button>
                     </>
                  ))}
               </>
            )
         case 'group':
            return (
               <>
                  <Text color="red">{object.title}</Text>
                  {object.fields.map((item, index) => {
                     return (
                        <Box key={index}>
                           {ParseObject(
                              item,
                              form,
                              dataposition == ''
                                 ? dataposition + `${item.title}`
                                 : dataposition + `.${item.title}`
                           )}
                        </Box>
                     )
                  })}
               </>
            )
         default:
            return <Text>Unknow Type</Text>
      }
      return <Text>ParseA</Text>
   }
   return <>{Parse()}</>
}
