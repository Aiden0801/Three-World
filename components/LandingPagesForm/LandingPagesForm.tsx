import { Card, Stack, Code, Button, TextInput, Affix, Transition } from '@mantine/core'
import { useFormValue, useGlobalConfig, useTemplateConfig, useTemplateSelection } from '../../lib/landing-pages'
import { useRef, useState } from 'react'
import { GlobalForm } from './GlobalForm'
import { SectionsForm } from './SectionsForm'
import { ThemeForm } from './ThemeForm'
import { useCallback } from 'react'
import { FixedSectionForm } from './FixedSectionForm'

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
              {/* <Card>
                <FixedSectionForm />
              </Card> */}
            </>
          )}
          <Button
            type="submit"
            // style={{ position: 'absolute', right: '50px', bottom: '50px' }}
          >
            Submit
          </Button>

          <Card>{submittedValues && <Code block>{submittedValues}</Code>}</Card>
        </Stack>
      </form>
    </>
  )
}

export default LandingPagesForm
