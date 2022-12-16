import { useFormValue, useThemeConfig } from '../../lib/landing-pages'
import { SchemaViewer } from './SchemaViewer'
import { ParseObject } from '../../lib/landing-pages/parse-object'
import { useEffect } from 'react'
export function ThemeForm() {
  const [config, initial] = useThemeConfig()
  const formValue = useFormValue()
  return (
    <>
      <h2>Theme Config</h2>
      {/* <SchemaViewer title="Theme" schema={config} /> */}
      {ParseObject(config, formValue, 'template.theme')}
    </>
  )
}
