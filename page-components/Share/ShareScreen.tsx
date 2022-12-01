import { Suspense } from 'react'

import { LoadingOverlay } from '@mantine/core'

import { ControlPanel } from '../../components/ThreeJS/ControlPanel'
import { Scene } from '../../components/ThreeJS/Scene'
export default function ShareScreen() {
   return (
      <>
         {/* {browsers && browsers.length == 4 ?: <div>Loading </div>} */}
         <Suspense fallback={<LoadingOverlay visible={true} overlayBlur={2} />}>
            {/* <Space /> */}
            <ControlPanel />
            {/* <Scene /> */}
         </Suspense>
      </>
   )
}
