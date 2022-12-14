/**
 * Helper functions to parse a schema to a form configuration
 */
import { parseTitle } from "../text-helpers"

/**
 * Split and normalize the title of a schema
 * @param schema { title?: string } & any
 * @returns same object but with title normalized
 */
export function normalizeTitle(schema: any, as = 'title') {
  if ('title' in schema) {
    schema[as] = parseTitle(schema.title)
  }
  return schema
}

/**
 * Parses a schema to a form configuration for a select field for link
 * targets
 * @TODO: properly define the schema type
 * @param schema partial schema to parse
 * @returns form configuration
 */
export function anchorTarget(schema: any) {
  // property: { [key: string]: any }
  return {
    component: 'select',
    type: 'select', // TODO: revert to 'string' when the form supports component
    data: [
      // the field comes with the options already, but we just offer these
      // TODO: map the actual options to something? refactor the schema?
      { label: 'New Page', value: '_blank' },
      { label: 'Current page', value: '_self' },
      // { label: 'Whatever _parent was', value: '_parent' },
      // { label: 'Whatever _top was', value: '_top' },
    ],
    title: schema.title,
    label: 'Where should the link open?', // or directly the property name
    placeholder: 'Select one option',
  }
}

/**
 * Parses a schema to a form configuration for a theme color.
 * The colors are defined in the schema, so we just need to map them to
 * a select field.
 * TODO: create a custom comonent (with custom mapped name) to optionally
 * render the colors in the select
 */
export function themeColor(schema: any) {
  return {
    component: 'select',
    type: 'select', // TODO: revert to 'string' when the form supports component
    title: schema.title,
    label: 'Pick a color', // or directly the property name
    data: schema['anyOf'][1].enum
  }
}

export function genericColor(schema: any) {
  return {
    component: 'color',
    type: 'color', // TODO: revert to 'string' when the form supports component
    title: schema.title,
    label: 'Pick a color', // or directly the property name

  }
}

export function enumToSelect(schema: any) {
  const data = {
    component: 'select',
    data: schema.enum.map((value) => ({
      label: parseTitle(value as string),
      value,
    })),
    ...schema,
  }
  // we don't need the enum anymore, and it would cause infinite recursion
  // since we'd always end up here
  delete data.enum
  return data
}
