import { Box, createStyles, Tabs, Transition, Button, UnstyledButton } from '@mantine/core'

import { ThemeIcon } from '@mantine/core'
import { useViewportSize, useElementSize } from '@mantine/hooks'
import { IconKeyboardHide } from '@tabler/icons'
import { ChevronRight, ChevronLeft } from 'react-bootstrap-icons'
import { HeaderHeight, FooterHeight } from '../../../config/themeConfig'
import { IconInfoCircle, IconMessageCircle, IconPhoto, IconScreenShare, IconSettings, IconShare } from '@tabler/icons'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import Control from './TabPanels/Control'
import Information from './TabPanels/Information'
import Utility from './TabPanels/Utility'

interface ControlPanelStyles {
  width: number
  toogle: boolean
}
const useStyles = createStyles((theme, { width, toogle }: ControlPanelStyles) => ({
  stack: {},
  tabctrl: { paddingLeft: theme.spacing.sm, height: '100%' },
  tablist: {
    marginTop: '20px',
    paddingLeft: '0px',
  },
  tabs: {
    color: 'black',
    marginLeft: '2px',
    marginRight: theme.spacing.sm,
    backgroundColor: theme.colors.gray[1],
    marginBottom: 30,
  },
  panel: {
    // backgroundColor: theme.colors.gray[1],
    display: toogle ? 'none' : 'block',

    paddingTop: HeaderHeight,
    paddingLeft: theme.spacing.xs,
    width: '200px',
    backgroundColor: theme.colors.gray[8],
    opacity: 1,
    height: '500px',
    transition: 'visible 0s, linear 0s,opacity 1000ms',
  },
  toogleButton: {
    // position: 'static',
    left: width,
    top: '50%',
  },
  toogleIcon: {
    marginLeft: '5px',
    bottom: '50px',
    '&:hover': {
      backgroundColor: theme.colors.gray[9],
    },
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
  const [activeTab, setActiveTab] = useState<string | null>('Information')
  const { data: session, status } = useSession()
  const [hidden, setHidden] = useState(false)
  const { ref, width, height } = useElementSize()
  const [toogle, setToogle] = useState(false)
  const { classes, cx } = useStyles({ width, toogle })
  return (
    <Box
      sx={(theme) => ({
        top: 0,
        bottom: 0,
        zIndex: 45,

        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      })}>
      <Tabs
        ref={ref}
        defaultValue="information"
        placement="left"
        orientation="vertical"
        variant="pills"
        onTabChange={setActiveTab}
        className={classes.tabctrl}>
        <Tabs.List className={classes.tablist}>
          <Tabs.Tab value="information" className={classes.tabs} icon={<IconInfoCircle size={24} />}></Tabs.Tab>
          <Tabs.Tab value="sessions" className={classes.tabs} icon={<IconShare size={24} />}></Tabs.Tab>
          <Tabs.Tab value="browsers" className={classes.tabs} icon={<IconScreenShare size={24} />}></Tabs.Tab>
          <Tabs.Tab value="gallery" className={classes.tabs} icon={<IconPhoto size={24} />}></Tabs.Tab>
          <Tabs.Tab value="messages" className={classes.tabs} icon={<IconMessageCircle size={24} />}></Tabs.Tab>
          <Tabs.Tab value="settings" className={classes.tabs} icon={<IconSettings size={24} />}></Tabs.Tab>

          <UnstyledButton
            className={classes.toogleButton}
            onClick={() => {
              setToogle((o) => !o)
            }}>
            <ThemeIcon variant="light" size="xl" color="green" className={classes.toogleIcon}>
              {toogle ? <ChevronRight size={50} /> : <ChevronLeft size={50} />}
            </ThemeIcon>
          </UnstyledButton>
        </Tabs.List>
        <Tabs.Panel value="information" pr="xs" className={classes.panel}>
          <Information />
        </Tabs.Panel>
        <Tabs.Panel value="gallery" pr="xs" className={classes.panel}>
          <Utility />
        </Tabs.Panel>
        <Tabs.Panel value="sessions" pr="xs" className={classes.panel}>
          <Utility />
        </Tabs.Panel>
        <Tabs.Panel value="browsers" pr="xs" className={classes.panel}>
          <Utility />
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
