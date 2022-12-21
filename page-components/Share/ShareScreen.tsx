import { Suspense } from 'react'

import { LoadingOverlay, Flex, Box } from '@mantine/core'
import { useState } from 'react'
import { ControlPanel } from '../../components/ThreeJS/ControlPanel'
import { Scene } from '../../components/ThreeJS/Scene'
export default function ShareScreen() {
  return (
    <>
      <Suspense fallback={<LoadingOverlay visible={true} overlayBlur={2} />}>
        <Flex direction="row" gap={0} style={{ width: '100%' }}>
          <ControlPanel />
          <Scene />
        </Flex>
      </Suspense>
    </>
  )
}
