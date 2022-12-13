import { getInitialValue, ParseSchema } from './schma_parser'
import $RefParser, { JSONSchema } from '@apidevtools/json-schema-ref-parser'
import { useState, useEffect } from 'react'
import { clientAppURL } from '../../config/urlcontrol'
export const useTemplateConfig = (
   website_url: string,
   template_name: string
) => {
   const [templateConfig, setTemplateConfig] = useState(null)
   const [initTemplate, setInitTemplate] = useState(null)
   useEffect(() => {
      if (template_name != '' && template_name != null) getTemplateConfig()
   }, [template_name])
   const getTemplateConfig = async () => {
      console.log('getTemplateConfig')
      let schema = await $RefParser.dereference(
         `${website_url}/api/config/template/${template_name}`
      )

      const result = ParseSchema(schema)
      console.log('result', result)
      const resultinit = getInitialValue(result)
      setTemplateConfig(result)
      setInitTemplate(resultinit)
   }
   return [templateConfig, initTemplate]
}
