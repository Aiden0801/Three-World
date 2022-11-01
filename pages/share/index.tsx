import React from 'react'
import { Share } from '../../page-components/Share/index'
import { Navbar } from '../../components/Layout'
import { Grid } from '@mantine/core';
const SharePage = () => {
    return (
        <>
            <Grid>
                <Grid.Col xs={2}>
                    <Navbar initialState={'share'} /></Grid.Col>
                <Grid.Col xs={10}>
                    <Share></Share>
                </Grid.Col>
            </Grid>
        </>

    )
}

export default SharePage