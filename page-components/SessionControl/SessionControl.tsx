import React, { useCallback, useEffect, useState } from 'react'
import { XOctagonFill } from 'react-bootstrap-icons'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'
import {
   Button,
   Container,
   createStyles,
   LoadingOverlay,
   Modal,
   ScrollArea,
   SimpleGrid,
   Table,
   Text,
   Textarea,
   TextInput,
   Group,
   Grid,
   Paper,
   Skeleton,
   Box,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import {
   IconActivity,
   IconListDetails,
   IconPlus,
   IconPoint,
   IconSearch,
} from '@tabler/icons'

import { fetcher } from '../../lib/fetcher'
const BREAKPOINT = '@media (max-width: 755px)'
const useStyles = createStyles((theme) => ({
   container: {
      position: 'relative',
      margin: '10px,10px,10px,10px',
      display: 'flex',
      flexDirection: 'column',
   },
}))
/**
 * * fetches data with the api
 * @param url
 * @param email
 * @returns
 */
const fetchSessionData = async (url: string, email: string) => {
   const session_data = await fetcher('api/session/getControlSession', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
         creator: email,
      }),
   })
   return session_data ? session_data.user : []
}
/***
 * * Custom Hook for useSWR
 * ? There mighe be more easier wway?
 */
const useControlSession = (email: string) => {
   const { data, mutate, error, isValidating } = useSWR(
      ['api/session/getControlSession', email],
      fetchSessionData,
      { revalidateOnFocus: false }
   )

   return {
      data: data ? data : [],
      isLoading: (!error && !data) || isValidating,
      isError: error,
      mutate: mutate,
   }
}

const SessionControl = () => {
   const { data: session, status } = useSession()
   const [opened, setOpened] = useState(false)
   const [isHandling, setIsHandling] = useState(false)
   const { classes, theme } = useStyles()
   const { data, isLoading, isError, mutate } = useControlSession(
      session.user.email
   )

   const form = useForm({
      initialValues: {
         name: '',
         description: '',
      },
      validate: {
         name: (value) => (value.length < 1 ? 'Name Field Required' : null),
         description: (value) =>
            value.length < 1 ? 'Description Field Required' : null,
      },
   })

   /*
    * hello world
    * */
   const handleCreateNewSession = useCallback(
      async (values) => {
         setOpened(false)
         const { name, description } = values
         setIsHandling(true)
         const response = await fetcher('/api/session/createSession', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
               sessionName: name,
               creator: session.user.email,
               sessionDescription: description,
            }),
         })
         mutate()
         setIsHandling(false)
      },
      [mutate]
   )
   const handleActivateSession = useCallback(
      async (_id) => {
         console.log(_id)
         setIsHandling(true)
         const response = await fetcher('/api/session/activateSessionByID', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
               creator: session.user.email,
               _id: _id,
            }),
         })
         mutate()
         setIsHandling(false)
      },
      [mutate]
   )
   const handleDeleteSession = useCallback(
      async (_id) => {
         console.log(_id)
         setIsHandling(true)
         const response = await fetcher('/api/session/deleteSessionByID', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
               _id: _id,
            }),
         })
         mutate()
         setIsHandling(false)
      },
      [mutate]
   )
   const handleKillSession = useCallback(
      async (_id) => {
         console.log(_id)
         setIsHandling(true)
         const response = await fetcher('/api/session/killSessionByID', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
               _id: _id,
            }),
         })
         mutate()
         setIsHandling(false)
      },
      [mutate]
   )
   return (
      <Container mt="xl" className={classes.container}>
         {/* <LoadingOverlay
            visible={isLoading || isHandling}
            overlayBlur={2}></LoadingOverlay> */}
         <Modal
            title="Create New Session"
            opened={opened}
            onClose={() => setOpened(false)}
            overlayColor={
               theme.colorScheme === 'dark'
                  ? theme.colors.dark[9]
                  : theme.colors.gray[2]
            }
            overlayOpacity={0.55}
            overlayBlur={3}>
            <Text>Modal with size auto will fits its content</Text>
            <form
               onSubmit={form.onSubmit((values) =>
                  handleCreateNewSession(values)
               )}>
               <SimpleGrid cols={1}>
                  <TextInput
                     placeholder="Name"
                     label="Session Name"
                     withAsterisk
                     {...form.getInputProps('name')}
                  />
                  <Textarea
                     placeholder="Description"
                     label="Description"
                     withAsterisk
                     {...form.getInputProps('description')}
                  />
                  <Button type="submit" radius="md" size="md">
                     Create Now
                  </Button>
               </SimpleGrid>
            </form>
         </Modal>
         <Paper shadow="md" p="xl">
            <Box
               sx={(theme) => ({
                  display: 'flex',
                  justifyContent: 'space-between',
                  align: 'center',
                  alignItems: 'center',
               })}>
               <Text
                  component="span"
                  align="center"
                  variant="gradient"
                  gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
                  weight={700}
                  style={{
                     fontFamily: 'Greycliff CF, sans-serif',
                     fontSize: '30px',
                  }}>
                  Sessions
               </Text>
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
            <Text mb={20} span>
               Create a new Session and share it with friends!
            </Text>
            <TextInput
               placeholder="Search"
               mb={10}
               icon={<IconSearch size={14} radius="md" />}
            />
            <ScrollArea>
               <Skeleton visible={isLoading || isHandling}>
                  <Table
                     withBorder
                     striped
                     withColumnBorders
                     sx={{ minWidth: 800 }}
                     verticalSpacing="xs">
                     <thead>
                        <tr>
                           {/* <th style={{ width: 40 }}>
                                    <Checkbox
                                        onChange={toggleAll}
                                        checked={selection.length === data.length}
                                        indeterminate={selection.length > 0 && selection.length !== data.length}
                                        transitionDuration={0}
                                    />
                                </th> */}
                           <th>Name</th>
                           <th>Users</th>
                           <th>Active</th>
                           <th>Actions</th>
                        </tr>
                     </thead>
                     <tbody>
                        {data.map((session, index) => {
                           // const selected = selection.includes(session._id);
                           return (
                              <tr key={index}>
                                 {/* <td>
                                            <td>
                                                <Checkbox
                                                    checked={selection.includes(session._id)}
                                                    onChange={() => toggleRow(session._id)}
                                                    transitionDuration={0}
                                                />
                                            </td>
                                        </td> */}
                                 <td>{session.name}</td>
                                 <td>
                                    {session.users.length == 0
                                       ? 'No Available Users'
                                       : session.users.length + ' Users'}
                                 </td>
                                 <td>
                                    <Group>
                                       <IconPoint
                                          color={
                                             session.isActive ? 'green' : 'red'
                                          }
                                          size={24}
                                       />
                                       {session.isActive == true
                                          ? 'Active'
                                          : 'Dead'}
                                    </Group>
                                 </td>
                                 <td width={200}>
                                    <div
                                       style={{
                                          display: 'flex',
                                          alignItems: 'center',
                                          justifyContent: 'center',
                                       }}>
                                       <Button
                                          onClick={() => {
                                             session.isActive
                                                ? handleKillSession(session._id)
                                                : handleActivateSession(
                                                     session._id
                                                  )
                                          }}
                                          color={
                                             session.isActive ? 'red' : 'green'
                                          }
                                          variant="subtle">
                                          <IconActivity />
                                       </Button>
                                       <Button
                                          color="indigo"
                                          component="a"
                                          href={`./sessions/${session._id}`}
                                          variant="subtle">
                                          <IconListDetails />
                                       </Button>

                                       <Button
                                          onClick={() =>
                                             handleDeleteSession(session._id)
                                          }
                                          color="orange"
                                          variant="subtle">
                                          <XOctagonFill />
                                       </Button>
                                    </div>
                                 </td>
                              </tr>
                           )
                        })}
                     </tbody>
                  </Table>
               </Skeleton>
            </ScrollArea>
         </Paper>
      </Container>
   )
}

export default SessionControl
