import React, { useState, useEffect } from 'react'
import { ScrollArea, Table, LoadingOverlay, createStyles, Container, Group, ActionIcon, Footer, Button, Modal, Text, TextInput, SimpleGrid, Textarea, Divider } from '@mantine/core';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { ModalsProvider } from '@mantine/modals';
import { openConfirmModal } from '@mantine/modals';
import { useSession } from 'next-auth/react';
import { fetcher } from '../../lib/fetcher';
import { IconGripVertical } from '@tabler/icons';

import styled from 'styled-components';
const Item = styled.tr;

const useStyles = createStyles((theme) => ({
    container: {
        position: 'absolute',
        left: '200px',
        margin: '10px,10px,10px,10px',
        marginTop: '20px',
    },
}));
export default function BrowserControl() {
    const { data: session, status } = useSession();
    const { classes, theme } = useStyles();
    const [session_data, setSessionData] = useState([]);
    const [browser_data, setBrowserData] = useState([]);
    const [isBrowser, setIsBrowser] = useState(false);

    const [isHandling, setIsHandling] = useState(false);
    const loadSessions = async () => {
        console.log("loadSessions", session.user.email);
        const data = await fetcher('http://localhost:3000/api/session/getAvailableSessions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: session.user.email,
            }),
        });
        console.log(data);
        setSessionData(data ? data.user : []);
    }
    const loadBrowsers = async () => {
        console.log("loaBrowsers", session.user.email);
        const data = await fetcher('http://localhost:3000/api/users/getBrowsersByEmail', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: session.user.email,
            }),
        });
        console.log(data);
        setBrowserData(data ? data.browsers : []);
    }
    const openModal = (session_id, browser_id) => openConfirmModal({
        title: 'Please confirm your action',
        children: (
            <Text size="sm">
                Do you want to set the SESSION {session_id} to the Browser {browser_id}?
            </Text>
        ),
        labels: { confirm: 'Confirm', cancel: 'Cancel' },
        onConfirm: () => handleSetSessionToBrowser(session_id, browser_id),
        onCancel: () => console.log('Canceld'),
    });
    const handleSetSessionToBrowser = async (session_id, browser_id) => {
        setIsHandling(true);
        const data = await fetcher('http://localhost:3000/api/session/setSessiontoBrowser', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: session.user.email,
                _id: session_id,
                bIndex: browser_id,
            }),
        });
        console.log(data);
        // await loadSessions();
        await loadBrowsers();
        setIsHandling(false);

    }
    const handleOnDragEnd = (result) => {
        if (!result.destination) return;
        if (result.destination.droppableId !== 'sessions')
            openModal(result.draggableId, result.destination.droppableId);
        console.log(result);
    }
    const init = async () => {

        setIsHandling(true);
        await loadSessions();
        await loadBrowsers();
        setIsHandling(false);
    }
    useEffect(() => {
        if (typeof window !== "undefined") {
            {
                console.log('AAA');
                setIsBrowser(true);
            }
        }
    }, []);
    useEffect(() => {
        if (status == "authenticated") {
            init();
        }
        console.log(status);
    }, [status]);
    return (
        <ModalsProvider>
            <div className={classes.container} >
                {isBrowser ? <Container style={{
                }}>
                    <LoadingOverlay visible={isHandling} overlayBlur={2} ></LoadingOverlay>
                    <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Text
                            component="span"
                            align="center"

                            variant="gradient"
                            gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
                            weight={700}
                            style={{
                                fontFamily: 'Greycliff CF, sans-serif',
                                fontSize: '50px'
                            }}
                        >
                            Browsers
                        </Text>
                        <Table striped withColumnBorders sx={{ minWidth: 800 }} verticalSpacing="xs">
                            <thead>
                                <tr>
                                    <th>Index</th>
                                    <th>Session Name</th>
                                </tr>
                            </thead>

                            <tbody >
                                {browser_data && browser_data.map((browser, index) => (

                                    <Droppable key={index} droppableId={index.toString()} >
                                        {(provided) => (
                                            <tr  {...provided.droppableProps} ref={provided.innerRef}>
                                                <td>
                                                    {index}
                                                </td>
                                                <td>
                                                    {browser.name === "" ? "No Session" : browser.name}
                                                </td>

                                                {provided.placeholder}
                                            </tr>
                                        )}
                                    </Droppable>
                                ))}
                            </tbody>
                        </Table>
                        <Divider my="xl" size={10} color="blue"></Divider>
                        <Text
                            component="span"
                            align="center"

                            variant="gradient"
                            gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
                            weight={700}
                            style={{
                                fontFamily: 'Greycliff CF, sans-serif',
                                fontSize: '50px'
                            }}
                        >
                            Available Sessions
                        </Text>
                        <ScrollArea style={{ height: '500px' }}>
                            <Table striped withColumnBorders sx={{ minWidth: 800 }} verticalSpacing="xs">
                                <thead>
                                    <tr>
                                        <th>Drag</th>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Creator</th>
                                        <th>Active</th>
                                    </tr>
                                </thead>

                                <Droppable droppableId="sessions" isDropDisabled={true}>
                                    {(provided, snapshot) => (
                                        <tbody ref={provided.innerRef}>
                                            {session_data && session_data.map((session, index) => (
                                                <Draggable
                                                    key={session.name}
                                                    draggableId={session._id}
                                                    index={index}>
                                                    {(provided, snapshot) => (
                                                        <>
                                                            <tr ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                isDragging={snapshot.isDragging}
                                                                style={
                                                                    provided.draggableProps
                                                                        .style
                                                                }
                                                            >
                                                                <td>
                                                                    <div
                                                                        {...provided.dragHandleProps} >
                                                                        <IconGripVertical size={18} stroke={1.5} />
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    {session._id}
                                                                </td>
                                                                <td>
                                                                    {session.name}
                                                                </td>
                                                                <td>
                                                                    {session.creator}
                                                                </td>
                                                                <td>
                                                                    {session.isActive == true ? "Active" : "Dead"}
                                                                </td>
                                                            </tr>
                                                            {snapshot.isDragging && (

                                                                <tr style={{
                                                                    display: "none !important",
                                                                    transform: "none !important",
                                                                }}
                                                                >
                                                                    <td>
                                                                        <div>
                                                                            <IconGripVertical size={18} stroke={1.5} />
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        {session._id}
                                                                    </td>
                                                                    <td>
                                                                        {session.name}
                                                                    </td>
                                                                    <td>
                                                                        {session.creator}
                                                                    </td>
                                                                    <td>
                                                                        {session.isActive == true ? "Active" : "Dead"}
                                                                    </td>
                                                                </tr>
                                                            )}
                                                        </>


                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </tbody>
                                    )}
                                </Droppable>
                            </Table>
                        </ScrollArea>
                    </DragDropContext>

                </Container> : null
                }



            </div >
        </ModalsProvider>

    )
}
