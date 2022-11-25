import { useState } from 'react'

import { useSession } from 'next-auth/react'
import { XOctagonFill } from 'react-bootstrap-icons'
import useSWR from 'swr'

import {
   Button,
   Container,
   createStyles,
   Grid,
   Modal,
   Paper,
   ScrollArea,
   SimpleGrid,
   Table,
   Text,
   TextInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
// Users with a higher priority will preempt the control of lower priority users.
import { IconActivity, IconArrowBack, IconPlus } from '@tabler/icons'

import { serverURL } from '../../config/urlcontrol'
import { fetcher } from '../../lib/fetcher'
import { IPropsSessionData } from '../../types'
const useStyles = createStyles((theme) => ({
   container: {
      display: 'flex',
      alignItems: 'center',
      margin: '10px,10px,10px,10px',
   },
   detail: {
      marginTop: '100px',
   },
}))

const fetchSessionData = async (url: string, _id: string) => {
   console.log('fetchSessionData', _id)
   const session_data = await fetcher(
      `${serverURL}/api/session/getSessionByID`,
      {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
            _id: _id,
         }),
      }
   )
   console.log('session_data', session_data)
   return session_data ? session_data : []
}
/***
 * * Custom Hook for useSWR
 * ? There mighe be more easier wway?
 */
const useSessionData = (_id: string) => {
   const { data, mutate, error, isValidating } = useSWR(
      ['api/session/getSessionByID', _id],
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

const SessionDetail = ({ sessionID }: IPropsSessionData) => {
   const { data: session, status } = useSession()
   const [opened, setOpened] = useState(false)
   const [isHandling, setIsHandling] = useState(false)
   const { classes, theme } = useStyles()
   const {
      data: detailData,
      isLoading,
      isError,
      mutate,
   } = useSessionData(sessionID)

   const handleActivateSession = async (_id) => {
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
   }
   const handleKillSession = async (_id) => {
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
   }
   const form = useForm({
      initialValues: {
         email: '',
      },
      validate: {
         email: (value) => (value.length < 1 ? 'Name Field Required' : null),
      },
   })
   const handleAllowUser = async (values) => {
      const { email } = values
      setOpened(false)

      setIsHandling(true)
      console.log('handleAllowUser', detailData.creator, detailData._id, email)
      const response = await fetcher('/api/session/allowUsertoSession', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
            creator: detailData.creator,
            _id: detailData._id,
            email: email,
         }),
      })
      console.log('handleAllowUser', response)
      mutate()
      setIsHandling(false)
   }
   const handleDenyAllowedUser = async (values) => {
      const email = values
      setIsHandling(true)
      console.log('handleDenyUser', detailData.creator, detailData._id, email)
      const response = await fetcher('/api/session/denyUsertoSession', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
            creator: detailData.creator,
            _id: detailData._id,
            email: email,
         }),
      })
      console.log('handleDenyUser', response)
      mutate()
      setOpened(false)
      setIsHandling(false)
   }
   return (
      <Container className={classes.container}>
         {/* <LoadingOverlay
            visible={isHandling || isLoading}
            overlayBlur={2}></LoadingOverlay> */}
         <Modal
            title="Allow User"
            opened={opened}
            onClose={() => setOpened(false)}
            overlayColor={
               theme.colorScheme === 'dark'
                  ? theme.colors.dark[9]
                  : theme.colors.gray[2]
            }
            overlayOpacity={0.55}
            overlayBlur={3}>
            <Text>Allow New User to Access this Session</Text>
            <form onSubmit={form.onSubmit((values) => handleAllowUser(values))}>
               <SimpleGrid cols={1}>
                  <TextInput
                     placeholder="Name"
                     label="User Email"
                     withAsterisk
                     {...form.getInputProps('email')}
                  />
                  <Button type="submit" radius="md" size="md">
                     Allow
                  </Button>
               </SimpleGrid>
            </form>
         </Modal>
         <Paper
            shadow="md"
            p="xl"
            style={{}}
            px="xs"
            className="classes.detail">
            <Text
               component="span"
               variant="gradient"
               gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
               weight={700}
               style={{
                  marginTop: '30px',
                  fontFamily: 'Greycliff CF, sans-serif',
                  fontSize: '50px',
               }}>
               Session Detail
            </Text>
            {detailData && (
               <Grid columns={12}>
                  <Grid.Col span={3}>
                     <Text size="xl">Name</Text>
                  </Grid.Col>

                  <Grid.Col span={9}>
                     <Text size="xl">{detailData.name}</Text>
                  </Grid.Col>
                  <Grid.Col span={3}>
                     <Text size="xl">Description</Text>
                  </Grid.Col>

                  <Grid.Col span={9}>
                     <Text size="xl">{detailData.description}</Text>
                  </Grid.Col>

                  <Grid.Col span={3}>
                     <Text size="xl">Status</Text>
                  </Grid.Col>
                  <Grid.Col span={7}>
                     {detailData.isActive ? (
                        <Text size="xl">Active</Text>
                     ) : (
                        <Text size="xl">Dead</Text>
                     )}
                  </Grid.Col>
                  <Grid.Col span={2}>
                     {detailData.isActive ? (
                        <Button
                           leftIcon={<IconActivity />}
                           onClick={() => handleKillSession(detailData._id)}
                           color="red">
                           {' '}
                           Stop
                        </Button>
                     ) : (
                        <Button
                           leftIcon={<IconActivity />}
                           onClick={() =>
                              handleActivateSession(detailData._id)
                           }>
                           {' '}
                           Activate
                        </Button>
                     )}
                  </Grid.Col>
                  <Grid.Col span={10}>
                     <Text size="xl">Session Users</Text>
                  </Grid.Col>
                  <Grid.Col
                     span={2}
                     style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                     }}>
                     <Button
                        onClick={() => {
                           setOpened(true)
                        }}
                        color="green"
                        variant="outline"
                        compact
                        loading={isHandling}
                        leftIcon={
                           <IconPlus
                              onClick={() => {
                                 setOpened(true)
                              }}
                              size={18}
                              stroke={1.5}
                           />
                        }>
                        New
                     </Button>
                  </Grid.Col>

                  {detailData.users.length === 0 ? (
                     <Text size="xl">No Users Available</Text>
                  ) : (
                     <>
                        <Grid.Col span={12} style={{}}>
                           <ScrollArea style={{ height: 450 }}>
                              <Table withBorder>
                                 <thead>
                                    <tr>
                                       <th> Name</th>
                                       <th> Actions</th>
                                    </tr>
                                 </thead>
                                 <tbody>
                                    {detailData.users.map((user, index) => {
                                       // console.log(index, user.email)
                                       // <div key={index}>AAAA</div>
                                       return (
                                          <tr key={index}>
                                             <td>
                                                <Text size="xl">
                                                   {user.email}
                                                </Text>
                                             </td>
                                             <td>
                                                <Button
                                                   onClick={() =>
                                                      handleDenyAllowedUser(
                                                         user.email
                                                      )
                                                   }
                                                   color="orange"
                                                   variant="subtle">
                                                   <XOctagonFill />
                                                </Button>
                                             </td>
                                          </tr>
                                       )
                                    })}
                                 </tbody>
                              </Table>
                           </ScrollArea>
                        </Grid.Col>
                     </>
                  )}
               </Grid>
            )}
            <Button
               size="xl"
               style={{
                  position: 'absolute',
                  right: '20px',
                  bottom: '60px',
               }}
               component="a"
               href="./"
               leftIcon={<IconArrowBack size={18} stroke={1.5} />}
               color="red"
               pr={20}>
               Back
            </Button>
         </Paper>
      </Container>
   )
}

export default SessionDetail
