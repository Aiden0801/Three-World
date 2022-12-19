import { useFormValue, useFixedSectionsConfig } from '../../lib/landing-pages'
import { SchemaViewer } from './SchemaViewer'
import { ParseObject } from '../../lib/landing-pages/parse-object'
import { useEffect } from 'react'
export function FixedSectionForm() {
  const [config, initial] = useFixedSectionsConfig()
  const formValue = useFormValue()
  return (
    <>
      <h2>FixedSection Config</h2>
      {/* <SchemaViewer title="Theme" schema={config} /> */}
      {initial && ParseObject(config, formValue, 'template.fixed')}
    </>
  )
}
