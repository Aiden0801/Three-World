import React from 'react'

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
  Transition,
  Paper,
  Burger,
} from '@mantine/core'
import {
  IconActivity,
  IconArrowBigLeft,
  IconArrowBigRight,
  IconMessageCircle,
  IconPhoto,
  IconSettings,
  IconShare,
  IconInfoCircle,
  IconScreenShare,
} from '@tabler/icons'
import { useState } from 'react'
import { useMouse } from '@mantine/hooks'
import { useRecoilValue, useRecoilState } from 'recoil'
import { currentBrowserIndex, currentBrowsers } from '../../../../utils/recoil/browser'
const useStyles = createStyles((theme) => ({
  stack: {},
}))
export default function Control() {
  const { classes, cx } = useStyles()

  const [index, setIndex] = useRecoilState(currentBrowserIndex)
  // userBrowsers
  const ub = useRecoilValue(currentBrowsers)
  const handleCommand = async (type) => {
    setIndex((index) => (index + type + 4) % 4)
  }
  return (
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
        Screen {index}
        {ub[index] && ub[index].url == 'none' && <IconActivity color="red" size={15} />}{' '}
        {ub[index] && ub[index].url != 'none' && <IconActivity color="green" size={15} />}
      </Text>
      <Text
        align="center"
        variant="gradient"
        gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
        size="md"
        weight={700}
        style={{ fontFamily: 'Greycliff CF, sans-serif' }}>
        {/* {curBrowser.data.name} */}
      </Text>
      <Grid justify="space-around">
        <Grid.Col span={3} style={{ minWidth: 60 }}>
          <ActionIcon size="xl" variant="filled" color="green" onClick={() => handleCommand(-1)}>
            <IconArrowBigLeft size={60} />
          </ActionIcon>
        </Grid.Col>
        <Grid.Col span={3} style={{ minWidth: 60 }}>
          <ActionIcon size="xl" variant="filled" color="green" onClick={() => handleCommand(1)}>
            <IconArrowBigRight size={60} />
          </ActionIcon>
        </Grid.Col>
      </Grid>
    </Stack>
  )
}
