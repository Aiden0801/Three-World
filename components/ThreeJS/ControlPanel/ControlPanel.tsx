import {
   Box,
   createStyles,
   Tabs,
   Transition,
   Button,
   UnstyledButton,
} from '@mantine/core'

import { ThemeIcon } from '@mantine/core'
import { useViewportSize } from '@mantine/hooks'
import { IconKeyboardHide } from '@tabler/icons'
import { HeaderHeight, FooterHeight } from '../../../config/themeConfig'
import {
   IconInfoCircle,
   IconMessageCircle,
   IconPhoto,
   IconScreenShare,
   IconSettings,
   IconShare,
} from '@tabler/icons'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import Control from './TabPanels/Control'
import Information from './TabPanels/Information'
import Utility from './TabPanels/Utility'
const useStyles = createStyles((theme) => ({
   stack: {},
   tabctrl: { paddingLeft: theme.spacing.sm },
   tablist: {
      marginTop: '80px',
   },
   tabs: {
      color: 'black',
      marginLeft: theme.spacing.sm,
      backgroundColor: theme.colors.gray[1],
      marginBottom: 30,
   },
   panel: {
      // backgroundColor: theme.colors.gray[1],
      paddingTop: HeaderHeight,
      paddingLeft: theme.spacing.xs,
      width: '200px',
      height: '100vh',
      bottom: 0,
      backgroundColor: theme.colors.gray[8],
      opacity: 1,
      transition: 'visible 0s, linear 0s,opacity 1000ms',
   },
   hoverButton: { position: 'absolute', top: '50%', left: '-5px' },
}))
const scaleX = {
   in: { opacity: 1, transform: 'translateX(0)' },
   out: { opacity: 0, transform: 'translateX(100%)' },
   common: { transformOrigin: 'right' },
   transitionProperty: 'transform, opacity',
}
const ControlPanel = () => {
   const { height, width } = useViewportSize()
   const [opened, setOpened] = useState(false)
   const { classes, cx } = useStyles()
   const [activeTab, setActiveTab] = useState<string | null>('Information')
   const { data: session, status } = useSession()
   const [hidden, setHidden] = useState(false)

   return (
      <Box
         sx={(theme) => ({
            position: 'absolute',
            right: theme.spacing.md,
            top: 0,
            bottom: 0,
            zIndex: 45,
         })}>
         <Tabs
            orientation="vertical"
            defaultValue="information"
            placement="right"
            variant="pills"
            onTabChange={setActiveTab}
            className={classes.tabctrl}>
            <Tabs.List className={classes.tablist}>
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
               <UnstyledButton className={classes.hoverButton}>
                  <ThemeIcon
                     size="lg"
                     variant="gradient"
                     gradient={{ from: 'indigo', to: 'cyan' }}>
                     <IconKeyboardHide />
                  </ThemeIcon>
               </UnstyledButton>
            </Tabs.List>
            <Tabs.Panel value="information" pr="xs" className={classes.panel}>
               <Information />
            </Tabs.Panel>
            <Tabs.Panel value="gallery" pr="xs" className={classes.panel}>
               {/* <Transition
                  mounted={activeTab == 'gallery' ? true : false}
                  transition="scale-x"
                  duration={4000}>
                  {(styles) => (
                     <Box
                        style={{
                           ...styles,
                        }}> */}
               <Utility />
               {/* </Box>
                  )} */}
               {/* </Transition> */}
            </Tabs.Panel>
            <Tabs.Panel value="messages" pr="xs" className={classes.panel}>
               Chatting
            </Tabs.Panel>
            <Tabs.Panel value="settings" pr="xs" className={classes.panel}>
               <Control />
            </Tabs.Panel>
         </Tabs>
      </Box>
   )
}
export default ControlPanel
