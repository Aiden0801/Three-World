import { ParseSchema, getInitialValue } from './schema_parser'
import $RefParser, { JSONSchema } from '@apidevtools/json-schema-ref-parser'
import { useEffect, useState } from 'react'

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
