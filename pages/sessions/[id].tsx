import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import { IPropsSessionData, ISessionData } from '../../types'
import { InferGetServerSidePropsType } from 'next'
import { Layout, Navbar } from '../../components/Layout'
import { Grid } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import {
   ScrollArea,
   Table,
   LoadingOverlay,
   createStyles,
   Selectors,
   MantineTheme,
} from '@mantine/core'
import PageWrapper from '../../page-components/utils/AppWrapper'
import { fetcher } from '../../lib/fetcher'
import connectMongo from '../../api-lib/mongodb'
import { SessionDetail } from '../../page-components/SessionControl'
const useStyles = createStyles(() => ({
   container: {
      position: 'absolute',
      left: '200px',
      margin: '10px,10px,10px,10px',
   },
}))
type ComponentStylesNames = Selectors<typeof useStyles>
export const getServerSideProps: GetServerSideProps = async (context) => {
   const db = await connectMongo()
   const sessionData = (await fetcher(
      'http://localhost:3000/api/session/getSessionByID',
      {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
            _id: context.params.id,
         }),
      }
   )) as ISessionData
   // console.log("SessionData", res);
   return {
      props: { sessionData },
   }
}

const SessionDetailPage: React.FC<IPropsSessionData> = ({
   sessionData,
}: IPropsSessionData) => {
   const { classes, theme } = useStyles()
   return (
      <>
         <PageWrapper>
            <SessionDetail sessionData={sessionData} />
         </PageWrapper>
      </>
   )
}

export default SessionDetailPage
