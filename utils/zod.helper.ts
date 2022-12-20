import { parseSchema as parseSchemaToObject } from '@/lib/landing-pages'
import { parseSchema } from 'json-schema-to-zod'
import { z } from 'zod'

export const convertJsonSchemaToZod = (schema: any) => {
  const zodschema = parseSchema(schema)
  let newSchema = 'function(z) { return ' + zodschema + '}'
  var wrap = () => '{ return ' + newSchema + ' };' //return the block having function expression
  var func = new Function(wrap())
  var obj = func.call(null).call(null, z)
  return obj
}
