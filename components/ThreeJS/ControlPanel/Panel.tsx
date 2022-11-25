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
import { useSession } from 'next-auth/react'
const useStyles = createStyles((theme) => ({
   card: {
      height: 440,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
   },
   stack: {},
   tablist: {},
   tabs: {
      color: 'black',
      backgroundColor: theme.colors.gray[1],
      marginBottom: 30,
   },
   title: {
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
      fontWeight: 900,
      color: theme.white,
      lineHeight: 1.2,
      fontSize: 32,
      marginTop: theme.spacing.xs,
   },

   category: {
      color: theme.white,
      opacity: 0.7,
      fontWeight: 700,
      textTransform: 'uppercase',
   },
   drawer: {
      backgroundColor: 'grey',
   },
}))
const scaleX = {
   in: { opacity: 1, transform: 'translateX(0)' },
   out: { opacity: 0, transform: 'translateX(100%)' },
   common: { transformOrigin: 'right' },
   transitionProperty: 'transform, opacity',
}
const Panel = () => {
   const [opened, setOpened] = useState(false)
   const [isHandling, setIsHandling] = useState(false)
   const { classes, cx } = useStyles()
   const [activeTab, setActiveTab] = useState<string | null>('Information')
   const { data: session, status } = useSession()
   const [hidden, setHidden] = useState(false)
   return (
      <Box
         sx={(theme) => ({
            backgroundColor: 'rgba(255,0,0,0)',
            position: 'absolute',
            left: 20,
            top: 20,
            height: '100vh',
         })}>
         <LoadingOverlay visible={isHandling} overlayBlur={2} />
         <Tabs
            orientation="vertical"
            defaultValue="gallery"
            placement="left"
            variant="pills"
            className={classes.tablist}
            onTabChange={setActiveTab}>
            <Tabs.List>
               {/* <Burger opened={opened} title={title} /> */}
               <Tabs.Tab
                  value="Information"
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

            <Tabs.Panel value="gallery" pl="xs" hidden={true}>
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
            <Tabs.Panel value="messages" pl="xs">
               <Utility />
            </Tabs.Panel>
            <Tabs.Panel value="settings" pl="xs">
               <Control />
            </Tabs.Panel>
         </Tabs>
      </Box>
   )
}
export default Panel
