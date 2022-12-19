// file: utils\parser\schema_parser.ts
import JsonParser, { JSONSchema } from '@apidevtools/json-schema-ref-parser'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { getInitialValue, ParseSchema } from '@/utils/parser/schema_parser'
import { convertJsonSchemaToZod } from '@/utils/zod.helper'
type BaseOptions = {
  parser?: (schema: JSONSchema) => any
  base_url: string
}
type TemplateOptions = BaseOptions & {
  template: string
}

type UseConfigOptions = ({ type: 'global' } & BaseOptions) | ({ type: 'template' } & TemplateOptions)

type UseConfigReturnValue<Options extends UseConfigOptions> = [
  /** parsed usable configuration */
  config: Options['parser'] extends undefined ? any : ReturnType<Options['parser']>,
  /** initial values for the form */
  initConfig: any,
  /** zod Object */
  zodObject: any,
  /** whether we're loading the config */
  loading: boolean,
  /** original (dereferenced) schema object */
  schema: JSONSchema | null
]
/**
 * Fetch the configuration from the server, parse it and flatten all the $ref
 * into a single object.
 * Returned configuration is the json schema with all the $ref flattened, parsed
 * ready to be used to generate the forms.
 *
 * @dev this should replace `useGlobalConfig` and `useTemplateConfig`
 *      in the form generator in the future.
 *
 * @param options Options to fetch the configuration
 * @param options.type Type of configuration to fetch. `global` | `template`
 * @param options.base_url Base url of the server
 * @param options.template (optional) Template name to fetch the configuration for
 * @returns `[config: {}, initialValues: {}, loading: boolean, schema: JSONSchema | null]`
 * @throws Error if the options are invalid
 * @example
 * const [config, initialValues, schema] = useConfig({
 *   type: 'template',
 *   base_url: 'https://example.com',
 *   template: 'figma'
 * })
 */
export function useConfig(options: UseConfigOptions): UseConfigReturnValue<UseConfigOptions> {
  const [config, setConfig] = useState(null)
  const [initials, setInitials] = useState(null)
  const [schema, loading] = useJsonSchema(options)
  const [zodObject, setZodObject] = useState(null)
  useEffect(() => {
    if (!schema) return
    setZodObject(convertJsonSchemaToZod(schema))
    const parser = options.parser ?? ParseSchema
    const parsedObject = parser(schema)
    setConfig(parsedObject)
    setInitials(getInitialValue(parsedObject))
  }, [schema])

  return [config, initials, zodObject, loading, schema]
}

// Internals

/**
 * Fetch the configuration from the server, parse it and flatten all the $ref
 * into a single object.
 * @param options Options to fetch the configuration
 * @returns parsed schema or null if the schema is not yet fetched
 */
function useJsonSchema(options: UseConfigOptions): [JSONSchema | null, boolean] {
  const [schema, setSchema] = useState<JSONSchema>(null!)
  const [loading, setLoading] = useState(false)

  const url = useMemo(() => {
    if (options.type === 'template' && !isValid(options.template)) return
    return getUrl(options)
  }, [options])

  const getDereferencedSchema = useCallback(async () => {
    if (!url) return
    setLoading(true)
    setSchema(await JsonParser.dereference(url))
    console.log(await JsonParser.dereference(url))
    setLoading(false)
  }, [url])

  useEffect(() => {
    if (!schema) getDereferencedSchema()
  }, [schema, getDereferencedSchema])

  return [schema, loading]
}

/**
 * Get the url to fetch the configuration from the server based off the options
 * provided.
 * @param options Options to fetch the configuration
 * @param options.base_url Base url of the server
 * @param options.type Type of configuration to fetch
 * @param options.template (optional) Template name to fetch the configuration for
 * @throws Error if the options are invalid
 * @returns url to fetch the configuration from
 */
function getUrl(options: UseConfigOptions) {
  if (!options.base_url) throw new Error('base_url is required!')
  if (!options.type) throw new Error('schema type is required!')

  const base = `${options.base_url}/api/config`

  switch (options.type) {
    case 'global':
      return `${base}/global`
    case 'template':
      return `${base}/template/${options.template}`
    default:
      throw new Error(`Unknown type: ${(options as any).type}!`)
  }
}

function isValid(str: string | null | undefined): str is string {
  return str !== '' && str !== null && str !== undefined
}
