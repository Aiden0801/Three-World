import React from 'react'
import { Dashboard } from '../page-components/Dashboard'
import { Navbar } from '../components/Layout'
import { Grid } from '@mantine/core';
const DashboardPage: React.FC = () => {
    return (
        <>
            <Grid>
                <Grid.Col xs={2}>
                    <Navbar initialState={'dashboard'} /></Grid.Col>
                <Grid.Col xs={10}> <Dashboard /></Grid.Col>

            </Grid>
        </>
    )
}

export default DashboardPage