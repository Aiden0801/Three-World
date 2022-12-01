import { useHotkeys, usePrevious } from '@mantine/hooks'
import { animated, config, useSpring } from '@react-spring/three'
import { Canvas } from '@react-three/fiber'
import { lazy, useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { currentBrowserIndex } from '../../../utils/recoil/browser'
import BrowserGroup from './BrowserGroup'
const SkyComponent = lazy(() => import('./Sky'))

export default function SpaceScreen() {
   const curIndex = useRecoilValue(currentBrowserIndex)
   const previousValue = usePrevious(curIndex)
   const [toogle, setToogle] = useState(0)
   useEffect(() => {
      console.log(previousValue, curIndex)
      var move = 0
      if (curIndex - previousValue == 3) move = -1
      else if (curIndex - previousValue == -3) move = 1
      else move = curIndex - previousValue
      if (toogle != curIndex) setToogle((toogle) => toogle + move)
   }, [curIndex])
   const rotation = useSpring({
      y: (toogle * Math.PI) / 2,
      config: config.default,
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
            <pointLight
               distance={10}
               intensity={10}
               color="white"
               position={[0, 0, 0]}
            />
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
