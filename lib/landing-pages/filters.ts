import { SchemaViewer } from '@/components/LandingPagesForm/SchemaViewer'
import { JSONSchema } from '@apidevtools/json-schema-ref-parser'
import { FormComponentType, FormField, AnyFormField } from './types'

type Schema = JSONSchema
export function isArrayOfEnum(schema: Schema) {
  return schema.type && schema.type === 'array' && schema.items.hasOwnProperty('anyOf')
}
export function isObject(schema: Schema): schema is Schema & { type: 'object' } {
  return schema.type && schema.type === 'object'
}
export function isArray(schema: Schema): schema is Schema & { items: Schema[] } {
  return schema.type && schema.type === 'array'
}
/**
 * Checks a parsed form field against a specified component type.
 * This is mainly for type narrowing during the parsing process.
 * but can be used to check if a field is of a specific type in other places too.
 * @param field Field to check
 * @param component what form component type to check for
 * @returns typed field if the field is of the specified component type
 */
export function isField<T extends FormComponentType>(field: AnyFormField, component: T): field is FormField<T> {
  return field.component === component
}

export function isAnchorTarget(schema: Schema) {
  /**
   * @dev this COULD be improved by checking only the parent object
   * and see if it has a `href`, `target`, and `title` properties. these could
   * change though, so it's probably best to also check the (eventual) enum values
   * in the target field.
   */
  return (
    schema.hasOwnProperty('anyOf') &&
    schema['anyOf'].length == 2 &&
    schema['anyOf'][1].hasOwnProperty('enum') &&
    schema['anyOf'][1]['enum'].length == 4
  )
}

export function isThemeColor(schema: Schema) {
  return (
    schema.hasOwnProperty('anyOf') &&
    schema['anyOf'].length == 2 &&
    schema['anyOf'][1].hasOwnProperty('enum') &&
    schema['anyOf'][1]['enum'].length == 14
  )
}

export function isEnum(schema: Schema): schema is Schema & { enum: string[] } {
  return schema.hasOwnProperty('enum')
}

export function isSelect(schema: Schema) {
  return schema.hasOwnProperty('anyOf')
}

export function isRequired(key: string, schema: Schema) {
  return !!schema.required && Array.isArray(schema.required) && schema.required.includes(key)
}
