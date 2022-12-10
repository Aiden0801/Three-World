const gobal_config = {
   $schema: 'http://json-schema.org/draft-07/schema#',
   defaultProperties: [],
   description: 'Global common configuration for all the websites',
   properties: {
      description: {
         description: 'A short description of your website, for SEO purposes',
         title: 'description',
         type: 'string',
      },
      templates: {
         description: 'Available templates for the website.',
         enum: ['figma'],
         title: 'templates',
         type: 'string',
      },
      title: {
         description: 'Page title, for SEO purposes',
         title: 'title',
         type: 'string',
      },
   },
   required: ['description', 'templates', 'title'],
   type: 'object',
}
import { ParseSchema } from './schma_parser'
import $RefParser, { JSONSchema } from '@apidevtools/json-schema-ref-parser'
import { useEffect, useState } from 'react'
import { getInitialValue } from './schma_parser'
export const useGlobalConfig = (website_url: string) => {
   const [globalConfig, setGlobalConfig] = useState(null)
   const [initGlobal, setInitGlobal] = useState(null)
   useEffect(() => {
      getGlobalConfig()
   }, [])
   const getGlobalConfig = async () => {
      let schema = await $RefParser.dereference(
         `${website_url}/api/config/global`
      )
      const result = ParseSchema(schema)
      const resultinit = getInitialValue(result)
      setInitGlobal(resultinit)
      setGlobalConfig(result)
   }
   return [globalConfig, initGlobal]
}
