import React from 'react'
import { Canvas } from '@react-three/fiber'
import { lazy, Suspense } from 'react'
import BrowserGroup from './BrowserGroup'
import { useState, useEffect } from 'react'
import { useSpring, animated, config } from '@react-spring/three'
import { useSession } from 'next-auth/react'
import { useHotkeys } from '@mantine/hooks'
const SkyComponent = lazy(() => import('./Sky'))
import * as THREE from 'three'
import { AmbientLight, AnimationLoader, PointLight } from 'three'
import { useRecoilState, useRecoilValue } from 'recoil'
import { currentBrowserIndex, currentUser } from '../../../utils/recoil/browser'
import { usePrevious } from '@mantine/hooks'
const from = new THREE.Euler(0, 0, 0)
const to = new THREE.Euler(-Math.PI, 0, 0)

export default function SpaceScreen() {
   const [isBrowser, setIsBrowser] = useState(true)

   const { data: session, status } = useSession()
   const [useEmail, setUserEmail] = useRecoilState(currentUser)

   useEffect(() => {
      if (typeof window !== 'undefined') {
         {
            setIsBrowser(true)
         }
      }
      setUserEmail(session.user.email)
   }, [])

   const curIndex = useRecoilValue(currentBrowserIndex)
   const previousValue = usePrevious(curIndex)
   const [toogle, setToogle] = useState(0)
   useEffect(() => {
      console.log(previousValue, curIndex)
      let move = 0
      if (curIndex - previousValue == -3) move = 1
      if (curIndex - previousValue == 3) move = -1
      else move = curIndex - previousValue
      setToogle((toogle) => toogle + move)
   }, [curIndex])
   const rotation = useSpring({
      y: (toogle * Math.PI) / 2,
      config: config.slow,
   })
   useHotkeys([
      [
         'ctrl+q',
         () => {
            setToogle((toogle) => toogle + 1)
            console.log('KKK')
            console.log(toogle)
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
         <Canvas
            camera={{
               fov: 40,
            }}
            style={{
               width: '100%',
            }}>
            <animated.perspectiveCamera rotation-y={rotation.y}>
               {/* <SkyComponent /> */}
               <group>
                  <BrowserGroup />
               </group>
            </animated.perspectiveCamera>

            <ambientLight color={0xff4040} />
            {/* <pointLight
               distance={10}
               intensity={10}
               color="white"
               position={[0, 0, 0]}
            /> */}
         </Canvas>
      </div>
   )
}

function Light() {
   return (
      <>
         {/* <AmbientLight color={0x404040} /> */}

         {/* <pointLight
            distance={10}
            intensity={10}
            color="white"
            position={[0, 4.5, 0]}
         /> */}
      </>
   )
}
