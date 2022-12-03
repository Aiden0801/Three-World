import {
   Container,
   Text,
   TextInput,
   Checkbox,
   NumberInput,
   NativeSelect,
} from '@mantine/core'
import { useSession } from 'next-auth/react'
import React, { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import $RefParser, { JSONSchema } from '@apidevtools/json-schema-ref-parser'
import {
   Draft04,
   Draft06,
   Draft07,
   Draft,
   JSONError,
} from 'json-schema-library'
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
   },
   required: ['slides'],
   type: 'object',
}

const Dashboard: React.FC = () => {
   const { data: session, status } = useSession()
   const [refs, setRefs] = useState<$RefParser.$Refs>(null)
   useEffect(() => {
      console.log(mySchema)
      test()
   }, [])
   const test = async () => {
      let $refs = await $RefParser.resolve(mySchema)
      setRefs($refs)
      let name = $refs.get('#/definitions/TSlideDirection')
      console.log('helo', name, $refs)
      const jsonSchema = new Draft07(mySchema)

      const myData = jsonSchema.getTemplate()
      console.log(myData)
   }
   const parse = useCallback((schema, currentSchema, currentKey?: String) => {
      const switching = () => {
         if (currentSchema['$ref']) {
            return parse(schema, refs.get(currentSchema['$ref']))
         }
         if (currentSchema.enum) {
            return (
               <NativeSelect
                  data={currentSchema.enum}
                  label="Select your favorite framework/library"
                  description="This is anonymous"
                  withAsterisk
               />
            )
         }
         switch (currentSchema.type) {
            case 'string':
               return <TextInput description={undefined} />
            case 'number':
               return <NumberInput placeholder="Input number" withAsterisk />
            case 'array':
               if (currentSchema.items.$ref) {
                  return parse(schema, refs.get(currentSchema.items['$ref']))
               }
               return (
                  <>
                     {currentSchema.items.map((item, index) => {
                        // console.log(item)
                        return parse(schema, item)
                     })}
                  </>
               )
            case 'boolean':
               return <Checkbox label="I agree to sell my privacy" />
            case 'object':
               return (
                  <>
                     {currentSchema.description ? (
                        <Text>{currentSchema.description}</Text>
                     ) : (
                        <></>
                     )}
                     {Object.keys(currentSchema.properties).map(
                        (value, index) => {
                           ;<Text key={index}></Text>
                           return parse(
                              schema,
                              currentSchema.properties[`${value}`]
                           )
                        }
                     )}
                  </>
               )
            default:
               return <Text>Unknow Types Comming Soon</Text>
         }
      }
      return (
         <>
            <Text>{currentSchema.title}</Text>

            {switching()}
         </>
      )
   }, [])
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
         {refs && parse(mySchema, mySchema)}
      </Container>
      // </Suspense>
   )
}

export default Dashboard
