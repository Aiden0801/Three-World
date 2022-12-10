import {
   Box,
   Button,
   Checkbox,
   Code,
   ColorPicker,
   NativeSelect,
   NumberInput,
   Select,
   Text,
   TextInput,
} from '@mantine/core'
import { useEffect, useMemo, useState, useCallback } from 'react'
import { useForm, FORM_INDEX } from '@mantine/form'
import { IconTrash } from '@tabler/icons'
import { Draft07 } from 'json-schema-library'
import { IPropsCreateForm } from '../../types'
import {
   IPropsschemaObject,
   getInitialValue,
} from '../../utils/parser/schma_parser'
import { fetcher } from '../../lib/fetcher'
import { serverURL } from '../../config/urlcontrol'
import { IconCheck } from '@tabler/icons'
import { showNotification } from '@mantine/notifications'
import { useTemplateConfig } from '../../utils/parser/templateconfig'
import { useGlobalConfig } from '../../utils/parser/globalconfig'

/**
 *
 * @param schema Schema needed for creating form
 * @param initialData data for init maybe loaded from DB or create template from schema
 * @param handleOnSubmit calls on submit button
 * @returns
 */

export const CreateFormFromConfigObject = ({ url }) => {
   const [global, initGlobal] = useGlobalConfig(url)
   const [template, initTemplate] = useTemplateConfig(url, 'figma')
   // const initGlobal = useMemo(() => getInitialValue(global), [global])
   // const initTemplate = useMemo(() => getInitialValue(template), [template])
   const form = useForm({
      initialValues: {
         global: initGlobal,
         template: initTemplate,
      },
   })
   useEffect(() => {
      form.setFieldValue('global', initGlobal)
   }, [initGlobal])
   useEffect(() => {
      form.setFieldValue('template', initTemplate)
   }, [initTemplate])
   // console.log(global, initialValue)
   const [submittedValues, setSubmittedValues] = useState('')
   const handleOnSubmit = useCallback(async (values) => {
      const response = await fetcher(
         `${serverURL}/api/projects/createProject`,
         {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
               data: values,
            }),
         }
      )
      if (response == 'Success') {
         showNotification({
            title: 'Success',
            autoClose: 2000,
            color: 'teal',
            icon: <IconCheck size={16} />,
            message: 'New Project Created🤥',
         })
      }
   }, [])
   return (
      <>
         <form
            onSubmit={form.onSubmit((values) => {
               setSubmittedValues(JSON.stringify(values, null, 2))
               handleOnSubmit(values)
            })}>
            {!global && <div>Parsing Global</div>}
            {!template && <div>Parsing Template</div>}
            {form.values.global && ParseObject(global, form, 'global')}
            {form.values.template && ParseObject(template, form, 'template')}
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
               <ColorPicker
                  swatches={[
                     '#25262b',
                     '#868e96',
                     '#fa5252',
                     '#e64980',
                     '#be4bdb',
                     '#7950f2',
                     '#4c6ef5',
                     '#228be6',
                     '#15aabf',
                     '#12b886',
                     '#40c057',
                     '#82c91e',
                     '#fab005',
                     '#fd7e14',
                  ]}
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
            console.log('parsing', dataposition, form.values)
            return (
               <TextInput
                  label={object.title}
                  placeholder={dataposition}
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
