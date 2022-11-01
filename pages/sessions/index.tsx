import React from 'react'
import { SessionControl } from '../../page-components/SessionControl'
import { Layout, Navbar } from '../../components/Layout'
import { Grid, SimpleGrid } from '@mantine/core';
const SessionPage = () => {
    return (
        <>
            <Grid>
                <Grid.Col xs={2}>
                    <Navbar initialState={'sessions'} /></Grid.Col>
                <Grid.Col xs={10}>
                    <SessionControl />
                </Grid.Col>
            </Grid>
        </>

    )
}

export default SessionPage