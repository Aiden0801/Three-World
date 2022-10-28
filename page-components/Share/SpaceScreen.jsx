import React from 'react'
import { Canvas } from '@react-three/fiber'
import { lazy, Suspense } from 'react';
import { CameraPosition } from '../../components/ThreeJS'
import { useState, useEffect } from 'react';
const SkyComponent = lazy(() => import("../../components/ThreeJS/sky"));
export default function SpaceScreen() {
    const [isBrowser, setIsBrowser] = useState(false);
    useEffect(() => {
        if (typeof window !== "undefined") {
            {
                setIsBrowser(true);
            }
        }
    }, []);
    return (
        <div style={{
            width: "100%",
            height: "100vh",
        }}>
            {isBrowser ? <Canvas
                camera={{
                    fov: 50,
                }}
            >
                <Suspense fallback={null}>
                    <SkyComponent />

                    <group >
                        <CameraPosition />
                    </group>
                    <Light />
                </Suspense>

            </Canvas >
                : <div></div>}
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