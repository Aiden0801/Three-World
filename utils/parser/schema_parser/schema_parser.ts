import { Schema } from 'mongoose'
export type IPropsschemaObject = {
   title?: string
   type?: any
   items?: any
   data?: any
   enum?: any
   description?: string
   placeholder?: string
   label?: string
   component?: string
   fields?: Array<any>
   isRequired?: boolean
   _isSelect?: boolean
   _isEnum?: boolean
   _isArray?: boolean
   _isMutipleField?: boolean
}
/**
 * 
 type can be
 * ? string | number | boolean | select | group
 */

function parseLinkTarget(schema) {
   // property: { [key: string]: any }
   return {
      type: 'string',
      // data: [
      //    { label: 'New Page', value: '_blank' },
      //    { label: 'This page', value: '_self' },
      //    { label: 'Whatever _parent was', value: '_parent' },
      //    { label: 'Whatever _top was', value: '_top' },
      // ],
      title: schema.title,
      label: 'Where should we open this', // or directly the property name
   }
}
function parseColor(schema) {
   // property: { [key: string]: any }
   return {
      type: 'color',
      // data: [
      //    { label: 'New Page', value: '_blank' },
      //    { label: 'This page', value: '_self' },
      //    { label: 'Whatever _parent was', value: '_parent' },
      //    { label: 'Whatever _top was', value: '_top' },
      // ],
      title: schema.title,
      label: 'Where should we open this', // or directly the property name
   }
}
export const ParseSchema = (schema) => {
   let result: IPropsschemaObject = {}
   if (schema.description) result.description = schema.description
   if (schema.title) result.title = schema.title
   // ! HTMLAttributeAnchorTarget
   if (
      schema.hasOwnProperty('anyOf') &&
      schema['anyOf'].length == 2 &&
      schema['anyOf'][1].hasOwnProperty('enum') &&
      schema['anyOf'][1]['enum'].length == 4
   ) {
      return parseLinkTarget(schema)
   }
   // ! ThemeColor
   if (
      schema.hasOwnProperty('anyOf') &&
      schema['anyOf'].length == 2 &&
      schema['anyOf'][1].hasOwnProperty('enum') &&
      schema['anyOf'][1]['enum'].length == 14
   ) {
      return parseColor(schema)
   }

   if (schema.hasOwnProperty('anyOf')) {
      result._isSelect = true
      result.data = schema.anyOf
      return result
   }
   if (schema.hasOwnProperty('enum')) {
      // result = schema
      result.type = 'select'
      result._isEnum = true
      result.data = schema.enum
      delete result.enum
      return result
   }
   switch (schema.type) {
      case 'string':
      case 'number':
      case 'boolean':
         return schema
      case 'array':
         result.item = ParseSchema(schema.items)
         result.type = 'array'
         result._isArray = true
         return result
      case 'object':
         result.fields = []
         Object.keys(schema.properties).forEach((value, index) => {
            const parseResult = ParseSchema(schema.properties[`${value}`])
            result.fields.push(parseResult)
         })
         result.type = 'group'
         result._isMutipleField = true
         return result
      default:
         return { title: schema.title, type: 'unknown' }
   }
}
export const getInitialValue = (object: IPropsschemaObject) => {
   let result = {}
   switch (object.type) {
      case 'string':
         return ''
      case 'number':
         return 0
      case 'boolean':
         return false
      case 'color':
         return 'dark'
      case 'select':
         return object.data[0]
      case 'array':
         result[`${object.title}`] = []
         return []
      case 'group':
         object.fields.forEach((item, index) => {
            let temp = getInitialValue(item)
            result[`${item.title}`] = temp
         })
         return result
      default:
         return result
   }
   return result
}
