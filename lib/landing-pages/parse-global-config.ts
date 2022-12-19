import { JSONSchema } from '@apidevtools/json-schema-ref-parser'
import { capitalize } from '../text-helpers'
import { isField } from './filters'
import { parseBaseProperties } from './parse-base-props'
import { AnyFormField } from './types'

/** This is the expected return type of the parsed global configuration */
export type GlobalConfig = {
  fields: AnyFormField[]
  //   title: FormField<'text'>
  //   description: FormField<'text'>
  //   template: FormField<'select'>
  // }
}

export function parseGlobalConfig(config: JSONSchema): GlobalConfig {
  const required_ = config.required as string[]
  const properties = config.properties as Record<string, JSONSchema>

  const mappedFields = Object.keys(properties).map((name) => {
    const prop = properties[name]
    const field = parseBaseProperties(name, prop, required_)
    /**
     * @dev for now we know we only get ONE select field in the global
     * configuration - the template - so don't currently bother with
     * checking all the other type of fields, as they should all be 'text'
     */
    if (isField(field, 'select')) {
      field.data =
        prop.enum?.map((option) => ({
          // TODO: these are coerced because they come up as JSONSchema7 types.
          // we need to do further validation
          label: capitalize(option as string),
          value: option as string,
        })) ?? []
    }
    return field
  })
  return { fields: mappedFields }
  // return { fields: Object.fromEntries(parsedEntries) }
}
