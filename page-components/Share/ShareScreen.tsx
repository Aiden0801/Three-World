import React from 'react'
import { useEffect, useState } from 'react'
import { getSession } from 'next-auth/react'
import { fetcher } from '../../lib/fetcher';
import { LoadingOverlay, Alert, Button } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons';
import { Space } from './index';
import { ControlPanel, BrowserStatus } from '../../components/ThreeJS'
import { setDataByIndex } from '../../store/browserSlice';
import { useDispatch } from 'react-redux';
export default function ShareScreen() {
    const dispatch = useDispatch();
    const [browsers, setBrowsers] = useState(null);
    const [isHandling, setIsHandling] = useState(false);
    const loadSession = async () => {
        let data = []
        setIsHandling(true);
        try {

            let session = await getSession();
            console.log("session", session);
            const userData = await fetcher('http://localhost:3000/api/users/getBrowsersByEmail', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: session.user.email,
                })
            });
            if (userData.browsers) {
                for (const browser of userData.browsers) {
                    let embed_URL = "";
                    if (browser.id) {
                        const result = await fetcher('http://localhost:3000/api/session/getSessionByID', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                _id: browser.id,
                            })
                        });
                        console.log(result);
                        data = [...data, {
                            name: result["name"],
                            url: result["embed_url"]
                        }];
                    }
                    else
                        data = [...data, {
                            name: "No Session",
                            url: "No Session",
                        }];
                }
                //            setBrowsers(userData.browsers);
                console.log(data);
                dispatch(setDataByIndex({
                    index: 0,
                    data: data[0],
                }));
                dispatch(setDataByIndex({
                    index: 1,
                    data: data[1],
                }));
                dispatch(setDataByIndex({
                    index: 2,
                    data: data[2],
                }));
                dispatch(setDataByIndex({
                    index: 3,
                    data: data[3]
                }));
                console.log("SetBrowsers", data);
                setBrowsers(data);
            }
        }
        catch (err) {
            console.error(err.message);
        }
        setIsHandling(false);
    }
    useEffect(() => {
        loadSession();
    }, []);
    return (
        <div >
            <LoadingOverlay visible={isHandling} overlayBlur={2} />
            {browsers && browsers.length == 4 ?
                <Space /> : <div>Loading </div>}
            <ControlPanel />
            {/* <BrowserStatus /> */}
        </div >
    )
}
