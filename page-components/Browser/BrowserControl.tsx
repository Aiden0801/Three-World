import React, { useState, useEffect } from 'react'
import {
   ScrollArea,
   Table,
   LoadingOverlay,
   createStyles,
   Container,
   Group,
   ActionIcon,
   Footer,
   Button,
   Modal,
   Text,
   TextInput,
   SimpleGrid,
   Textarea,
   Divider,
   Skeleton,
} from '@mantine/core'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { ModalsProvider } from '@mantine/modals'
import { openConfirmModal } from '@mantine/modals'
import { useSession } from 'next-auth/react'
import { fetcher } from '../../lib/fetcher'
import { IconGripVertical } from '@tabler/icons'

import useSWR from 'swr'
import styled from 'styled-components'
const Item = styled.tr

const useStyles = createStyles((theme) => ({
   container: {
      left: '200px',
      margin: '10px,10px,10px,10px',
      marginTop: '20px',
   },
}))

const fetchBrowserData = async (url: string, email: string) => {
   const session_data = await fetcher(
      'http://localhost:3000/api/users/getBrowsersByEmail',
      {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
            email: email,
         }),
      }
   )
   console.log(session_data.browsers)
   return session_data ? session_data.browsers : []
}
const useBrowserData = (email: string) => {
   const { data, mutate, error, isValidating } = useSWR(
      ['browser', email],
      fetchBrowserData,
      { revalidateOnFocus: false }
   )
   return {
      data: data,
      isLoading: (!error && !data) || isValidating,
      isError: error,
      mutate: mutate,
   }
}

const fetchSessionData = async (url: string, email: string) => {
   console.log('fetchSessionData', email)
   const session_data = await fetcher(
      'http://localhost:3000/api/session/getAvailableSessions',
      {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
            email: email,
         }),
      }
   )
   console.log(session_data)
   return session_data ? session_data.user : []
}
const useSessionData = (email: string) => {
   const { data, mutate, error, isValidating } = useSWR(
      ['session', email],
      fetchSessionData,
      { revalidateOnFocus: false }
   )
   return {
      data: data,
      isLoading: (!error && !data) || isValidating,
      isError: error,
      mutate: mutate,
   }
}
export default function BrowserControl() {
   const { data: session, status } = useSession()
   const { classes, theme } = useStyles()
   const [email, setEmail] = useState('')
   const [isBrowser, setIsBrowser] = useState(false)

   const [isHandling, setIsHandling] = useState(false)

   const {
      data: browser_data,
      mutate: mutateB,
      isError: isErrorB,
      isLoading: isLoadingB,
   } = useBrowserData(email)
   const {
      data: session_data,
      mutate: mutateS,
      isError: isErrorS,
      isLoading: isLoadingS,
   } = useSessionData(email)
   const openModal = (session_id, browser_id) =>
      openConfirmModal({
         title: 'Please confirm your action',
         children: (
            <Text size="sm">
               Do you want to set the SESSION {session_id} to the Browser{' '}
               {browser_id}?
            </Text>
         ),
         labels: { confirm: 'Confirm', cancel: 'Cancel' },
         onConfirm: () => handleSetSessionToBrowser(session_id, browser_id),
         onCancel: () => console.log('Canceld'),
      })
   const handleSetSessionToBrowser = async (session_id, browser_id) => {
      setIsHandling(true)
      const data = await fetcher(
         'http://localhost:3000/api/session/setSessiontoBrowser',
         {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
               email: session.user.email,
               _id: session_id,
               bIndex: browser_id,
            }),
         }
      )
      console.log(data)
      setIsHandling(false)
   }
   const handleOnDragEnd = (result) => {
      if (!result.destination) return
      if (result.destination.droppableId !== 'sessions')
         openModal(result.draggableId, result.destination.droppableId)
      console.log(result)
   }
   useEffect(() => {
      if (typeof window !== 'undefined') {
         {
            console.log('AAA')
            setIsBrowser(true)
         }
      }
   }, [])
   useEffect(() => {
      if (status == 'authenticated') {
         setEmail(session.user.email)
      }
      console.log(status)
   }, [status])
   return (
      <ModalsProvider>
         <div className={classes.container}>
            {isBrowser ? (
               <Container style={{}}>
                  {/* <LoadingOverlay
                     visible={isHandling}
                     overlayBlur={2}></LoadingOverlay> */}
                  <DragDropContext onDragEnd={handleOnDragEnd}>
                     <Text
                        component="span"
                        align="center"
                        variant="gradient"
                        gradient={{
                           from: 'indigo',
                           to: 'cyan',
                           deg: 45,
                        }}
                        weight={700}
                        style={{
                           fontFamily: 'Greycliff CF, sans-serif',
                           fontSize: '50px',
                        }}>
                        Browsers
                     </Text>
                     <Skeleton
                        visible={isLoadingB || isHandling}
                        style={{ height: 200 }}>
                        <Table
                           striped
                           withColumnBorders
                           sx={{ minWidth: 800 }}
                           verticalSpacing="xs">
                           <thead>
                              <tr>
                                 <th>Index</th>
                                 <th>Session Name</th>
                              </tr>
                           </thead>

                           <tbody>
                              {browser_data &&
                                 browser_data.map((browser, index) => (
                                    <Droppable
                                       key={index}
                                       droppableId={index.toString()}>
                                       {(provided) => (
                                          <tr
                                             {...provided.droppableProps}
                                             ref={provided.innerRef}>
                                             <td>{index}</td>
                                             <td>
                                                {browser.name === ''
                                                   ? 'No Session'
                                                   : browser.name}
                                             </td>

                                             {provided.placeholder}
                                          </tr>
                                       )}
                                    </Droppable>
                                 ))}
                           </tbody>
                        </Table>
                     </Skeleton>

                     <Divider my="xl" size={10} color="blue"></Divider>
                     <Text
                        component="span"
                        align="center"
                        variant="gradient"
                        gradient={{
                           from: 'indigo',
                           to: 'cyan',
                           deg: 45,
                        }}
                        weight={700}
                        style={{
                           fontFamily: 'Greycliff CF, sans-serif',
                           fontSize: '50px',
                        }}>
                        Available Sessions
                     </Text>
                     <ScrollArea style={{ height: '500px' }}>
                        <Table
                           striped
                           withColumnBorders
                           sx={{ minWidth: 800 }}
                           verticalSpacing="xs">
                           <thead>
                              <tr>
                                 <th>Drag</th>
                                 <th>ID</th>
                                 <th>Name</th>
                                 <th>Creator</th>
                                 <th>Active</th>
                              </tr>
                           </thead>

                           <Droppable
                              droppableId="sessions"
                              isDropDisabled={true}>
                              {(provided, snapshot) => (
                                 <tbody ref={provided.innerRef}>
                                    {session_data &&
                                       session_data.map((session, index) => (
                                          <Draggable
                                             key={session.name}
                                             draggableId={session._id}
                                             index={index}>
                                             {(provided, snapshot) => (
                                                <>
                                                   <tr
                                                      ref={provided.innerRef}
                                                      {...provided.draggableProps}
                                                      style={
                                                         provided.draggableProps
                                                            .style
                                                      }>
                                                      <td>
                                                         <div
                                                            {...provided.dragHandleProps}>
                                                            <IconGripVertical
                                                               size={18}
                                                               stroke={1.5}
                                                            />
                                                         </div>
                                                      </td>
                                                      <td>{session._id}</td>
                                                      <td>{session.name}</td>
                                                      <td>{session.creator}</td>
                                                      <td>
                                                         {session.isActive ==
                                                         true
                                                            ? 'Active'
                                                            : 'Dead'}
                                                      </td>
                                                   </tr>
                                                   {snapshot.isDragging && (
                                                      <tr
                                                         style={{
                                                            display:
                                                               'none !important',
                                                            transform:
                                                               'none !  important',
                                                         }}>
                                                         <td>
                                                            <div>
                                                               <IconGripVertical
                                                                  size={18}
                                                                  stroke={1.5}
                                                               />
                                                            </div>
                                                         </td>
                                                         <td>{session._id}</td>
                                                         <td>{session.name}</td>
                                                         <td>
                                                            {session.creator}
                                                         </td>
                                                         <td>
                                                            {session.isActive ==
                                                            true
                                                               ? 'Active'
                                                               : 'Dead'}
                                                         </td>
                                                      </tr>
                                                   )}
                                                </>
                                             )}
                                          </Draggable>
                                       ))}
                                    {provided.placeholder}
                                 </tbody>
                              )}
                           </Droppable>
                        </Table>
                     </ScrollArea>
                  </DragDropContext>
               </Container>
            ) : null}
         </div>
      </ModalsProvider>
   )
}
