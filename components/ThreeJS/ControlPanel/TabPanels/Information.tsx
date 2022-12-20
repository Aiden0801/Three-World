import { createStyles, Box, Container, Divider, Text, Group, Avatar } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { useSocket } from '@/contexts'
import { currentBrowserIndex, currentBrowsers, currentUser } from '@/utils/recoil/browser'

const useStyles = createStyles((theme) => ({
  users: {
    marginBottom: theme.spacing.sm,
  },
}))
const format = (str: string) => {
  if (str.length < 13) return str
  return str.substring(0, 5) + '...' + str.slice(-5)
}
export default function Information() {
  const { classes, cx } = useStyles()
  const userBrowser = useRecoilValue(currentBrowsers)
  const Index = useRecoilValue(currentBrowserIndex)
  const userEmail = useRecoilValue(currentUser)
  const socket = useSocket()
  const [data, setData] = useState([])
  useEffect(() => {
    console.log(Index, userBrowser[Index].url)
    console.log('socket getparticipants calling')

    if (userBrowser[Index].url == 'none' || userBrowser[Index].url == 'No Session') return
    socket.emit('getParticipants', { sessionName: userBrowser[Index].name })
  }, [Index, userBrowser])
  useEffect(() => {
    socket.on('getParticipants', (sessionName: string, lists) => {
      try {
        if (sessionName == userBrowser[Index].name) setData(lists)
      } catch (err) {
        console.log(err)
      }
      console.log('getParticipants', sessionName, userBrowser[Index].name, lists)
    })
    socket.on('participantsAdded', (msg) => {
      console.log('par Added', msg)
      showNotification({
        title: `${msg.sessionName}`,
        message: `${msg.email} is joining`,
        color: 'blue',
        autoClose: false,
      })
      if (msg.sessionName == userBrowser[Index].name)
        socket.emit('getParticipants', {
          sessionName: userBrowser[Index].name,
        })
      // mutate()
    })
    socket.on('participantsRemoved', (msg) => {
      console.log('par Removed', msg)
      showNotification({
        title: `${msg.sessionName}`,
        message: `${msg.email} left the session`,
        color: 'red',
        autoClose: false,
      })
      if (msg.sessionName == userBrowser[Index].name)
        socket.emit('getParticipants', {
          sessionName: userBrowser[Index].name,
        })
    })
    return () => {
      socket.off('getParticipants')
      socket.off('participantsAdded')
      socket.off('participantsRemoved')
    }
  }, [])
  return (
    <>
      <Container>
        {userBrowser.length == 4 && (
          <Text fz="xl" c="teal.4" fw={700} align="center">
            {userBrowser[Index].name}
          </Text>
        )}
        <Divider
          my="xs"
          variant="dashed"
          labelPosition="center"
          label={
            <>
              <Box ml={5}>Participants</Box>
            </>
          }
        />

        {data.map((item, index) => (
          <Group key={index} className={classes.users}>
            <Avatar size="sm" src={null} alt="no image here" color="indigo" />
            <div>
              <Text color="gray" fw="bold" span>
                {format(item)}
              </Text>
            </div>
          </Group>
        ))}
      </Container>
    </>
  )
}
