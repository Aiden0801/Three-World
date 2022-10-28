import React from 'react'
import { User } from '../../page-components/User'
import { Layout, Navbar } from '../../components/Layout'
import { Grid, SimpleGrid } from '@mantine/core';
const UserPage = () => {
    return (
        <>
            <Grid>
                <Grid.Col xs={2}>
                    <Navbar initialState={'user'} /></Grid.Col>
                <Grid.Col xs={10}> <User /></Grid.Col>

            </Grid>

        </>

    )
}

export default UserPage