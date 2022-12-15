import { openConfirmModal } from '@mantine/modals'

import { Badge, Box, Button, Card, Container, createStyles, Flex, Modal, Skeleton, Text } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { IconCheck, IconPlus } from '@tabler/icons'
import { useRouter } from 'next/router'
import React, { useCallback, useState } from 'react'
import useSWR from 'swr'
import { LinkButton } from '@/components/Button'
import { BASE_URL } from '@/config/constants'
import { fetcher } from '@/lib/fetcher'
import FadeIn from '@/utils/spring/FadeIn'

import { FormContextProvider } from '@/lib/landing-pages'
import {LandingPagesForm }from '@/components/LandingPagesForm'

const useStyles = createStyles((theme) => ({
  container: {
    position: 'relative',
    margin: '10px,10px,10px,10px',
    display: 'flex',
    flexDirection: 'column',
  },
}))

/**
 * fetches current projects list.
 * @dev Do we use the parameters? if not remove them.
 */
const fetchProjects = async (url: string, email: string) => {
   const data = await fetcher(`${BASE_URL.SERVER}/api/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
   })
   return data ? data : []
}
const useProjectData = () => {
  const { data, mutate, error, isValidating } = useSWR(['api/projects'], fetchProjects, { revalidateOnFocus: false })
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
  const [confirm, setConfirm] = useState(false)
  const { classes, theme } = useStyles()
  const router = useRouter()

  const handleOnSubmit = async (values) => {
    const response = await fetcher(`${BASE_URL.SERVER}/api/projects/createProject`, {
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
        message: 'New Project Created🤥',
      })
      // setOpened(false)
    }

    mutate()
    console.log(response)
  }
  const handleDeleteProject = useCallback(async (name: string) => {
    const response = await fetcher(`${BASE_URL.SERVER}/api/projects/deleteProject`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name,
      }),
    })
    if (response == 'Success') {
      showNotification({
        title: 'Success',
        autoClose: 2000,
        color: 'teal',
        icon: <IconCheck size={16} />,
        message: `Config ${name} Deleted🤥`,
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
          Are you sure you want to delete your project? This action is destructive and you will have to contact support
          to restore your data.
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
        closeOnEscape={false}
        onClose={() => {
          console.log('onClose')
          setOpened(false)
        }}>
        {
          <FormContextProvider baseUrl={BASE_URL.CLIENT}>
            <LandingPagesForm handleOnSubmit={handleOnSubmit} />
          </FormContextProvider>
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

      <Skeleton height={500} visible={projectData == undefined ? true : false}>
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
        {projectData && projectData.length == 0 && <Text>No</Text>}
      </Skeleton>
    </Container>
  )
}

export default Dashboard
