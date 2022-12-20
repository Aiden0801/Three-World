import { JSONSchema } from '@apidevtools/json-schema-ref-parser'
import { capitalize } from '../text-helpers'
import { determineComponent } from './determine-component'
import { AnyFormField } from './types'

/**
 * Partially parse a JSONSchema object into a FormField object that needs
 * further processing to determine optional extra properties based on the
 * component type (i.e. select, lists etc).
 * @param name Name of the field (i.e. the key in the properties object)
 * @param schema actual JSONSchema object to parse
 * @param requiredArray the parent required array (if any)
 * @returns Partial FormField object
 */
export function parseBaseProperties(name: string, schema: JSONSchema, requiredArray = []): AnyFormField {
  const component = determineComponent(schema)
  return {
    label: schema.title ?? capitalize(name),
    title: schema.title ?? name,
    isRequired: requiredArray.includes(name),
    placeholder: schema.description,
    // @ts-ignore -- this is a hack to get around the extra JSONSchema7 types
    // TODO: Address this properly
    type: schema.type,
    component,
  }
}
