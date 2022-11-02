import React from 'react'
import { useGLTF } from '@react-three/drei'
export default function Model() {
    const model = useGLTF("assets/tvModel.glb")
    return (
        <primitive object={model.scene} />
    )
}
