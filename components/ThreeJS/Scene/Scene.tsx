import { useHotkeys, usePrevious } from '@mantine/hooks'
import { animated, config, useSpring } from '@react-spring/three'
import { Canvas } from '@react-three/fiber'
import { lazy, useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { currentBrowserIndex } from '@/utils/recoil/browser'
import BrowserGroup from './BrowserGroup'
const SkyComponent = lazy(() => import('./Sky'))

import { useViewportSize } from '@mantine/hooks'
import { HeaderHeight, FooterHeight } from '@/config/themeConfig'
export default function SpaceScreen() {
  const { height, width } = useViewportSize()
  const curIndex = useRecoilValue(currentBrowserIndex)
  const previousValue = usePrevious(curIndex)
  const [toogle, setToogle] = useState(0)
  useEffect(() => {
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
      },
    ],
  ])
  return (
    <>
      <Canvas
        camera={{
          fov: 45,
        }}
        style={{
          width: '100%',
          height: height - HeaderHeight - FooterHeight,
          paddingTop: '50px',
          bottom: 0,
        }}>
        <animated.perspectiveCamera rotation-y={rotation.y}>
          {/* <SkyComponent /> */}
          <group>
            <BrowserGroup />
          </group>
        </animated.perspectiveCamera>

        <ambientLight color={0xff4040} />
        <pointLight distance={10} intensity={10} color="white" position={[0, 0, 0]} />
      </Canvas>
    </>
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
