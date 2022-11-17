import {
   ActionIcon,
   Box,
   createStyles,
   Dialog,
   Grid,
   LoadingOverlay,
   Stack,
   Tabs,
   Text,
} from '@mantine/core'
import {
   IconActivity,
   IconArrowBigLeft,
   IconArrowBigRight,
   IconMessageCircle,
   IconPhoto,
   IconSettings,
} from '@tabler/icons'
import { useState } from 'react'
import { useMouse } from '@mantine/hooks'
import { useDispatch, useSelector } from 'react-redux'
import {
   getCommand,
   getCurrentBrowserData,
   setCommand,
} from '../../../store/browserSlice'
import Utility from './Utility'
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
const ControlPanel = () => {
   const dispatch = useDispatch()
   const curBrowser = useSelector(getCurrentBrowserData)
   const curCommand = useSelector(getCommand)
   const [opened, setOpened] = useState(false)
   const title = opened ? 'Close navigation' : 'Open navigation'
   const [data, setData] = useState([])
   const [isHandling, setIsHandling] = useState(false)
   const { classes, cx } = useStyles()

   const handleCommand = async (type) => {
      if (curCommand.handle == 1) return
      dispatch(
         setCommand({
            type: type,
            handling: 1,
         })
      )
   }
   const { ref, x, y } = useMouse()

   return (
      <Box
         ref={ref}
         sx={(theme) => ({
            backgroundColor: 'rgba(255,0,0,0)',
            position: 'absolute',
            right: 20,
            top: 20,
            width: '200px',
         })}>
         <LoadingOverlay visible={isHandling} overlayBlur={2} />

         <Tabs
            orientation="vertical"
            defaultValue="gallery"
            placement="right"
            variant="pills"
            className={classes.tablist}>
            <Tabs.List>
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

            <Tabs.Panel
               value="gallery"
               pl="xs"
               style={
                  {
                     // backgroundColor: 'red',
                  }
               }>
               Gallery tab content{x}
            </Tabs.Panel>

            <Tabs.Panel value="messages" pl="xs">
               <Utility />
            </Tabs.Panel>

            <Tabs.Panel value="settings" pl="xs">
               <Stack align="center" className={classes.stack}>
                  <Text
                     align="center"
                     variant="gradient"
                     gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
                     size="xl"
                     weight={700}
                     style={{ fontFamily: 'Greycliff CF, sans-serif' }}>
                     Settings
                  </Text>
                  <Text
                     align="center"
                     variant="gradient"
                     gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
                     size="md"
                     weight={700}
                     style={{ fontFamily: 'Greycliff CF, sans-serif' }}>
                     Screen {curBrowser.index}
                     {curBrowser && curBrowser.data.url == 'none' && (
                        <IconActivity color="red" size={15} />
                     )}
                     {curBrowser && curBrowser.data.url != 'none' && (
                        <IconActivity color="green" size={15} />
                     )}
                  </Text>
                  <Text
                     align="center"
                     variant="gradient"
                     gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
                     size="md"
                     weight={700}
                     style={{ fontFamily: 'Greycliff CF, sans-serif' }}>
                     {curBrowser.data.name}
                  </Text>
                  <Grid justify="space-around">
                     <Grid.Col span={3} style={{ minWidth: 60 }}>
                        <ActionIcon
                           size="xl"
                           variant="filled"
                           color="green"
                           onClick={() => handleCommand(1)}>
                           <IconArrowBigLeft size={60} />
                        </ActionIcon>
                     </Grid.Col>
                     <Grid.Col span={3} style={{ minWidth: 60 }}>
                        <ActionIcon
                           size="xl"
                           variant="filled"
                           color="green"
                           onClick={() => handleCommand(2)}>
                           <IconArrowBigRight size={60} />
                        </ActionIcon>
                     </Grid.Col>
                  </Grid>
               </Stack>
            </Tabs.Panel>
         </Tabs>
         <Dialog opened={opened}>
            <Stack align="center" className={classes.stack}>
               <Text
                  align="center"
                  variant="gradient"
                  gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
                  size="xl"
                  weight={700}
                  style={{ fontFamily: 'Greycliff CF, sans-serif' }}>
                  Control Panel
               </Text>
               <Text
                  align="center"
                  variant="gradient"
                  gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
                  size="md"
                  weight={700}
                  style={{ fontFamily: 'Greycliff CF, sans-serif' }}>
                  Screen {curBrowser.index}
                  {curBrowser && curBrowser.data.url == 'none' && (
                     <IconActivity color="red" size={15} />
                  )}
                  {curBrowser && curBrowser.data.url != 'none' && (
                     <IconActivity color="green" size={15} />
                  )}
               </Text>
               <Text
                  align="center"
                  variant="gradient"
                  gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
                  size="md"
                  weight={700}
                  style={{ fontFamily: 'Greycliff CF, sans-serif' }}>
                  {curBrowser.data.name}
               </Text>
               <Grid justify="space-around">
                  <Grid.Col span={3} style={{ minWidth: 60 }}>
                     <ActionIcon
                        size="xl"
                        variant="filled"
                        color="green"
                        onClick={() => handleCommand(1)}>
                        <IconArrowBigLeft size={60} />
                     </ActionIcon>
                  </Grid.Col>
                  <Grid.Col span={3} style={{ minWidth: 60 }}>
                     <ActionIcon
                        size="xl"
                        variant="filled"
                        color="green"
                        onClick={() => handleCommand(2)}>
                        <IconArrowBigRight size={60} />
                     </ActionIcon>
                  </Grid.Col>
               </Grid>
            </Stack>
         </Dialog>
         {/* </Drawer> */}
      </Box>
   )
}
export default ControlPanel
