import { useConfigData, useFormValue, useThemeConfig } from '../../lib/landing-pages'
import { SchemaViewer } from './SchemaViewer'
import { ParseObject } from '../../lib/landing-pages/parse-object'
import { useEffect } from 'react'
import logger from '@/utils/logger'
export function ThemeForm() {
  const [config, initial] = useThemeConfig()
  const formValue = useFormValue()
  const configData = useConfigData()
  useEffect(() => {
    if (initial != undefined && configData == undefined) formValue.setFieldValue('template.theme', initial)
  }, [initial])
  return (
    <>
      <h2>Theme Config</h2>
      {/* <SchemaViewer title="Theme" schema={config} /> */}
      {formValue.values.template.theme && ParseObject(config, formValue, 'template.theme')}
    </>
  )
}
