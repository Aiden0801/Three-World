import { GetServerSideProps } from 'next'
import React from 'react'
import { SessionDetail } from '../../page-components/SessionControl'
import PageWrapper from '../../components/MainPage/PageWrapper'
import { IPropsSessionData } from '../../types'
export const getServerSideProps: GetServerSideProps = async (context) => {
   return {
      props: { sessionID: context.params.id },
   }
}

const SessionDetailPage: React.FC<IPropsSessionData> = ({
   sessionID,
}: IPropsSessionData) => {
   return (
      <>
         <PageWrapper currentPage="sessions">
            <SessionDetail sessionID={sessionID} />
         </PageWrapper>
      </>
   )
}

export default SessionDetailPage
