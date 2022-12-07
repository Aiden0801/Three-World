import $RefParser, { JSONSchema } from '@apidevtools/json-schema-ref-parser'
import { showNotification } from '@mantine/notifications'
import {
   Badge,
   Box,
   Button,
   Card,
   Checkbox,
   Code,
   Container,
   createStyles,
   Flex,
   Modal,
   NativeSelect,
   NumberInput,
   Select,
   Skeleton,
   Text,
   TextInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconPlus, IconTrash, IconCheck } from '@tabler/icons'
import { Draft07 } from 'json-schema-library'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'
import useSWR from 'swr'
import { LandingPageSchema } from '../../config/2DLangingPageSchema'
import { serverURL } from '../../config/urlcontrol'
import { fetcher } from '../../lib/fetcher'
import CreateForm from '../../components/Form/CreateForm'
import FadeIn from '../../utils/spring/FadeIn'
const useStyles = createStyles((theme) => ({
   container: {
      position: 'relative',
      margin: '10px,10px,10px,10px',
      display: 'flex',
      flexDirection: 'column',
   },
}))

const fetchProjects = async (url: string, email: string) => {
   const data = await fetcher(`${serverURL}/api/projects/getProjects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
   })
   return data ? data : []
}
const useProjectData = () => {
   const { data, mutate, error, isValidating } = useSWR(
      ['api/projects/getProjects'],
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

const Dashboard: React.FC = () => {
   const { data: projectData, isLoading, isError, mutate } = useProjectData()
   const [opened, setOpened] = useState(false)
   const { classes, theme } = useStyles()
   const router = useRouter()
   useEffect(() => {
      console.log(projectData)
   }, [])
   const handleOnSubmit = async (values) => {
      const response = await fetcher(
         `${serverURL}/api/projects/createProject`,
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
            message: 'New Project Created🤥',
         })
         setOpened(false)
      }

      console.log(response)
   }

   return (
      // <Suspense fallback={<div>Loading</div>}>
      <Container
         mt="xl"
         style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
         }}>
         <Modal
            transition="fade"
            transitionDuration={600}
            size="80%"
            opened={opened}
            title="Create Project"
            onClose={() => {
               console.log('onClose')
               setOpened(false)
            }}>
            <CreateForm
               schema={LandingPageSchema}
               handleOnSubmit={handleOnSubmit}
            />
         </Modal>
         <Box
            sx={(theme) => ({
               display: 'flex',
               justifyContent: 'space-between',
               align: 'center',
               alignItems: 'center',
               marginBottom: '20px',
            })}>
            <Text>Projects</Text>

            <Button
               compact
               onClick={() => {
                  setOpened(true)
               }}
               color="blue"
               pr={12}>
               <Text
                  sx={{
                     [theme.fn.smallerThan('md')]: {
                        display: 'none',
                     },
                  }}>
                  New
               </Text>
               <IconPlus size={20} stroke={1.5} />
            </Button>
         </Box>

         <Skeleton
            height={500}
            visible={projectData == undefined ? true : false}>
            {projectData &&
               projectData.map((item, index) => (
                  <FadeIn key={index} delayTime={index * 300} from="right">
                     <Card withBorder shadow="sm" key={index} mt="sm">
                        <Badge>Name</Badge>
                        <Flex justify="space-between" align="center">
                           <Text>{item.name}</Text>
                           <Button
                              variant="light"
                              color="blue"
                              mt="md"
                              size="xs"
                              radius="md"
                              onClick={() => {
                                 router.push(`/dashboard/${item.name}`)
                              }}>
                              Edit now
                           </Button>
                        </Flex>
                     </Card>
                  </FadeIn>
               ))}
         </Skeleton>
      </Container>
   )
}

export default Dashboard
