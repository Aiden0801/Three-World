import { useEffect, useState } from 'react'
import {
  Button,
  CloseButton,
  Collapse,
  Container,
  Group,
  Text,
} from '@mantine/core'
import { useTimeout } from '@mantine/hooks'
import { usePwaInstall } from '@/hooks/use-pwa-install'

export interface PwaInstallBannerProps {
  timeout?: number
  text?: string
}

export function PwaInstallBanner({
  text = 'Add this app to your device',
  timeout = 500,
}: PwaInstallBannerProps = {}) {
  const [handlePwaInstall, installed, available] = usePwaInstall()
  const [show, setShow] = useState(false)
  const delay = useTimeout(() => setShow(true), timeout)

  useEffect(() => {
    if (available && !installed) {
      delay.start()
    }
    return delay.clear
  }, [available, installed])

  return (
    <Collapse
      in={show}
      sx={(theme) => ({
        width: '100%',
        zIndex: 1001,
        backgroundColor: theme.colors[theme.primaryColor][8],
        color: theme.white,
      })}
    >
      <Container size="xl" py="xs">
        <Group position="apart">
          <Text>{text}</Text>
          <Group position="apart">
            <Button variant="white" onClick={handlePwaInstall}>
              Add to Home
            </Button>
            <CloseButton onClick={() => setShow(false)} />
          </Group>
        </Group>
      </Container>
    </Collapse>
  )
}
