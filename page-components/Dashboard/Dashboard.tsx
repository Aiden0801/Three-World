import $RefParser, { JSONSchema } from '@apidevtools/json-schema-ref-parser'
import {
   Box,
   Button,
   Checkbox,
   Code,
   Container,
   NativeSelect,
   NumberInput,
   Select,
   Text,
   TextInput,
   Table,
   List,
   Skeleton,
   Card,
   Group,
   Flex,
   Badge,
   createStyles,
   Modal,
} from '@mantine/core'
import { openConfirmModal } from '@mantine/modals'
import { useForm } from '@mantine/form'
import { IconTrash, IconPlus } from '@tabler/icons'
import { Draft07 } from 'json-schema-library'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect, useMemo, useState } from 'react'
import { LandingPageSchema } from '../../config/2DLangingPageSchema'
import { serverURL } from '../../config/urlcontrol'
import { fetcher } from '../../lib/fetcher'
import useSWR from 'swr'
import { useRouter } from 'next/router'

const useStyles = createStyles((theme) => ({
   container: {
      position: 'relative',
      margin: '10px,10px,10px,10px',
      display: 'flex',
      flexDirection: 'column',
   },
}))
const CreateForm = ({ schema }) => {
   const jsonSchema = useMemo(() => new Draft07(schema), [schema])
   const myData = useMemo(() => jsonSchema.getTemplate(), [jsonSchema])
   const form = useForm({
      initialValues: myData,
   })
   const [submittedValues, setSubmittedValues] = useState('')
   const createProject = async (data) => {
      console.log(data)
      const newData = await fetcher(
         'http://localhost:3000/api/projects/createProject',
         {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
               data: data,
            }),
         }
      )
   }
   return (
      <>
         <form
            onSubmit={form.onSubmit((values) => {
               console.log(values)
               setSubmittedValues(JSON.stringify(values, null, 2))
               createProject(values)
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

const fetchProjects = async (url: string, email: string) => {
   const data = await fetcher(
      `http://localhost:3000/api/projects/getProjects`,
      {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
      }
   )
   return data ? data : []
}
const useProjectData = () => {
   const { data, mutate, error, isValidating } = useSWR(
      ['api/projects/getProjects'],
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

const Dashboard: React.FC = () => {
   const { data: projectData, isLoading, isError, mutate } = useProjectData()
   const [refs, setRefs] = useState<$RefParser.$Refs>(null)

   const [schema, setSchema] = useState<JSONSchema>()
   const [loaded, setLoaded] = useState(false)
   const [opened, setOpened] = useState(false)
   const { classes, theme } = useStyles()
   const router = useRouter()
   useEffect(() => {
      // console.log(LandingPageSchema)
      console.log(projectData)
      test()
   }, [])
   const test = async () => {
      let test = await $RefParser.dereference(LandingPageSchema)
      let $refs = await $RefParser.resolve(test)
      setRefs($refs)
      setSchema(test)
      setLoaded((o) => true)
   }

   return (
      // <Suspense fallback={<div>Loading</div>}>
      <Container
         mt="xl"
         style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
         }}>
         <Modal
            transition="fade"
            transitionDuration={600}
            size="80%"
            opened={opened}
            title="Create Project"
            onClose={() => {
               console.log('onClose')
               setOpened(false)
            }}>
            {loaded && <CreateForm schema={schema} />}
         </Modal>
         <Box
            sx={(theme) => ({
               display: 'flex',
               justifyContent: 'space-between',
               align: 'center',
               alignItems: 'center',
               marginBottom: '20px',
            })}>
            <Text>Projects</Text>

            <Button
               compact
               onClick={() => {
                  setOpened(true)
               }}
               color="blue"
               pr={12}>
               <Text
                  sx={{
                     [theme.fn.smallerThan('md')]: {
                        display: 'none',
                     },
                  }}>
                  New
               </Text>
               <IconPlus size={20} stroke={1.5} />
            </Button>
         </Box>
         <Skeleton height={500} visible={isLoading}>
            {projectData &&
               projectData.map((item, index) => (
                  <Card withBorder shadow="sm" key={index} mt="sm">
                     <Badge>Name</Badge>
                     <Flex justify="space-between" align="center">
                        <Text>{item.name}</Text>
                        <Button
                           variant="light"
                           color="blue"
                           mt="md"
                           size="xs"
                           radius="md"
                           onClick={() => {
                              router.push(`/dashboard/${item.name}`)
                           }}>
                           Edit now
                        </Button>
                     </Flex>
                  </Card>
               ))}
         </Skeleton>
         {/* {loaded && <CreateForm schema={schema} />} */}
      </Container>
      // </Suspense>
   )
}

export default Dashboard
