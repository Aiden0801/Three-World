import { z } from 'zod'

export function createZodTemplateSchema(jsonSchemaString: string) {
  let newSchema = `function(z) { return ${jsonSchemaString}}`
  var wrap = () => `{ return ${newSchema} };` //return the block having function expression
  var func = new Function(wrap())
  var obj: z.AnyZodObject = func.call(null).call(null, z)
  return obj
}
