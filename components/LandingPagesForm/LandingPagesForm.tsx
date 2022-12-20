import { Card, Stack, Code, Button, TextInput, Affix, Transition } from '@mantine/core'
import { useFormValue, useGlobalConfig, useTemplateSelection } from '../../lib/landing-pages/global-form-context'
import { useEffect, useRef, useState } from 'react'
import { GlobalForm } from './GlobalForm'
import { SectionsForm } from './SectionsForm'
import { ThemeForm } from './ThemeForm'
import { useCallback } from 'react'
import { FixedSectionForm } from './FixedSectionForm'
import { TemplateContextProvider } from '@/lib/landing-pages/template-form-context'
import { BASE_URL } from '@/config/constants'
interface IPropsLandingPagesForm {
  handleOnSubmit?: (values: object) => void
}
export function LandingPagesForm({ handleOnSubmit }: IPropsLandingPagesForm) {
  const [templateName, setTemplateName] = useTemplateSelection()
  const [globalconfig, globalinit] = useGlobalConfig()
  const formValue = useFormValue()
  const [submittedValues, setSubmittedValues] = useState(null)
  useEffect(() => {}, [templateName])
  return (
    <>
      <form
        onSubmit={formValue.onSubmit((values) => {
          setSubmittedValues(JSON.stringify(values, null, 2))
          handleOnSubmit(values)
        })}>
        <Stack spacing="md">
          <Card>
            <TextInput required label="Business Name" {...formValue.getInputProps('name')} />
          </Card>
          <Card>
            <GlobalForm />
          </Card>
          {templateName && (
            <>
              <TemplateContextProvider baseUrl={BASE_URL.CLIENT} templateName={templateName}>
                <Card>
                  <ThemeForm />
                </Card>
                <Card>
                  <SectionsForm showSchema />
                  <FixedSectionForm />
                </Card>
              </TemplateContextProvider>
            </>
          )}
          <Button type="submit">Submit</Button>

          <Card>{submittedValues && <Code block>{submittedValues}</Code>}</Card>
        </Stack>
      </form>
    </>
  )
}

export default LandingPagesForm
