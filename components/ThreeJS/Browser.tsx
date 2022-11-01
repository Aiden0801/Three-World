import * as THREE from 'three'
import Hyperbeam from "@hyperbeam/web"
import { useSpring, animated, config } from "@react-spring/three";

import React, { lazy, useEffect, useCallback } from 'react'
import { useState, useRef, Suspense, useMemo } from 'react'
import { Canvas, useThree, useFrame, useLoader } from '@react-three/fiber'
import { useTexture, Html } from "@react-three/drei"
import { useDispatch, useSelector } from "react-redux";
import { setURL, getDataByIndex, getCurrentBrowser, getCurrentBrowserData } from '../../store/browserSlice';

import { useWindowEvent } from '@mantine/hooks';
const TvComponent = lazy(() => import("./TvModel"));
// import display from './assets/tv_screen.glb';
let hb;
/***
 * 
 * 
 *  
 * 
 * 
 * 
 */
export default function Browser(props) {
    // const authState = useSelector()
    const dispatch = useDispatch();
    const texture = new THREE.Texture();
    const curBrowser = useSelector(getCurrentBrowserData);
    const browserData = useSelector(getDataByIndex(props.bid));
    const deftexture = useTexture('loading.jpg');
    const [defMaterial, setDefmaterial] = useState(new THREE.MeshBasicMaterial({ map: deftexture }));
    const hbContainer = document.createElement('div');
    const meshobject = useRef()
    const monitor = useRef()
    const width = 5.6
    const height = 3.3
    const [active, setActive] = useState(false);
    const [geometry, setgeometry] = useState(new THREE.PlaneGeometry(width, height));
    const [material, setMaterial] = useState(new THREE.MeshBasicMaterial({ map: texture }));
    const title = React.createElement('div', { id: "hbContainer" }, '');
    const { viewport, gl, scene } = useThree();
    let room = ""
    useEffect(() => {
        material.side = THREE.DoubleSide;
        defMaterial.side = THREE.DoubleSide;

        loadBrowser();
    }, []);
    useWindowEvent('keydown', (event) => {
        if (curBrowser.index == props.bid && hb && hb.tabs) {
            hb.sendEvent(event);
        }
    });
    useWindowEvent('keyup', (event) => {
        if (curBrowser.index == props.bid && hb && hb.tabs) {
            hb.sendEvent(event);
        }
    });
    useWindowEvent('contextmenu', (event) => {
        if (curBrowser.index == props.bid && hb && hb.tabs) {
            event.preventDefault();
        }
    });
    const loadBrowser = (async () => {
        let embedURL = browserData["url"];
        // let embedURL;
        console.log("browserData", props.bid, embedURL);

        if (embedURL == null || embedURL == "none") return;
        // let flag = false;
        // if (props.bid == "1")
        //     flag = true;
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
                        gl.copyTextureToTexture(new THREE.Vector2(0, 0), new THREE.Texture(frame as HTMLVideoElement), texture)
                    }
                },
            })
            hb.tabs.onUpdated.addListener(async (tabId, changeInfo) => {
                if (changeInfo.title) {
                    const tabs = await hb.tabs.query({ active: true });
                    console.log(props.bid, tabs[0].url);
                    dispatch(setURL(tabs[0].url));
                    //                    currentSite.innerText = tabs[0].url;
                }
            })

            console.log('hyperbeam');
        }
        catch (err) {
            console.log(err.message);
        }
    })

    const handleMouseEvent = useCallback((e) => {
        let point = e.point;
        let eventtype;
        switch (e.type) {
            case "pointermove":
                eventtype = "mousemove";
                break;
            case "pointerdown":
                eventtype = "mousedown";
                break;
            case "pointerup":
                eventtype = "mouseup";
                break;
            case "contextmenu":
                eventtype = "contextmenu";
                break;
            default:
                eventtype = "";
                break;
        }
        if (meshobject && meshobject.current) {
            (meshobject.current as any).worldToLocal(point);
            if (hb && e.eventtype != "") {
                hb.sendEvent({
                    type: eventtype,
                    x: point.x / width + 0.5,
                    y: point.y / height + 0.5,
                    button: e.button
                })
            }

        }
    }, []);
    useFrame(() => {
    })
    return (
        <animated.group {...props}
        >

            <mesh
                onClick={handleMouseEvent}
                onPointerMove={handleMouseEvent}
                onPointerUp={handleMouseEvent}
                onPointerDown={handleMouseEvent}
                onContextMenu={handleMouseEvent}
                ref={meshobject}
                material={(curBrowser && curBrowser.data.url != 'none' && curBrowser.data.url != "No Session") ? material : defMaterial}
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