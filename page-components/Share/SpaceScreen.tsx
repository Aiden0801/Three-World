import React from 'react'
import { Canvas } from '@react-three/fiber'
import { lazy, Suspense } from 'react'
import { CameraPosition } from '../../components/ThreeJS'
import { useState, useEffect } from 'react'
import ControlPanel from '../../components/ThreeJS/ControlPanel/ControlPanel'
import { useSpring, animated, config } from '@react-spring/three'

import { useHotkeys } from '@mantine/hooks'
const SkyComponent = lazy(() => import('../../components/ThreeJS/sky'))
import * as THREE from 'three'
import { AnimationLoader } from 'three'
import {
   getCurrentBrowser,
   getCommand,
   setCommand,
   setBrowser,
} from '../../store/browserSlice'
import { useSelector, useDispatch } from 'react-redux'
const from = new THREE.Euler(0, 0, 0)
const to = new THREE.Euler(-Math.PI, 0, 0)

export default function SpaceScreen() {
   const [isBrowser, setIsBrowser] = useState(true)
   const dispatch = useDispatch()

   const curCommand = useSelector(getCommand)
   useEffect(() => {
      if (typeof window !== 'undefined') {
         {
            setIsBrowser(true)
         }
      }
   }, [])
   useEffect(() => {
      if (curCommand.handling == 0) return
      setToogle((toogle) => toogle + curCommand.type)

      dispatch(
         setCommand({
            type: 0,
            handling: 0,
         })
      )
      dispatch(setBrowser((toogle + 4 + curCommand.type) % 4))
   }, [curCommand])
   const [toogle, setToogle] = useState(0)
   const rotation = useSpring({
      x: (toogle * Math.PI) / 2,
      y: (toogle * Math.PI) / 2,
      z: (toogle * Math.PI) / 2,
      config: config.gentle,
   })
   useHotkeys([
      [
         'ctrl+q',
         () => {
            setToogle((toogle) => toogle + 1)
            console.log('KKK')
         },
      ],
   ])
   return (
      <div
         style={{
            position: 'relative',
            width: '100%',
            height: '100%',
         }}>
         {isBrowser ? (
            <Canvas
               camera={{
                  fov: 50,
               }}>
               <Suspense fallback={null}>
                  <animated.perspectiveCamera rotation-y={rotation.y}>
                     <SkyComponent />
                     <group>
                        <CameraPosition />
                     </group>
                     <Light />
                  </animated.perspectiveCamera>
               </Suspense>
            </Canvas>
         ) : (
            <div></div>
         )}
         <ControlPanel />
      </div>
   )
}

function Light() {
   return (
      <>
         {/* <pointLight distance={10} intensity={10} color="white" position={[0, 4.5, 0]} /> */}
      </>
   )
}
