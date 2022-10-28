import { Layout, Navbar } from '../../components/Layout'
import { Grid } from '@mantine/core';
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';
import { ScrollArea, Table, LoadingOverlay, createStyles, Container, Group, ActionIcon, Footer, Button, Modal, Text, TextInput, SimpleGrid, Textarea } from '@mantine/core';

import { useRouter } from 'next/router'
import { useForm } from '@mantine/form';
import { fetcher } from '../../lib/fetcher';
import connectMongo from '../../api-lib/mongodb';
import { SessionDetail } from '../../page-components/SessionControl'
const useStyles = createStyles((theme) => ({
    container: {
        position: 'absoulte',
        left: '200px',
        margin: '10px,10px,10px,10px',
    },
}));
export async function getServerSideProps(context) {
    console.log(context.params.id);
    const db = await connectMongo();
    const sessionData = await fetcher('http://localhost:3000/api/session/getSessionByID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            _id: context.params.id,
        }),
    });
    return {
        props: { sessionData }
    };
}


const SessionDetailPage = ({ sessionData }) => {
    const { classes, theme } = useStyles();
    return (
        <>
            <Grid>
                <Grid.Col xs={2}>
                    <Navbar initialState={'Sessions'} /></Grid.Col>
                <Grid.Col xs={10}>
                    <SessionDetail sessionData={sessionData} />
                </Grid.Col>
            </Grid>
        </>

    )
}

export default SessionDetailPage