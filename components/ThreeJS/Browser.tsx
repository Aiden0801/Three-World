import * as THREE from 'three'
import Hyperbeam, { HyperbeamEmbed } from '@hyperbeam/web'
import { useSpring, animated, config } from '@react-spring/three'

import React, { lazy, useEffect, useCallback } from 'react'
import { useState, useRef, Suspense, useMemo } from 'react'
import { Canvas, useThree, useFrame, useLoader } from '@react-three/fiber'
import { useTexture, Html } from '@react-three/drei'
import { useDispatch, useSelector } from 'react-redux'
import {
   setURL,
   getDataByIndex,
   getCurrentBrowser,
   getCurrentBrowserData,
} from '../../store/browserSlice'

import { useWindowEvent } from '@mantine/hooks'
import { Object3D } from 'three'
const TvComponent = lazy(() => import('./TvModel'))
// import display from './assets/tv_screen.glb';
let hb: HyperbeamEmbed | undefined
/***
 *
 *
 *
 *
 *
 *
 */
const copypos = new THREE.Vector2(0, 0)
const copytexture = new THREE.Texture()

const width = 5.6
const height = 3.3
const geometry = new THREE.PlaneGeometry(width, height)
export default function Browser(props) {
   const dispatch = useDispatch()
   const texture = new THREE.Texture()
   const curBrowser = useSelector(getCurrentBrowserData)
   const browserData = useSelector(getDataByIndex(props.bid))
   const deftexture = useTexture('loading.jpg')
   const [defMaterial, setDefmaterial] = useState(
      new THREE.MeshBasicMaterial({ map: deftexture })
   )
   const hbContainer = document.createElement('div')
   const meshobject = useRef()

   const [material, setMaterial] = useState(
      new THREE.MeshBasicMaterial({ map: texture })
   )
   const { viewport, gl, scene } = useThree()
   useEffect(() => {
      material.side = THREE.DoubleSide
      defMaterial.side = THREE.DoubleSide

      loadBrowser()
      return () => {
         if (hb) hb.destroy()
      }
   }, [])
   useWindowEvent('keydown', (event) => {
      if (curBrowser.index == props.bid && hb && hb.tabs) {
         hb.sendEvent({
            type: 'keydown' as any,
            key: event.key,
            ctrlKey: event.ctrlKey,
            metaKey: event.metaKey,
         })
      }
   })
   useWindowEvent('keyup', (event) => {
      if (curBrowser.index == props.bid && hb && hb.tabs) {
         hb.sendEvent({
            type: 'keyup' as any,
            key: event.key,
            ctrlKey: event.ctrlKey,
            metaKey: event.metaKey,
         })
      }
   })
   useWindowEvent('contextmenu', (event) => {
      if (curBrowser.index == props.bid && hb && hb.tabs) {
         event.preventDefault()
      }
   })
   const loadBrowser = async () => {
      let embedURL = browserData['url']
      // let embedURL;
      console.log('browserData', props.bid, embedURL)

      if (embedURL == null || embedURL == 'none') return
      try {
         hb = await Hyperbeam(hbContainer, embedURL, {
            delegateKeyboard: false,
            frameCb: (frame) => {
               if (texture.image === null) {
                  if (frame.constructor === HTMLVideoElement) {
                     frame.width = frame.videoWidth
                     frame.height = frame.videoHeight
                  }
                  texture.image = frame
                  texture.needsUpdate = true
               } else {
                  var copytexture = new THREE.Texture(frame as HTMLVideoElement)
                  gl.copyTextureToTexture(copypos, copytexture, texture)
               }
            },
         })
         hb.tabs.onUpdated.addListener(async (tabId, changeInfo) => {
            if (changeInfo.title) {
               const tabs = await hb.tabs.query({ active: true })
               console.log(props.bid, tabs[0].url)
               dispatch(setURL(tabs[0].url))
               //                    currentSite.innerText = tabs[0].url;
            }
         })

         console.log('hyperbeam')
      } catch (err) {
         console.log(err.message)
      }
   }

   const handleMouseEvent = useCallback((e) => {
      let point = e.point
      let eventtype
      switch (e.type) {
         case 'pointermove':
            eventtype = 'mousemove'
            break
         case 'pointerdown':
            eventtype = 'mousedown'
            break
         case 'pointerup':
            eventtype = 'mouseup'
            break
         case 'contextmenu':
            eventtype = 'contextmenu'
            break
         default:
            eventtype = ''
            break
      }
      if (meshobject && meshobject.current) {
         ;(meshobject.current as Object3D).worldToLocal(point)
         if (hb && e.eventtype != '') {
            console.log('mouseenvent')
            hb.sendEvent({
               type: eventtype,
               x: point.x / width + 0.5,
               y: point.y / height + 0.5,
               button: e.button,
            })
         }
      }
   }, [])
   useFrame(() => {})
   return (
      <animated.group {...props}>
         <mesh
            onClick={handleMouseEvent}
            onPointerMove={handleMouseEvent}
            onPointerUp={handleMouseEvent}
            onPointerDown={handleMouseEvent}
            onContextMenu={handleMouseEvent}
            ref={meshobject}
            material={
               curBrowser &&
               curBrowser.data.url != 'none' &&
               curBrowser.data.url != 'No Session'
                  ? material
                  : defMaterial
            }
            geometry={geometry}
            visible
            userData={{ hello: 'world' }}
            position={new THREE.Vector3(0, 0, 0.13)}
            rotation={new THREE.Euler(0, Math.PI, Math.PI)}
         />
         <TvComponent />
      </animated.group>
   )
}
