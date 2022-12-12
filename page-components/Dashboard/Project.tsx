import { Box, Button, Container, Skeleton, Text } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { IconArrowBack, IconCheck } from '@tabler/icons'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { Suspense, useEffect, useState } from 'react'
import useSWR from 'swr'
import { CreateFormFromConfigObject } from '../../components/Form/CreateForm'
import { LinkButton } from '../../components/Button'
import { LandingPageSchema } from '../../config/2DLangingPageSchema'
import { serverURL } from '../../config/urlcontrol'
import { fetcher } from '../../lib/fetcher'
import { clientAppURL } from '../../config/urlcontrol'
const fetchProjects = async (url: string, name: string) => {
   console.log('fetch', name)
   const data = await fetcher(
      `${serverURL}/api/projects/${name}/websiteconfig`,
      {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
      }
   )
   return data ? data : []
}
const useProjectData = (projectName) => {
   console.log('use', projectName)
   const { data, mutate, error, isValidating } = useSWR(
      ['api/projects/getProjects', projectName],
      fetchProjects,
      { revalidateOnFocus: false }
   )
   return {
      data: data,
      isLoading: (!error && !data) || isValidating,
      isError: error,
      mutate: mutate,
   }
}
const ProjectCofig = ({ projectName }) => {
   const { data: session, status } = useSession()
   //    const [refs, setRefs] = useState<$RefParser.$Refs>(null)

   //    const [schema, setSchema] = useState<JSONSchema>()
   const [loaded, setLoaded] = useState(false)
   const router = useRouter()
   const {
      data: projectData,
      isLoading,
      isError,
      mutate,
   } = useProjectData(projectName)
   useEffect(() => {
      test()
   }, [])
   const test = async () => {
      //   let test = await $RefParser.dereference(LandingPageSchema)
      //   setSchema(test)
      //   console.log(test)
      setLoaded((o) => true)
   }
   const handleOnSubmit = async (values) => {
      console.log('handleOnSubmit', values)
      const response = await fetcher(
         `${serverURL}/api/projects/updateProject`,
         {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
               data: values,
            }),
         }
      )
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
                  Edit Project
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
            {console.log('data', projectData)}
            {projectData && (
               <CreateFormFromConfigObject
                  url={clientAppURL}
                  savedData={projectData}
               />
            )}
            {projectData == undefined && (
               <Skeleton visible={true} height={500}></Skeleton>
            )}
         </>
      </Container>
      // </Suspense>
   )
}

export default ProjectCofig
