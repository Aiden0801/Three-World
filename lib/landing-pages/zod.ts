import { z } from 'zod'

export function createTemplateSchema(jsonSchemaString: string) {
  let newSchema = `function(z) { return ${jsonSchemaString}}`
  var wrap = () => `{ return ${newSchema} };` //return the block having function expression
  var func = new Function(wrap())
  var obj: z.AnyZodObject = func.call(null).call(null, z)
  return obj
}

// workaround to get the actual type of the zod schema section containing the
// sections. This maps directly to what the zod object in web-landing repo is.
const _sections = z.object({
  sections: z.discriminatedUnion('component', [
    z.object({ component: z.literal('section_name'), config: z.object({}) }),
  ]),
})

export function getSectionsList(schema: typeof _sections): string[] {
  try {
    return schema.shape.sections.options.map(
      (section) => section.shape.component.value
    )
  } catch (error) {
    console.error('error', error)
    return []
  }
}
export function getSectionsConfiguration(schema: typeof _sections) {
  try {
    return schema.shape.sections.options.map((section) => section.shape.config)
  } catch (error) {
    console.error('error', error)
    return []
  }
}
export function getSectionConfiguration<Shape extends typeof _sections>(
  schema: Shape,
  name: string
) {
  try {
    return schema.shape.sections.options.find(
      (section) => section.shape.component.value === name
    )?.shape.config ?? {}
  } catch (error) {
    console.error('error', error)
    return {}
  }
}
