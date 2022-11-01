import React from 'react'
import { BrowserControl } from '../../page-components/Browser'
import { Layout, Navbar } from '../../components/Layout'
import { Grid, SimpleGrid } from '@mantine/core';
const BrowserPage = () => {

    return (
        <>
            <Grid>
                <Grid.Col xs={2}>
                    <Navbar initialState={'browsers'} /></Grid.Col>
                <Grid.Col xs={10}>
                    <BrowserControl />
                </Grid.Col>
            </Grid>
        </>

    )
}

export default BrowserPage