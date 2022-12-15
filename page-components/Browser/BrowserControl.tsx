import {
   Container,
   createStyles,
   Paper,
   ScrollArea,
   Skeleton,
   Table,
   Text,
} from '@mantine/core'
import { ModalsProvider, openConfirmModal } from '@mantine/modals'
import { IconActivity, IconGripVertical, IconPoint } from '@tabler/icons'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { useSetRecoilState, useRecoilRefresher_UNSTABLE } from 'recoil'
import useSWR from 'swr'
import { BASE_URL } from '@/config/constants'

import { fetcher } from '@/lib/fetcher'
import { currentBrowsers } from '@/utils/recoil/browser'
import { ToolTipButton } from '@/components/Button'
const useStyles = createStyles((theme) => ({
   container: {
      paddingBottom: '20px',
      backgroundColor:
         theme.colorScheme === 'dark'
            ? theme.colors.dark[5]
            : theme.colors.gray[0],
   },
}))

const fetchBrowserData = async (url: string, email: string) => {
   const session_data = await fetcher(
      `${BASE_URL.SERVER}/api/users/getBrowsersByEmail`,
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
      `${BASE_URL.SERVER}/api/session/getAvailableSessions`,
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
   const [isBrowser, setIsBrowser] = useState(false)

   const [isHandling, setIsHandling] = useState(false)
   const resetRecoilState = useRecoilRefresher_UNSTABLE(currentBrowsers)
   const {
      data: browser_data,
      mutate: mutateB,
      isError: isErrorB,
      isLoading: isLoadingB,
   } = useBrowserData(session.user.email)
   const {
      data: session_data,
      mutate: mutateS,
      isError: isErrorS,
      isLoading: isLoadingS,
   } = useSessionData(session.user.email)
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
         `${BASE_URL.SERVER}/api/session/setSessiontoBrowser`,
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
      mutateB()
      resetRecoilState()
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
   return (
      <Container className={classes.container} mt="xl">
         {isBrowser ? (
            <Container>
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
                        fontSize: '30px',
                     }}>
                     Browsers
                  </Text>
                  <Paper shadow="xl" radius="md">
                     <ScrollArea
                        style={{
                           height: '210px',
                        }}>
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
                     </ScrollArea>
                  </Paper>

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
                        fontSize: '30px',
                     }}>
                     Available Sessions
                  </Text>
                  <Paper shadow="xl" radius="md">
                     <ScrollArea
                        style={{
                           height: '400px',
                           padding: '10px',
                        }}>
                        {isLoadingS ? (
                           <>
                              <Skeleton height={100} circle mt={6} />
                              <Skeleton height={50} mt={6} />
                              <Skeleton height={50} mt={6} />
                              <Skeleton height={50} mt={6} />
                              <Skeleton height={50} mt={6} />
                           </>
                        ) : (
                           <>
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
                                             session_data.map(
                                                (session, index) => (
                                                   <Draggable
                                                      key={session.name}
                                                      draggableId={session._id}
                                                      index={index}>
                                                      {(provided, snapshot) => (
                                                         <>
                                                            <tr
                                                               ref={
                                                                  provided.innerRef
                                                               }
                                                               {...provided.draggableProps}
                                                               style={
                                                                  provided
                                                                     .draggableProps
                                                                     .style
                                                               }>
                                                               <td>
                                                                  <div
                                                                     {...provided.dragHandleProps}>
                                                                     <ToolTipButton
                                                                        description="Drag"
                                                                        compact>
                                                                        <IconGripVertical
                                                                           size={
                                                                              18
                                                                           }
                                                                           stroke={
                                                                              1.5
                                                                           }
                                                                        />
                                                                     </ToolTipButton>
                                                                  </div>
                                                               </td>
                                                               <td>
                                                                  {session._id}
                                                               </td>
                                                               <td>
                                                                  {session.name}
                                                               </td>
                                                               <td>
                                                                  {
                                                                     session.creator
                                                                  }
                                                               </td>
                                                               <td>
                                                                  <td
                                                                     style={{
                                                                        display:
                                                                           'flex',
                                                                     }}>
                                                                     {session.isActive ==
                                                                     true
                                                                        ? 'Active'
                                                                        : 'Dead'}
                                                                  </td>
                                                               </td>
                                                            </tr>
                                                            {snapshot.isDragging && (
                                                               <tr
                                                                  style={{
                                                                     display:
                                                                        'none !important',
                                                                     transform:
                                                                        'none !important',
                                                                  }}>
                                                                  <td>
                                                                     <div>
                                                                        <ToolTipButton
                                                                           description="Drag"
                                                                           compact>
                                                                           <IconGripVertical
                                                                              size={
                                                                                 18
                                                                              }
                                                                              stroke={
                                                                                 1.5
                                                                              }
                                                                           />
                                                                        </ToolTipButton>
                                                                     </div>
                                                                  </td>
                                                                  <td>
                                                                     {
                                                                        session._id
                                                                     }
                                                                  </td>
                                                                  <td>
                                                                     {
                                                                        session.name
                                                                     }
                                                                  </td>
                                                                  <td>
                                                                     {
                                                                        session.creator
                                                                     }
                                                                  </td>
                                                                  <td>
                                                                     <IconActivity color="red" />
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
                                                )
                                             )}
                                          {provided.placeholder}
                                       </tbody>
                                    )}
                                 </Droppable>
                              </Table>
                           </>
                        )}
                     </ScrollArea>
                  </Paper>
               </DragDropContext>
            </Container>
         ) : null}
      </Container>
   )
}
