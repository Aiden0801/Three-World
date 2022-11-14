import React from 'react'
import { Loader } from '@mantine/core'
function LoadingScreen() {
   return (
      <div
         style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
         }}>
         <Loader
            variant="dots"
            size="xl"
            style={{
               margin: 'auto',
            }}
         />
      </div>
   )
}

export default LoadingScreen
