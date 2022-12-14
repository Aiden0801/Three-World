import { Card, Stack } from '@mantine/core'
import { useTemplateSelection } from '../../lib/landing-pages'

import { GlobalForm } from './GlobalForm'
import { SectionsForm } from './SectionsForm'
import { ThemeForm } from './ThemeForm'

export default function LandingPagesForm() {
  const { selectedTemplate } = useTemplateSelection()
  return (
    <>
      <h1>Form Demo</h1>
      <Stack spacing="md">
        <Card>
          <GlobalForm />
        </Card>
        {selectedTemplate && (
          <>
            <Card>
              <ThemeForm />
            </Card>
            {/* <Card>
              <SectionsForm showSchema />
            </Card> */}
          </>
        )}
      </Stack>
    </>
  )
}
