import React from 'react'
import { useGLTF } from '@react-three/drei'
import { BASE_URL } from '@/config/constants'

export default function Sky() {
   const model = useGLTF(`${BASE_URL.SERVER}/assets/sky.glb`)
   return <primitive object={model.scene} />
}
