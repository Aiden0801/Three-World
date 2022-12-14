import { GetServerSideProps } from 'next'
import React from 'react'
import { SessionDetail } from '@/page-components/SessionControl'
import { AppLayout } from '@/layouts/AppLayout'
import { IPropsSessionData } from '@/types'

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: { sessionID: context.params.id },
  }
}

const SessionDetailPage: React.FC<IPropsSessionData> = ({
  sessionID,
}: IPropsSessionData) => {
  return (
    <AppLayout currentPage="sessions">
      <SessionDetail sessionID={sessionID} />
    </AppLayout>
  )
}

export default SessionDetailPage
