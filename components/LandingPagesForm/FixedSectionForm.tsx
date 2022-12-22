import { useFormValue, useFixedSectionsConfig, useConfigData } from '../../lib/landing-pages'
import { SchemaViewer } from './SchemaViewer'
import { ParseObject } from '../../lib/landing-pages/parse-object'
import { useEffect } from 'react'
export function FixedSectionForm() {
  const [config, initial] = useFixedSectionsConfig()
  const formValue = useFormValue()
  const configData = useConfigData()
  useEffect(() => {
    if (initial != undefined && configData == undefined) formValue.setFieldValue('template.fixed', initial)
  }, [initial])
  return (
    <>
      {/* <SchemaViewer title="Theme" schema={config} /> */}
      {formValue.values.template.fixed && (
        <>
          <h2>FixedSection Config</h2>
          {config.fields?.map((value, index) => {
            return ParseObject(value, formValue, `template.fixed.${value.title}`)
          })}
        </>
      )}
    </>
  )
}
