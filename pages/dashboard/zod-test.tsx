const json_schema: any = {
  type: 'object',
  properties: {
    theme: {
      type: 'object',
      properties: {
        primaryColor: {
          type: 'string',
          enum: [
            'dark',
            'gray',
            'red',
            'pink',
            'grape',
            'violet',
            'indigo',
            'blue',
            'cyan',
            'teal',
            'green',
            'lime',
            'yellow',
            'orange',
          ],
        },
      },
      additionalProperties: false,
    },
    sections: {
      type: 'array',
      items: {
        anyOf: [
          {
            type: 'object',
            properties: {
              component: {
                type: 'string',
                const: 'hero',
              },
              config: {
                type: 'object',
                properties: {
                  title: {
                    type: 'string',
                  },
                  subtitle: {
                    type: 'string',
                  },
                },
                required: ['title'],
                additionalProperties: false,
              },
            },
            required: ['component', 'config'],
            additionalProperties: false,
          },
          {
            type: 'object',
            properties: {
              component: {
                type: 'string',
                const: 'clients',
              },
              config: {
                type: 'object',
                properties: {
                  list: {
                    type: 'array',
                    items: {
                      type: 'string',
                    },
                  },
                },
                required: ['list'],
                additionalProperties: false,
              },
            },
            required: ['component', 'config'],
            additionalProperties: false,
          },
        ],
      },
    },
    footer: {
      type: 'object',
      properties: {
        copyright: {
          type: 'object',
          properties: {
            company: {
              type: 'string',
              description: 'Name of the company holding the rights to the content',
            },
            year: {
              type: 'number',
              description: 'Initial copyright year',
            },
          },
          required: ['company', 'year'],
          additionalProperties: false,
          description: 'Copyright information',
        },
        menu: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              title: {
                type: 'string',
                description: 'Title of the menu group',
              },
              items: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    text: {
                      type: 'string',
                      description: 'Text for the link',
                    },
                    href: {
                      type: 'string',
                      description: 'Link URL',
                    },
                    target: {
                      type: 'string',
                      enum: ['_self', '_blank'],
                    },
                  },
                  required: ['text', 'href'],
                  additionalProperties: false,
                },
                description: 'Menu items',
              },
            },
            required: ['title', 'items'],
            additionalProperties: false,
          },
          description: 'Menu groups',
        },
      },
      required: ['copyright', 'menu'],
      additionalProperties: false,
    },
  },
  required: ['theme', 'sections', 'footer'],
  additionalProperties: false,
  description: 'The original HHHQ Template.',
  $schema: 'http://json-schema.org/draft-07/schema#',
}
const test_schema: any = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      minLength: 2,
      errorMessage: {
        minLength: 'Name should have at least 2 letters',
      },
    },
    email: {
      type: 'string',
      format: 'email',
      errorMessage: {
        format: 'Invalid email',
      },
    },
    age: {
      type: 'number',
      minimum: 18,
      errorMessage: {
        minimum: 'You must be at least 18 to create an account',
      },
    },
  },
  required: ['name', 'email', 'age'],
  additionalProperties: false,
  $schema: 'http://json-schema.org/draft-07/schema#',
}
import zodToJsonSchema from 'zod-to-json-schema'
import { useForm, zodResolver } from '@mantine/form'
import React, { useEffect, useState } from 'react'
import logger from '@/utils/logger'
import { jsonSchemaToZod, jsonSchemaToZodDereffed, parseSchema } from 'json-schema-to-zod'
import { JSONSchema7 } from 'json-schema'
import { z } from 'zod'
import { getInitialValue } from '@/utils/parser/schema_parser'
import { ParseObject } from '@/lib/landing-pages/parse-object'
import { parseSchema as parseSchemaToObject } from '@/lib/landing-pages'
import { Button } from '@mantine/core'

import { createZodTemplateSchema } from '@/lib/landing-pages/zod'

export default function Zod() {
  const [config, setConfig] = useState(undefined)
  const [zodObject, setZodObject] = useState(undefined)
  const form = useForm({
    initialValues: (config && getInitialValue(config)) ?? {},
    validate: zodObject ? zodResolver(zodObject) : {},
  })
  console.log(form.values)
  useEffect(() => {
    test()
  }, [])

  const test = async () => {
    const zodAsString = parseSchema(json_schema)
    const zodObject = createZodTemplateSchema(zodAsString)
    const parsedSchema = parseSchemaToObject(test_schema)
    setConfig(parsedSchema)
    setZodObject(zodObject)
  }
  return (
    <>
      <div>Hello</div>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        {config && ParseObject(config, form, '')}
        <Button type="submit"> Submit</Button>
      </form>
    </>
  )
}
