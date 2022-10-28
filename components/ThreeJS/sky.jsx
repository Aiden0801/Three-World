import React from 'react'
import { useGLTF } from '@react-three/drei'

export default function Sky() {
    const model = useGLTF("http://localhost:3000/assets/sky.glb")
    return (
        <primitive object={model.scene} />
    )
}