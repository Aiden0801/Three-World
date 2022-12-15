import { Card, Stack, Code, Button, TextInput } from '@mantine/core'
import { useFormValue, useGlobalConfig, useTemplateConfig, useTemplateSelection } from '../../lib/landing-pages'
import { useState } from 'react'
import { GlobalForm } from './GlobalForm'
import { SectionsForm } from './SectionsForm'
import { ThemeForm } from './ThemeForm'
interface IPropsLandingPagesForm {
  handleOnSubmit?: (values: object) => void
}
export function LandingPagesForm({ handleOnSubmit }: IPropsLandingPagesForm) {
  const { selectedTemplate } = useTemplateSelection()
  const [globalconfig, globalinit] = useGlobalConfig()
  const formValue = useFormValue()
  const [submittedValues, setSubmittedValues] = useState(null)
  return (
    <>
      <form
        onSubmit={formValue.onSubmit((values) => {
          console.log(values)
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
          {selectedTemplate && (
            <>
              <Card>
                <ThemeForm />
              </Card>
              <Card>
                <SectionsForm showSchema />
              </Card>
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
