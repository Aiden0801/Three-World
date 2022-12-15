import { Box, Container, Skeleton, Text } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { IconArrowBack, IconCheck } from '@tabler/icons'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

import { LinkButton } from '@/components/Button'
import { BASE_URL } from '@/config/constants'

import { fetcher } from '@/lib/fetcher'
import { FormContextProvider } from '@/lib/landing-pages'
import { LandingPagesForm } from '@/components/LandingPagesForm'

// const fetchProjects = async (url: string, name: string) => {
//   console.log('fetch', name)
//   /** @vlad FIX: I think the url is changed now? no websiteconfig but landing-page? */
//   const data = await fetcher(`${BASE_URL.SERVER}/api/projects/${name}/websiteconfig`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//   })
//   return data ? data : []
// }
// const useProjectData = (projectName) => {
//   console.log('use', projectName)
//   const { data, mutate, error, isValidating } = useSWR(['api/projects', projectName], fetchProjects, {
//     revalidateOnFocus: false,
//   })
//   return {
//     data: data,
//     isLoading: (!error && !data) || isValidating,
//     isError: error,
//     mutate: mutate,
//   }
// }
const ProjectCofig = ({ projectName, configData }) => {
  const { data: session, status } = useSession()
  //    const [refs, setRefs] = useState<$RefParser.$Refs>(null)

  //    const [schema, setSchema] = useState<JSONSchema>()
  const router = useRouter()
  // const { data: configData } = useProjectData(projectName)
  console.log(configData)

  const handleOnSubmit = async (values) => {
    console.log('handleOnSubmit', values)
    const response = await fetcher(`${BASE_URL.SERVER}/api/projects/updateProject`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: values,
      }),
    })
    if (response == 'Success') {
      showNotification({
        title: 'Success',
        autoClose: 2000,
        color: 'teal',
        icon: <IconCheck size={16} />,
        message: 'Project Configuration Updated🤥',
      })
    }
  }
  return (
    // <Suspense fallback={<div>Loading</div>}>

    <Container
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
      }}>
      <>
        <Box
          sx={(theme) => ({
            display: 'flex',
            justifyContent: 'space-between',
            align: 'center',
            alignItems: 'center',
            marginTop: '30px',
          })}>
          <Text
            component="span"
            variant="gradient"
            gradient={{ from: 'indigo', to: 'green', deg: 0 }}
            weight={700}
            style={{
              fontFamily: 'Greycliff CF, sans-serif',
              fontSize: '30px',
            }}>
            {projectName}
          </Text>
          <LinkButton
            compact
            size="sm"
            leftIcon={<IconArrowBack size={18} stroke={1.5} />}
            color="orange"
            pr={20}
            href="./">
            Back
          </LinkButton>
        </Box>
        {configData && (
          <FormContextProvider baseUrl={BASE_URL.CLIENT} configData={configData}>
            <LandingPagesForm handleOnSubmit={handleOnSubmit} />
          </FormContextProvider>
        )}
        {configData == undefined && <Skeleton visible={true} height={500}></Skeleton>}
      </>
    </Container>
    // </Suspense>
  )
}

export default ProjectCofig
