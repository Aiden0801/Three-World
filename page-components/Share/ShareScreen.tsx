import { Suspense } from 'react'

import { LoadingOverlay } from '@mantine/core'

import { Space } from './index'

export default function ShareScreen() {
   return (
      <>
         {/* {browsers && browsers.length == 4 ?: <div>Loading </div>} */}
         <Suspense fallback={<LoadingOverlay visible={true} overlayBlur={2} />}>
            <Space />
         </Suspense>
      </>
   )
}
