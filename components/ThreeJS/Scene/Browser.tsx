import Hyperbeam, { HyperbeamEmbed } from '@hyperbeam/web'
import { animated } from '@react-spring/three'
import * as THREE from 'three'

import { useWindowEvent } from '@mantine/hooks'
import { useTexture } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import React, { lazy, useCallback, useEffect, useRef, useState } from 'react'
import { useRecoilValue, useRecoilState } from 'recoil'
import { Object3D } from 'three'
import {
   currentBrowserIndex,
   currentBrowsers,
   currentUser,
} from '../../../utils/recoil/browser'
import { fetcher } from '../../../lib/fetcher'
import { serverURL } from '../../../config/urlcontrol'
import { showNotification } from '@mantine/notifications'
// const TvComponent = lazy(() => import('./TVModel'))
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
function Browser(props) {
   const texture = new THREE.Texture()
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

   const userBrowser = useRecoilValue(currentBrowsers)
   const userEmail = useRecoilValue(currentUser)
   const [curIndex, setCurIndex] = useRecoilState(currentBrowserIndex)
   useEffect(() => {
      material.side = THREE.DoubleSide
      defMaterial.side = THREE.DoubleSide
      console.log('render')
      loadBrowser()
      return () => {
         unloadBrowser()
      }
   }, [])
   useEffect(() => {
      loadBrowser()
   }, [userBrowser])
   useEffect(() => {
      if (hb) {
         if (curIndex == props.bid) hb.videoPaused = false
         else hb.videoPaused = true
      }
   }, [curIndex, props.bid])
   useWindowEvent('keydown', (event) => {
      if (curIndex == props.bid && hb && hb.tabs) {
         hb.sendEvent({
            type: 'keydown' as any,
            key: event.key,
            ctrlKey: event.ctrlKey,
            metaKey: event.metaKey,
         })
      }
   })
   useWindowEvent('keyup', (event) => {
      if (curIndex == props.bid && hb && hb.tabs) {
         hb.sendEvent({
            type: 'keyup' as any,
            key: event.key,
            ctrlKey: event.ctrlKey,
            metaKey: event.metaKey,
         })
      }
   })
   useWindowEvent('contextmenu', (event) => {
      if (curIndex == props.bid && hb && hb.tabs) {
         event.preventDefault()
      }
   })
   const unloadBrowser = useCallback(async () => {
      console.log('lol')
      console.log(userBrowser[props.bid].url)
      if (
         userBrowser[props.bid].url == 'none' ||
         userBrowser[props.bid].url == 'No Session'
      )
         return
      const response = await fetcher(
         `${serverURL}/api/session/removeParticipant`,
         {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
               email: userEmail,
               url: userBrowser[props.bid].url,
            }),
         }
      )
      if (hb === undefined) return

      hb.destroy()
      console.log('after ', hb)
   }, [props.bid, userBrowser, userEmail])
   const loadBrowser = useCallback(async () => {
      let embedURL = userBrowser[props.bid].url
      console.log('userBrowser', userBrowser)
      // let embedURL
      if (embedURL == null || embedURL == 'none' || embedURL == 'No Session')
         return
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
            webhookUserdata: { email: userEmail, url: embedURL },
         })
         hb.tabs.onUpdated.addListener(async (tabId, changeInfo) => {
            if (changeInfo.title) {
               const tabs = await hb.tabs.query({ active: true })
               console.log(props.bid, tabs[0].url)
               // setCurIndex()
               // dispatch(setURL(tabs[0].url))
               //                    currentSite.innerText = tabs[0].url;
            }
         })

         console.log('hyperbeam')
      } catch (e) {
         switch (e.name) {
            case 'TimedOutError':
               console.log('Request to load the embed URL timed out', e.message)
               break
            case 'TypeError':
               console.log(
                  'Invalid options passed into the Hyperbeam constructor',
                  e.message
               )
               break
            case 'SessionTerminatedError':
               handleOnSessionTerminated()
               console.log('Session has already been terminated', e.message)
               break
         }
      }
   }, [gl, hbContainer, props.bid, texture, userBrowser])
   const handleOnSessionTerminated = useCallback(() => {
      showNotification({
         title: `Session Ended`,
         message: `${
            userBrowser[props.bid].name
         } is Terminated! Contact the creator to activate it`,
         color: 'yellow',
         autoClose: false,
      })
   }, [])
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
            hb.sendEvent({
               type: eventtype,
               x: point.x / width + 0.5,
               y: point.y / height + 0.5,
               button: e.button,
            })
         }
      }
   }, [])
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
               userBrowser &&
               userBrowser[props.bid].url != 'none' &&
               userBrowser[props.bid].url != 'No Session'
                  ? material
                  : defMaterial
            }
            geometry={geometry}
            userData={{ hello: 'world' }}
            position={new THREE.Vector3(0, 0, 0.13)}
            rotation={new THREE.Euler(0, Math.PI, Math.PI)}
         />
         {/* <TvComponent /> */}
      </animated.group>
   )
}
export default React.memo(Browser)
