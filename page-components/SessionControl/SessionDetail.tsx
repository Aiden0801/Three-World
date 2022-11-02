import React, { useEffect, useState } from 'react'
import { List, ThemeIcon, LoadingOverlay, Modal, Button, Grid, Container, createStyles, Text, TextInput, SimpleGrid, Textarea, ScrollArea } from '@mantine/core';
import { IconArrowBack, IconActivity, IconCircleCheck } from '@tabler/icons';
import { IconPlus } from '@tabler/icons';
import { useSession } from 'next-auth/react';
import { useForm } from '@mantine/form';
import { fetcher } from '../../lib/fetcher';
import { IPropsSessionData, ISessionData } from '../../types';
// Users with a higher priority will preempt the control of lower priority users.
import { useWindowEvent } from '@mantine/hooks';
const useStyles = createStyles((theme) => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        margin: '10px,10px,10px,10px',
    },
}));
const SessionDetail = ({ sessionData }: IPropsSessionData) => {
    console.log("SessionDetail", sessionData);
    const { data: session, status } = useSession();
    const [opened, setOpened] = useState(false);
    const [isHandling, setIsHandling] = useState(false);
    const { classes, theme } = useStyles();
    const [users, setUser] = useState([]);
    const [detailData, setDetailData] = useState(sessionData);

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
        loadSessionDetail();
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
        loadSessionDetail();
        setIsHandling(false);
    }
    const form = useForm({
        initialValues: {
            email: '',
        },
        validate: {
            email: (value) => (value.length < 1 ? 'Name Field Required' : null),
        },
    });
    useWindowEvent('keydown', (event) => {
        console.log(event);
    });
    const loadSessionDetail = async () => {
        console.log("loadSessionDetail", detailData);
        const response = await fetcher('api/session/getSessionByID', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                _id: detailData._id,
            }),
        });
        console.log("response", response);
        setDetailData(response ? response : null);
    }
    const handleAllowUser = async (values) => {
        const { email } = values;
        setIsHandling(true);
        console.log("handleAllowUser", detailData.creator, detailData._id, email);
        const response = await fetcher('/api/session/allowUsertoSession', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                creator: detailData.creator,
                _id: detailData._id,
                email: email,
            }),
        });
        console.log("handleAllowUser", response)
        await loadSessionDetail();
        setOpened(false);
        setIsHandling(false);
    }
    return (
        <div className={classes.container} >
            <LoadingOverlay visible={isHandling} overlayBlur={2} ></LoadingOverlay>
            <Modal
                title="Allow User"
                opened={opened}
                onClose={() => setOpened(false)}
                overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
                overlayOpacity={0.55}
                overlayBlur={3}

            >
                <Text>Allow New User to Access this Session</Text>
                <form onSubmit={form.onSubmit((values) => handleAllowUser(values))}>
                    <SimpleGrid cols={1}>
                        <TextInput
                            placeholder="Name"
                            label="User Email"
                            withAsterisk
                            {...form.getInputProps('email')}
                        />
                        <Button type="submit" radius="md" size="md">Allow</Button>
                    </SimpleGrid>
                </form>

            </Modal >
            <Container style={{
            }}

                size="xl" px="xs"
            >
                <Text
                    component="span"
                    align="center"

                    variant="gradient"
                    gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
                    weight={700}
                    style={{
                        marginTop: "30px",
                        fontFamily: 'Greycliff CF, sans-serif',
                        fontSize: '50px'
                    }}
                >
                    Session Detail
                </Text>
                <Grid columns={12} >
                    <Grid.Col span={3}>
                        <Text size="xl">Session Name</Text>
                    </Grid.Col>

                    <Grid.Col span={9}>
                        <Text size="xl">{detailData.name}</Text>
                    </Grid.Col>
                    <Grid.Col span={3}>
                        <Text size="xl">Session Description</Text>
                    </Grid.Col>

                    <Grid.Col span={9}>
                        <Text size="xl">ASKDSJAKLD</Text>
                    </Grid.Col>

                    <Grid.Col span={3}>
                        <Text size="xl">Session Status</Text>
                    </Grid.Col>
                    <Grid.Col span={3}>
                        {detailData.isActive ?
                            <Text size="xl">Active</Text>
                            :
                            <Text size="xl">Dead</Text>
                        }
                    </Grid.Col>
                    <Grid.Col span={6}>
                        {detailData.isActive ?
                            <Button leftIcon={<IconActivity />} onClick={() => handleKillSession(detailData._id)} color="red"> Stop</Button>
                            :
                            <Button leftIcon={<IconActivity />} onClick={() => handleActivateSession(detailData._id)}> Activate</Button>
                        }
                    </Grid.Col>
                    <Grid.Col span={3}>

                        <Text size="xl">Session Users</Text>
                    </Grid.Col>
                    <Grid.Col span={6} >
                        {detailData.users.length === 0 ?
                            <Text size="xl">No Users Available</Text> :
                            <></>
                        }
                        <ScrollArea style={{ height: 500 }}>
                            <List
                                spacing="xs"
                                size="sm"
                                center
                                icon={
                                    <ThemeIcon color="teal" size={24} radius="xl">
                                        <IconCircleCheck size={16} />
                                    </ThemeIcon>
                                }
                            >
                                {detailData.users.map((user, index) => {
                                    // console.log(index, user.email)
                                    // <div key={index}>AAAA</div>
                                    return (
                                        <List.Item key={index}>
                                            <Text size="xl" >{user.email}</Text>
                                        </List.Item>
                                    )
                                })}
                            </List>

                        </ScrollArea>
                    </Grid.Col>

                    <Grid.Col span={12}>

                        <Button onClick={() => { setOpened(true); }} rightIcon={<IconPlus size={18} stroke={1.5} />} color="green" pr={12}>
                            Allow New User
                        </Button>
                    </Grid.Col>
                </Grid>
                <Button
                    size="xl"
                    style={{
                        position: 'absolute',
                        right: '20px',
                        bottom: '30px'
                    }}
                    component="a" href='./' leftIcon={<IconArrowBack size={18} stroke={1.5} />} color="red" pr={20}>
                    Back
                </Button>
            </Container>

        </div >
    )
}

export default SessionDetail