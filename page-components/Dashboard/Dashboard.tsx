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
} from '@mantine/core'
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
const mySchema: JSONSchema = {
   $schema: 'http://json-schema.org/draft-07/schema#',
   defaultProperties: [],
   definitions: {
      T: {
         defaultProperties: [],
         properties: {
            direction: {
               $ref: '#/definitions/TSlideDirection',
               description: "direction from where it's going to appear",
               title: 'direction',
            },
            isVideo: {
               description:
                  'set to true if the slide is a video and not a static image/html content',
               title: 'isVideo',
               type: 'boolean',
            },
            position: {
               description:
                  'initial position of the slide, i.e. where it comes from when it enters the scene',
               items: [
                  {
                     type: 'number',
                  },
                  {
                     type: 'number',
                  },
                  {
                     type: 'number',
                  },
               ],
               maxItems: 3,
               minItems: 3,
               title: 'position',
               type: 'array',
            },
            src: {
               description: 'source path for the image',
               title: 'src',
               type: 'string',
            },
            title: {
               description: 'Unique title for the slide.',
               title: 'title',
               type: 'string',
            },
            trigger: {
               description:
                  'matching dom element identifier that will trigger the slide to appear (internally managed).',
               title: 'trigger',
               type: 'string',
            },
         },
         required: ['direction', 'position', 'src'],
         title: 'T',
         type: 'object',
      },
      TSlideDirection: {
         enum: ['center', 'down', 'left', 'right', 'up'],
         title: 'TSlideDirection',
         type: 'string',
      },
   },
   description:
      'Configuration required for the virtual-pitch-deck to work.\nThis is passed as prop to the main component of the package to generate everything else',
   properties: {
      background: {
         anyOf: [
            {
               items: [
                  {
                     type: 'string',
                  },
                  {
                     type: 'string',
                  },
                  {
                     type: 'string',
                  },
                  {
                     type: 'string',
                  },
                  {
                     type: 'string',
                  },
                  {
                     type: 'string',
                  },
               ],
               maxItems: 6,
               minItems: 6,
               type: 'array',
            },
            {
               type: 'string',
            },
         ],
         description:
            'Background image(s) to show for the skybox.\neither a single url or 6 (different) urls for the 6 faces of the skybox',
         title: 'background',
      },
      slides: {
         description: 'slides configuration array',
         items: {
            $ref: '#/definitions/T',
         },
         title: 'slides',
         type: 'array',
      },
      title: {
         description:
            'Pitch deck title. if present it will be shown at before the slides as a 3d text object',
         title: 'title',
         type: 'string',
      },

      isVideo: {
         description:
            'set to true if the slide is a video and not a static image/html content',
         title: 'isVideo',
         type: 'boolean',
      },
      position: {
         description:
            'initial position of the slide, i.e. where it comes from when it enters the scene',
         items: [
            {
               type: 'number',
            },
            {
               type: 'number',
            },
            {
               type: 'number',
            },
         ],
         maxItems: 3,
         minItems: 3,
         title: 'position',
         type: 'array',
      },
      src: {
         description: 'source path for the image',
         title: 'src',
         type: 'string',
      },
      trigger: {
         description:
            'matching dom element identifier that will trigger the slide to appear (internally managed).',
         title: 'trigger',
         type: 'string',
      },
      TSlideDirection: {
         enum: ['center', 'down', 'left', 'right', 'up'],
         title: 'TSlideDirection',
         type: 'string',
      },
   },
   required: ['slides'],
   type: 'object',
}

const CreateForm = ({ schema }) => {
   const jsonSchema = useMemo(() => new Draft07(schema), [schema])
   const myData = useMemo(() => jsonSchema.getTemplate(), [jsonSchema])
   const form = useForm({
      initialValues: myData,
   })
   const [submittedValues, setSubmittedValues] = useState('')
   return (
      <>
         <form
            onSubmit={form.onSubmit((values) =>
               setSubmittedValues(JSON.stringify(values, null, 2))
            )}>
            {Parse(schema, schema, form, '')}
            <Button type="submit" mt="md">
               Submit
            </Button>
         </form>
         {submittedValues && <Code block>{submittedValues}</Code>}
      </>
   )
}
const Parse = (schema, currentSchema, form, dataposition?: string) => {
   const switching = () => {
      console.log(currentSchema)
      // if (currentSchema['$ref']) {
      //    return parse(schema, refs.get(currentSchema['$ref']), form)
      // }
      if (currentSchema.hasOwnProperty('enum')) {
         return (
            <NativeSelect
               data={currentSchema.enum}
               label={currentSchema.title}
               description={dataposition}
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
                  label={dataposition}
                  description={undefined}
                  placeholder={currentSchema.title}
                  {...form.getInputProps(dataposition)}
               />
            )
         case 'number':
            return (
               <NumberInput
                  label={dataposition}
                  placeholder={dataposition}
                  withAsterisk
                  {...form.getInputProps(dataposition)}
               />
            )
         case 'boolean':
            return (
               <Checkbox
                  label={currentSchema.title}
                  {...form.getInputProps(currentSchema.title)}
               />
            )

         case 'array':
            const Handle = () => {
               return (
                  <>
                     <Button
                        onClick={() => {
                           const jsonSchema = new Draft07(currentSchema.items)
                           const myData = jsonSchema.getTemplate()
                           console.log(dataposition + 'A', myData)
                           form.insertListItem(dataposition, myData)
                        }}>
                        Add
                        {dataposition}
                     </Button>
                     {form.values[`${dataposition}`] &&
                        form.values[`${dataposition}`].map((value, index) => {
                           return Parse(
                              schema,
                              currentSchema.items,
                              form,
                              dataposition + `.${index}`
                           )
                        })}
                  </>
               )
            }
            if (
               currentSchema.minItems &&
               currentSchema.minItems == currentSchema.maxItems
            )
               return currentSchema.items.map((value, index) => {
                  return Parse(
                     schema,
                     currentSchema.items[`${index}`],
                     form,
                     dataposition + `.${index}`
                  )
               })
            return (
               <>
                  <Handle />
               </>
            )
         case 'object':
            return (
               <>
                  {currentSchema.description ? (
                     <Text>{currentSchema.description}</Text>
                  ) : (
                     <></>
                  )}
                  {Object.keys(currentSchema.properties).map((value, index) => {
                     ;<Text key={index}></Text>
                     return Parse(
                        schema,
                        currentSchema.properties[`${value}`],
                        form,
                        schema == currentSchema
                           ? dataposition + `${value}`
                           : dataposition + `.${value}`
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
         {switching()}
      </>
   )
}
const Dashboard: React.FC = () => {
   const { data: session, status } = useSession()
   const [refs, setRefs] = useState<$RefParser.$Refs>(null)

   const [schema, setSchema] = useState<JSONSchema>()
   const [loaded, setLoaded] = useState(false)
   useEffect(() => {
      console.log(mySchema)
      test()
   }, [])
   const test = async () => {
      let test = await $RefParser.dereference(mySchema)
      let $refs = await $RefParser.resolve(test)
      setRefs($refs)
      setSchema(test)
      console.log(test)
      setLoaded((o) => true)
   }

   return (
      // <Suspense fallback={<div>Loading</div>}>
      <Container
         style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
         }}>
         <Link href="/sessions"> Click to Create a New Session</Link>
         <Link href="/browsers"> Set a session to browser</Link>
         <Link href="/share"> Start sharing</Link>
         <Text
            style={{ fontSize: '20px' }}
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan' }}
            inherit>
            Coming Soon
         </Text>
         {loaded && <CreateForm schema={schema} />}
      </Container>
      // </Suspense>
   )
}

export default Dashboard
