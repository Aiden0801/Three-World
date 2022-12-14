export function splitCamelCase(str: string) {
  return str.replace(/([a-z])([A-Z])/g, '$1 $2')
}
export function capitalize(str: string) {
  if (str == undefined) return 'undefined'
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function parseTitle(title: string) {
  return capitalize(splitCamelCase(title).toLowerCase())
}
