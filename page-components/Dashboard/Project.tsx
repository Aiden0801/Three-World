import { Box, Button, Container, Text } from '@mantine/core'
import { IconArrowBack } from '@tabler/icons'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import CreateForm from '../../components/Form/CreateForm'
import { LandingPageSchema } from '../../config/2DLangingPageSchema'
import { serverURL } from '../../config/urlcontrol'
import { fetcher } from '../../lib/fetcher'
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
      const newData = await fetcher(
         'http://localhost:3000/api/projects/updateProject',
         {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
               data: values,
            }),
         }
      )
   }
   return (
      // <Suspense fallback={<div>Loading</div>}>
      <Container
         style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
         }}>
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
            <Button
               compact
               size="sm"
               leftIcon={<IconArrowBack size={18} stroke={1.5} />}
               color="orange"
               pr={20}
               onClick={() => {
                  router.push('./')
               }}>
               Back
            </Button>
         </Box>
         {loaded && !isLoading && (
            <CreateForm
               schema={LandingPageSchema}
               initialData={projectData}
               handleOnSubmit={handleOnSubmit}
            />
         )}
      </Container>
      // </Suspense>
   )
}

export default ProjectCofig
