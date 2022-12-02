import { Suspense } from 'react'

import { LoadingOverlay, Flex } from '@mantine/core'

import { ControlPanel } from '../../components/ThreeJS/ControlPanel'
import { Scene } from '../../components/ThreeJS/Scene'
export default function ShareScreen() {
   return (
      <>
         <Suspense fallback={<LoadingOverlay visible={true} overlayBlur={2} />}>
            <Flex direction="row" gap={0}>
               <ControlPanel />
               <Scene />
            </Flex>
         </Suspense>
      </>
   )
}
