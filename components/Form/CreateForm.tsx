import {
   Box,
   Button,
   Checkbox,
   Code,
   NativeSelect,
   NumberInput,
   Select,
   Text,
   TextInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconTrash } from '@tabler/icons'
import { Draft07 } from 'json-schema-library'
import { useMemo, useState } from 'react'
import { IPropsCreateForm } from '../../types'
/**
 *
 * @param schema Schema needed for creating form
 * @param initialData data for init maybe loaded from DB or create template from schema
 * @param handleOnSubmit calls on submit button
 * @returns
 */
const CreateForm = ({
   schema,
   initialData,
   handleOnSubmit,
}: IPropsCreateForm) => {
   const jsonSchema = useMemo(() => new Draft07(schema), [schema])
   const myData = useMemo(() => jsonSchema.getTemplate(), [jsonSchema])
   const form = useForm({
      initialValues: initialData ? initialData : myData,
   })
   const [submittedValues, setSubmittedValues] = useState('')
   return (
      <>
         <form
            onSubmit={form.onSubmit((values) => {
               console.log(values)
               setSubmittedValues(JSON.stringify(values, null, 2))
               handleOnSubmit(values)
            })}>
            {Parse(schema, schema, form, '')}
            <Button type="submit" mt="md">
               Submit
            </Button>
         </form>
         {submittedValues && <Code block>{submittedValues}</Code>}
      </>
   )
}

const HandleAnyOf = ({ schema, currentSchema, form, dataposition }) => {
   const selectiveData = () => {
      let result = []
      currentSchema.anyOf.forEach((value, index) => {
         result.push(`${value.description} Section`)
      })
      return result
   }
   const selectData = selectiveData()
   const [index, setIndex] = useState(-1)
   return (
      <>
         <Select
            data={selectData}
            label="Select "
            onChange={(event) => {
               const newIndex = selectData.indexOf(event)

               const jsonSchema = new Draft07(
                  currentSchema.anyOf[`${newIndex}`]
               )
               const myData = jsonSchema.getTemplate()
               setIndex(newIndex)
               form.setFieldValue(dataposition, myData)
            }}
         />
         {(index == 1 || index == 0) &&
            Parse(schema, currentSchema.anyOf[`${index}`], form, dataposition)}
      </>
   )
}
/**
 * @function Parse recusive function for parsing Schema
 * @param schema
 * @param currentSchema
 * @param form
 * @param dataposition
 * @returns
 */
const Parse = (schema, currentSchema, form, dataposition?: string) => {
   const Switching = () => {
      // if (currentSchema['$ref']) {
      //    return parse(schema, refs.get(currentSchema['$ref']), form)
      // }
      const level = 5 - dataposition.split('.').length
      if (currentSchema.hasOwnProperty('anyOf')) {
         return (
            <HandleAnyOf
               schema={schema}
               currentSchema={currentSchema}
               form={form}
               dataposition={dataposition}
            />
         )
      }
      if (currentSchema.hasOwnProperty('enum')) {
         return (
            <NativeSelect
               data={currentSchema.enum}
               label={currentSchema.title}
               description={currentSchema.description}
               {...form.getInputProps(currentSchema.title)}
               onChange={(event) =>
                  form.setFieldValue(dataposition, event.currentTarget.value)
               }
            />
         )
      }
      switch (currentSchema.type) {
         case 'string':
            return (
               <TextInput
                  key={dataposition}
                  label={currentSchema.title}
                  description={undefined}
                  placeholder={currentSchema.description}
                  {...form.getInputProps(dataposition)}
               />
            )
         case 'number':
            return (
               <NumberInput
                  label={currentSchema.title}
                  placeholder={dataposition}
                  withAsterisk
                  {...form.getInputProps(dataposition)}
               />
            )
         case 'boolean':
            return (
               <Checkbox
                  label={dataposition}
                  {...form.getInputProps(dataposition, { type: 'checkbox' })}
               />
            )

         case 'array':
            if (
               currentSchema.minItems &&
               currentSchema.minItems == currentSchema.maxItems
            )
               return currentSchema.items.map((value, index) => {
                  return (
                     <>
                        <Box key={index}>
                           {Parse(
                              schema,
                              currentSchema.items[`${index}`],
                              form,
                              dataposition + `.${index}`
                           )}
                        </Box>
                     </>
                  )
               })
            const formObject = () => {
               let current = form.values
               dataposition.split('.').forEach((value, index) => {
                  current = current[`${value}`]
               })
               return current
            }
            return (
               <>
                  <Text color="teal" size={level * 15}>
                     {currentSchema.title}
                  </Text>
                  <Button
                     onClick={() => {
                        const jsonSchema = new Draft07(currentSchema.items)
                        const myData = jsonSchema.getTemplate()
                        form.insertListItem(dataposition, myData)
                     }}
                     compact>
                     {`New ${currentSchema.title}`}
                  </Button>
                  {formObject().map((value, index) => (
                     <>
                        <Box key={dataposition}>
                           {Parse(
                              schema,
                              currentSchema.items,
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
         case 'object':
            return (
               <>
                  <Text color="teal" size={level * 15}>
                     {currentSchema.title}
                  </Text>
                  {Object.keys(currentSchema.properties).map((value, index) => {
                     return (
                        <Box
                           key={index}
                           sx={(theme) => ({
                              marginBottom: level * 5,
                           })}>
                           {Parse(
                              schema,
                              currentSchema.properties[`${value}`],
                              form,
                              schema == currentSchema
                                 ? dataposition + `${value}`
                                 : dataposition + `.${value}`
                           )}
                        </Box>
                     )
                  })}
               </>
            )
         default:
            return <Text>Unknow Types Comming Soon</Text>
      }
   }
   return <>{Switching()}</>
}
export default CreateForm
