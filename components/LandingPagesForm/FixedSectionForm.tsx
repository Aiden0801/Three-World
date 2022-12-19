import { useFormValue, useFixedSectionsConfig } from '../../lib/landing-pages'
import { SchemaViewer } from './SchemaViewer'
import { ParseObject } from '../../lib/landing-pages/parse-object'
import { useEffect } from 'react'
export function FixedSectionForm() {
  const [config, initial] = useFixedSectionsConfig()
  const formValue = useFormValue()
  console.log('initial', initial)
  useEffect(() => {
    if (initial != undefined && formValue.values.template.fixed == undefined)
      formValue.setFieldValue('template.fixed', initial)
  })
  return (
    <>
      <h2>FixedSection Config</h2>
      {/* <SchemaViewer title="Theme" schema={config} /> */}
      {formValue.values.template.fixed && ParseObject(config, formValue, 'template.fixed')}
    </>
  )
}
