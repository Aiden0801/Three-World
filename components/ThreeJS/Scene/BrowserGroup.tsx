import { useFrame, useThree } from '@react-three/fiber'

import React, { useEffect } from 'react'
import * as THREE from 'three'
import Browser from './Browser'
function BrowserGroup() {
   const { camera } = useThree()
   useEffect(() => {
      camera.position.set(0, 0, 0)
   })
   useFrame(() => {})
   return (
      <>
         <Browser
            bid={0}
            position={new THREE.Vector3(0, 0, -5)}
            rotation={new THREE.Euler(0, 0, 0)}
         />
         <Browser
            bid={1}
            position={new THREE.Vector3(-5, 0, 0)}
            rotation={new THREE.Euler(0, Math.PI / 2, 0)}
         />
         <Browser
            bid={2}
            position={new THREE.Vector3(0, 0, 5)}
            rotation={new THREE.Euler(0, Math.PI, 0)}
         />
         <Browser
            bid={3}
            position={new THREE.Vector3(5, 0, 0)}
            rotation={new THREE.Euler(0, -Math.PI / 2, 0)}
         />
      </>
   )
}
export default React.memo(BrowserGroup)
