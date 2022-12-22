import type { JSONSchema } from "@apidevtools/json-schema-ref-parser"
import type { FormComponentType } from "./types"

/**
 * Given a JSONSchema object, determine the component type to use for the
 * form field.
 * @param prop JSONSchema object to determine the component type for
 * @returns th FormComponentType string to identify which component to use
 */
export  function determineComponent(prop: JSONSchema): FormComponentType {
  if (prop.enum) return 'select'
  switch (prop.type) {
    case 'boolean':
      return 'checkbox'
    case 'number':
      return 'number'
    case 'string':
      return 'text'
    case 'array':
      return 'list-group'
    case 'object':
      return 'link-group'
    default:
      return 'text'
  }
}
