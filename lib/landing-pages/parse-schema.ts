import { JSONSchema } from '@apidevtools/json-schema-ref-parser'
import { parseTitle } from '../text-helpers'
import * as filter from './filters'
import * as parser from './parsers'
/**
 * Takes a JSON Schema and parses it into a format that can be used to generate
 * forms.
 * Schema should dereferenced before being passed to this function.
 * TODO: Implement FormFieldComponentType type in the return type
 * @param schema JSON Schema to parse
 */
export function parseSchema(schema_: JSONSchema) {
  console.info('starting parseSchema', schema_)
  function executeParse(schema: JSONSchema) {
    if (!schema) {
      return schema
    }
    if (filter.isArrayOfEnum(schema)) {
      const data = {
        component: 'list-enum',
        data: schema.items['anyOf'].map((value) => value.properties.component.const),
        fields: schema.items['anyOf'].map((value) => executeParse(value.properties.config)),
        ...schema,
      }
      // we don't need the enum anymore, and it would cause infinite recursion
      // since we'd always end up here
      console.log('parsedIsArrayofEnum', data)
      delete data.items
      return data
    }
    // group 1

    if (filter.isEnum(schema)) {
      return parser.enumToSelect(schema)
    }

    if (filter.isObject(schema)) {
      // parse the `properties` of the schema. this will return an array of
      // objects and call recursively to parse nested schemas.
      const fields = Object.entries(schema.properties).map(([key, value]) => {
        const isRequired = filter.isRequired(key, schema)
        const placeholder = value?.placeholder || value?.description || undefined
        const title = key as string
        const label = key as string
        const data = {
          title,
          label,
          key,
          isRequired,
          placeholder,
          ...parser.normalizeTitle(value, 'label'),
          ...executeParse(value),
        }
        return data
      }) // end map

      return { fields, type: 'group' }
    }
    if (filter.isArray(schema)) {
      // group array
      const out = {
        ...schema,
        component: 'list-group',
        items: executeParse(schema.items),
      }
      // TODO: sort the `items` array by some `order` property that SHOULD be in the schema
      return out
      // return schema.map((value) => parseSchema(value))
    }
    if (filter.isThemeColor(schema)) {
      return parser.themeColor(schema)
    }
    // end group 1
    return schema
  }
  const result = executeParse(schema_)
  console.info('result', result)
  return result
}

// export function parseTemplate(schema: JSONSchema) {
//   return parseSchema(schema)

//   const sections = Object.entries(schema.properties.sections).map(
//     ([key, value]) => [key, parseSchema(value)]
//   )
//   return {
//     sections: Object.fromEntries(sections),
//     theme: parseSchema(schema?.properties?.theme as JSONSchema),
//   }
// }
