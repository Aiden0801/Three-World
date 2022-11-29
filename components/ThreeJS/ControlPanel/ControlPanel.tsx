import {
   Box,
   createStyles,
   LoadingOverlay,
   Tabs,
   Transition,
} from '@mantine/core'
import {
   IconInfoCircle,
   IconMessageCircle,
   IconPhoto,
   IconScreenShare,
   IconSettings,
   IconShare,
} from '@tabler/icons'
import { useState, useEffect, useContext } from 'react'
import Control from './TabPanels/Control'
import Utility from './TabPanels/Utility'
import Information from './TabPanels/Information'
import { useSession } from 'next-auth/react'
import { showNotification } from '@mantine/notifications'
import { SocketContext } from '../../../utils/context/socket'
const useStyles = createStyles((theme) => ({
   stack: {},
   tablist: {},
   tabs: {
      color: 'black',
      backgroundColor: theme.colors.gray[1],
      marginBottom: 30,
   },
   panel: {
      // backgroundColor: theme.colors.gray[1],
      width: '200px',
      opacity: 1,
      transition: 'visible 0s, linear 0s,opacity 1000ms',
   },
}))
const scaleX = {
   in: { opacity: 1, transform: 'translateX(0)' },
   out: { opacity: 0, transform: 'translateX(100%)' },
   common: { transformOrigin: 'right' },
   transitionProperty: 'transform, opacity',
}
const ControlPanel = () => {
   const [opened, setOpened] = useState(false)
   const { classes, cx } = useStyles()
   const [activeTab, setActiveTab] = useState<string | null>('Information')
   const { data: session, status } = useSession()
   const [hidden, setHidden] = useState(false)
   const [render, renderer] = useState(false)
   const socket = useContext(SocketContext)

   useEffect(() => {
      socket.on('participantsAdded', (msg) => {
         console.log('par Added', msg)
         showNotification({
            title: `${msg.sessionName}`,
            message: `${msg.email} is joining`,
            color: 'blue',
            autoClose: false,
         })
      })
      socket.on('participantsRemoved', (msg) => {
         console.log('par Removed', msg)
         showNotification({
            title: `${msg.sessionName}`,
            message: `${msg.email} left the session`,
            color: 'red',
            autoClose: false,
         })
      })
      return () => {
         socket.off('participantsAdded')
         socket.off('participantsRemoved')
      }
   }, [])
   return (
      <Box
         sx={(theme) => ({
            position: 'absolute',
            right: 20,
            top: 80,
            zIndex: 45,
         })}>
         <Tabs
            orientation="vertical"
            defaultValue="information"
            placement="left"
            variant="pills"
            className={classes.tablist}
            onTabChange={setActiveTab}>
            <Tabs.List>
               {/* <Burger opened={opened} title={title} /> */}
               <Tabs.Tab
                  value="information"
                  className={classes.tabs}
                  icon={<IconInfoCircle size={24} />}></Tabs.Tab>
               <Tabs.Tab
                  value="Sessions"
                  className={classes.tabs}
                  icon={<IconShare size={24} />}></Tabs.Tab>
               <Tabs.Tab
                  value="Browsers"
                  className={classes.tabs}
                  icon={<IconScreenShare size={24} />}></Tabs.Tab>
               <Tabs.Tab
                  value="gallery"
                  className={classes.tabs}
                  icon={<IconPhoto size={24} />}></Tabs.Tab>
               <Tabs.Tab
                  value="messages"
                  className={classes.tabs}
                  icon={<IconMessageCircle size={24} />}></Tabs.Tab>
               <Tabs.Tab
                  value="settings"
                  className={classes.tabs}
                  icon={<IconSettings size={24} />}></Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="information" pr="xs" className={classes.panel}>
               <Information update={render} />
            </Tabs.Panel>
            <Tabs.Panel value="gallery" pr="xs" hidden={true}>
               <Transition
                  mounted={activeTab == 'gallery' ? true : false}
                  transition="scale-x"
                  duration={4000}>
                  {(styles) => (
                     <Box
                        style={{
                           ...styles,
                        }}>
                        <Utility />
                     </Box>
                  )}
               </Transition>
            </Tabs.Panel>
            <Tabs.Panel value="messages" pr="xs">
               <Transition
                  mounted={activeTab == 'messages' ? true : false}
                  transition="scale-x"
                  duration={1000}
                  timingFunction="ease">
                  {(styles) => (
                     <Box
                        style={{
                           ...styles,
                        }}>
                        <Utility />
                     </Box>
                  )}
               </Transition>
            </Tabs.Panel>
            <Tabs.Panel value="settings" pr="xs">
               <Control />
            </Tabs.Panel>
         </Tabs>
      </Box>
   )
}
export default ControlPanel
