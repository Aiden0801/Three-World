import React from 'react'
import { useGLTF } from '@react-three/drei'
import { serverURL } from '../../config/urlcontrol'
export default function Sky() {
   const model = useGLTF(`${serverURL}/assets/sky.glb`)
   return <primitive object={model.scene} />
}
