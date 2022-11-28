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
import { useState } from 'react'
import Control from './TabPanels/Control'
import Utility from './TabPanels/Utility'
import Information from './TabPanels/Information'
import { useSession } from 'next-auth/react'
const useStyles = createStyles((theme) => ({
   stack: {},
   tablist: {},
   tabs: {
      color: 'black',
      backgroundColor: theme.colors.gray[1],
      marginBottom: 30,
   },
   panel: {
      backgroundColor: theme.colors.gray[1],
      width: '200px',
      height: '100%',
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
            placement="right"
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
               <Information />
            </Tabs.Panel>
            <Tabs.Panel value="gallery" pr="xs" hidden={true}>
               <Transition
                  mounted={activeTab == 'gallery' ? true : false}
                  transition="fade"
                  duration={4000}
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
            <Tabs.Panel value="messages" pr="xs">
               <Utility />
            </Tabs.Panel>
            <Tabs.Panel value="settings" pr="xs">
               <Control />
            </Tabs.Panel>
         </Tabs>
      </Box>
   )
}
export default ControlPanel
