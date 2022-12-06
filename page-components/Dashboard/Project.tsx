import {
   Container,
   Text,
   TextInput,
   Checkbox,
   NumberInput,
   NativeSelect,
   Button,
   Code,
   Select,
   Box,
} from '@mantine/core'
import { IconTrash } from '@tabler/icons'
import { useSession } from 'next-auth/react'
import React, { useCallback, useEffect, useState, useMemo } from 'react'
import Link from 'next/link'
import $RefParser, { JSONSchema } from '@apidevtools/json-schema-ref-parser'
import {
   Draft04,
   Draft06,
   Draft07,
   Draft,
   JSONError,
   JSONSchema as jsSchema,
} from 'json-schema-library'
import { useForm } from '@mantine/form'
import { LandingPageSchema } from '../../config/2DLangingPageSchema'
import { fetcher } from '../../lib/fetcher'
import useSWR from 'swr'
import { IconArrowBack } from '@tabler/icons'
import { useRouter } from 'next/router'
const CreateForm = ({ schema, initialData, handleOnSubmit }) => {
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
   return (
      <>
         {/* <Text>{currentSchema.title}</Text> */}
         {Switching()}
      </>
   )
}

const fetchProjects = async (url: string, name: string) => {
   console.log('fetch', name)
   const data = await fetcher(
      `http://localhost:3000/api/projects/${name}/websiteconfig`,
      {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
      }
   )
   return data ? data : []
}
const useProjectData = (projectName) => {
   console.log('use', projectName)
   const { data, mutate, error, isValidating } = useSWR(
      ['api/projects/getProjects', projectName],
      fetchProjects,
      { revalidateOnFocus: false }
   )
   return {
      data: data,
      isLoading: (!error && !data) || isValidating,
      isError: error,
      mutate: mutate,
   }
}
const ProjectCofig = ({ projectName }) => {
   const { data: session, status } = useSession()
   //    const [refs, setRefs] = useState<$RefParser.$Refs>(null)

   const [schema, setSchema] = useState<JSONSchema>()
   const [loaded, setLoaded] = useState(false)
   const router = useRouter()
   const {
      data: projectData,
      isLoading,
      isError,
      mutate,
   } = useProjectData(projectName)
   useEffect(() => {
      console.log(LandingPageSchema)
      test()
   }, [])
   const test = async () => {
      let test = await $RefParser.dereference(LandingPageSchema)
      //   let $refs = await $RefParser.resolve(test)
      //   setRefs($refs)
      setSchema(test)
      console.log(test)
      setLoaded((o) => true)
   }
   const handleOnSubmit = async (values) => {
      console.log('handleOnSubmit', values)
      const newData = await fetcher(
         'http://localhost:3000/api/projects/updateProject',
         {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
               data: values,
            }),
         }
      )
   }
   return (
      // <Suspense fallback={<div>Loading</div>}>
      <Container
         style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
         }}>
         <Box
            sx={(theme) => ({
               display: 'flex',
               justifyContent: 'space-between',
               align: 'center',
               alignItems: 'center',
               marginTop: '30px',
            })}>
            <Text
               component="span"
               variant="gradient"
               gradient={{ from: 'indigo', to: 'green', deg: 0 }}
               weight={700}
               style={{
                  fontFamily: 'Greycliff CF, sans-serif',
                  fontSize: '30px',
               }}>
               Edit Project
            </Text>
            <Button
               compact
               size="sm"
               leftIcon={<IconArrowBack size={18} stroke={1.5} />}
               color="orange"
               pr={20}
               onClick={() => {
                  router.push('./')
               }}>
               Back
            </Button>
         </Box>
         {loaded && !isLoading && (
            <CreateForm
               schema={schema}
               initialData={projectData}
               handleOnSubmit={handleOnSubmit}
            />
         )}
      </Container>
      // </Suspense>
   )
}

export default ProjectCofig
