import React, { useEffect, useState, useCallback } from 'react'
import {
    ScrollArea,
    Table,
    LoadingOverlay,
    createStyles,
    Container,
    Checkbox,
    ActionIcon,
    Footer,
    Button,
    Modal,
    Text,
    TextInput,
    SimpleGrid,
    Textarea
} from '@mantine/core';
import { IconPlus, IconListDetails, IconActivity } from '@tabler/icons';
import { useSession } from 'next-auth/react';
import { useForm } from '@mantine/form';
import { fetcher } from '../../lib/fetcher';
import { imageConfigDefault } from 'next/dist/shared/lib/image-config';

const useStyles = createStyles((theme) => ({
    container: {
        left: '200px',
        margin: '10px,10px,10px,10px',
    },
}));
const SessionControl = () => {

    const { data: session, status } = useSession();
    const [email, setEmail] = useState("");
    const [opened, setOpened] = useState(false);
    const [isHandling, setIsHandling] = useState(false);
    const { classes, theme } = useStyles();
    const [data, setData] = useState([]);
    const form = useForm({
        initialValues: {
            name: '',
            description: '',
        },
        validate: {
            name: (value) => (value.length < 1 ? 'Name Field Required' : null),
            description: (value) => (value.length < 1 ? 'Description Field Required' : null),
        },
    });

    const loadSessions = useCallback(async () => {
        console.log("Session Control LoadSessions");
        const session_data = await fetcher('api/session/getControlSession', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                creator: email,
            }),
        });
        setData(session_data ? session_data.user : []);
    }, [email])
    const init = useCallback(async () => {
        setIsHandling(true);
        await loadSessions();
        setIsHandling(false);
    }, [loadSessions]);
    useEffect(() => {

        if (status == "authenticated") {
            setEmail(session.user.email);
            init();
        }
        console.log(status);
    }, [status, init]);

    /*
    * hello world
    * */
    const handleCreateNewSession = async (values) => {
        const { name, description } = values;
        console.log(session.user.email, name);
        setIsHandling(true);
        const response = await fetcher('/api/session/createSession', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                sessionName: name,
                creator: session.user.email,
            }),
        });
        console.log(response)
        setOpened(false);
        await loadSessions();
        setIsHandling(false);
    }

    const handleActivateSession = async (_id) => {
        console.log(_id);
        setIsHandling(true);
        const response = await fetcher('/api/session/activateSessionByID', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                creator: session.user.email,
                _id: _id,
            }),
        });
        await loadSessions();
        setIsHandling(false);
    }
    const handleKillSession = async (_id) => {

        console.log(_id);
        setIsHandling(true);
        const response = await fetcher('/api/session/killSessionByID', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                _id: _id,
            }),
        });
        await loadSessions();
        setIsHandling(false);
    }
    return (

        <div className={classes.container}>
            <LoadingOverlay visible={isHandling} overlayBlur={2}></LoadingOverlay>
            <Modal
                title="Create New Session"
                opened={opened}
                onClose={() => setOpened(false)}
                overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
                overlayOpacity={0.55}
                overlayBlur={3}

            >

                <Text>Modal with size auto will fits its content</Text>
                <form onSubmit={form.onSubmit((values) => handleCreateNewSession(values))}>
                    <SimpleGrid cols={1}>
                        <TextInput
                            placeholder="Name"
                            label="Session Name"
                            withAsterisk
                            {...form.getInputProps('name')}
                        />
                        <Textarea
                            placeholder="Description"
                            label="Description"
                            withAsterisk
                            {...form.getInputProps('description')}
                        />
                        <Button type="submit" radius="md" size="md">Create Now</Button>


                    </SimpleGrid>
                </form>

            </Modal>
            <Container style={{
                textAlign: "center",
            }}>

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
                    Sessions
                </Text>
                <ScrollArea>
                    <Table striped withColumnBorders sx={{ minWidth: 800 }} verticalSpacing="xs">
                        <thead>
                            <tr>
                                {/* <th style={{ width: 40 }}>
                                    <Checkbox
                                        onChange={toggleAll}
                                        checked={selection.length === data.length}
                                        indeterminate={selection.length > 0 && selection.length !== data.length}
                                        transitionDuration={0}
                                    />
                                </th> */}
                                <th>Name</th>
                                <th>Users</th>
                                <th>Active</th>
                                <th>Actions</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.map((session, index) => {
                                // const selected = selection.includes(session._id);
                                return (
                                    <tr key={index}>
                                        {/* <td>
                                            <td>
                                                <Checkbox
                                                    checked={selection.includes(session._id)}
                                                    onChange={() => toggleRow(session._id)}
                                                    transitionDuration={0}
                                                />
                                            </td>
                                        </td> */}
                                        <td>
                                            {session.name}
                                        </td>
                                        <td>
                                            {session.users.length == 0 ? "No Available Users" : session.users.length + ' Users'}
                                        </td>
                                        <td>
                                            {session.isActive == true ? "Active" : "Dead"}
                                        </td>
                                        <td>
                                            {session.isActive ?
                                                <Button leftIcon={<IconActivity />}
                                                    onClick={() => handleKillSession(session._id)}
                                                    color="red"> Stop</Button>
                                                :
                                                <Button leftIcon={<IconActivity />}
                                                    onClick={() => handleActivateSession(session._id)}> Activate</Button>
                                            }
                                        </td>
                                        <td>
                                            <Button leftIcon={<IconListDetails />} color="green" component='a'
                                                href={`./sessions/${session._id}`}>Details</Button>
                                        </td>


                                    </tr>
                                )
                            })}
                        </tbody>

                    </Table>
                    <Button style={{ marginTop: '20px' }} onClick={() => {
                        setOpened(true);
                    }} rightIcon={<IconPlus size={18} stroke={1.5} />} color="green" pr={12}>
                        Create New
                    </Button>
                </ScrollArea>
            </Container>

        </div>
    )
}

export default SessionControl