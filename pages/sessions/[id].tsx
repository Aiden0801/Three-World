import { GetServerSideProps } from 'next'
import { IPropsSessionData, ISessionData } from '../../types'
import React from 'react'
import { createStyles, Selectors } from '@mantine/core'
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
   // await connectMongo()
   // const sessionData = (await fetcher(
   //    'http://localhost:3000/api/session/getSessionByID',
   //    {
   //       method: 'POST',
   //       headers: { 'Content-Type': 'application/json' },
   //       body: JSON.stringify({
   //          _id: context.params.id,
   //       }),
   //    }
   // )) as ISessionData
   // console.log("SessionData", res);
   return {
      props: { sessionID: context.params.id },
   }
}

const SessionDetailPage: React.FC<IPropsSessionData> = ({
   sessionID,
}: IPropsSessionData) => {
   const { classes, theme } = useStyles()
   return (
      <>
         <PageWrapper currentPage="sessions">
            <SessionDetail sessionID={sessionID} />
         </PageWrapper>
      </>
   )
}

export default SessionDetailPage
