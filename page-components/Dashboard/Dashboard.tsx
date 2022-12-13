import { openConfirmModal } from '@mantine/modals'

import {
   Badge,
   Box,
   Button,
   Card,
   Container,
   createStyles,
   Flex,
   Modal,
   Skeleton,
   Text,
} from '@mantine/core'
import { clientAppURL } from '../../config/urlcontrol'
import { showNotification } from '@mantine/notifications'
import { IconCheck, IconPlus } from '@tabler/icons'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState, useMemo } from 'react'
import useSWR from 'swr'
import { CreateFormFromConfigObject } from '../../components/Form/CreateForm'
import {
   LandingPageSchema,
   TwoDLandingPageSchema,
} from '../../config/2DLangingPageSchema'
import { IPropsschemaObject } from '../../utils/parser/schma_parser'
import { serverURL } from '../../config/urlcontrol'
import { fetcher } from '../../lib/fetcher'
import FadeIn from '../../utils/spring/FadeIn'
import { useGlobalConfig } from '../../utils/parser/globalconfig'
import { useTemplateConfig } from '../../utils/parser/templateconfig'
import $RefParser from '@apidevtools/json-schema-ref-parser'
import { HTMLAttributeAnchorTarget } from 'react'
import Link from 'next/link'
import { LinkButton } from '../../components/Button'
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
   // const templateConfig = useTemplateConfig('AAA', 'BBB')
   // const globalConfig = useGlobalConfig('A')
   useEffect(() => {
      // test()
   }, [])
   const test = async () => {
      // let schema = await $RefParser.dereference(figma)
      // console.log(schema)
   }
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

      mutate()
      console.log(response)
   }
   const handleDeleteProject = useCallback(async (name: string) => {
      const response = await fetcher(
         `${serverURL}/api/projects/deleteProject`,
         {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
               name: name,
            }),
         }
      )
      if (response == 'Success') {
         showNotification({
            title: 'Success',
            autoClose: 2000,
            color: 'teal',
            icon: <IconCheck size={16} />,
            message: 'Project Deleted🤥',
         })
         mutate()
      } else
         showNotification({
            title: 'Failed',
            autoClose: 2000,
            color: 'red',
            icon: <IconCheck size={16} />,
            message: 'Project Deletion Cancled🤥',
         })
   }, [])
   const openDeleteModal = useCallback((name) => {
      openConfirmModal({
         title: 'Delete your project',
         centered: true,
         children: (
            <Text size="sm">
               Are you sure you want to delete your project? This action is
               destructive and you will have to contact support to restore your
               data.
            </Text>
         ),
         labels: { confirm: 'Delete Project', cancel: "No don't delete it" },
         confirmProps: { color: 'red' },
         onCancel: () => {
            showNotification({
               title: 'Alert',
               autoClose: 2000,
               color: 'cyan',
               message: 'Cancled Project delete',
            })
         },
         onConfirm: () => handleDeleteProject(name),
      })
   }, [])
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
            {
               <CreateFormFromConfigObject
                  url={clientAppURL}
                  handleOnSubmit={handleOnSubmit}
               />
            }
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
                           <Button.Group>
                              <LinkButton
                                 variant="light"
                                 color="blue"
                                 mt="md"
                                 size="xs"
                                 radius="md"
                                 href={`/dashboard/${item.name}`}>
                                 Edit
                              </LinkButton>
                              <Button
                                 variant="light"
                                 color="red"
                                 mt="md"
                                 size="xs"
                                 radius="md"
                                 onClick={() => openDeleteModal(item.name)}>
                                 Delete
                              </Button>
                           </Button.Group>
                        </Flex>
                     </Card>
                  </FadeIn>
               ))}
         </Skeleton>
      </Container>
   )
}

export default Dashboard
