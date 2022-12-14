import { GetServerSideProps } from 'next'
import React from 'react'
import { AppLayout } from '@/layouts/AppLayout'
import { IPropsProjectPgae } from '@/types'
import { ProjectCofig } from '@/page-components/Dashboard'
export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: { name: context.params.id },
  }
}

const ProjectPage: React.FC<IPropsProjectPgae> = ({
  name,
}: IPropsProjectPgae) => {
  return (
    <AppLayout currentPage="sessions">
      <ProjectCofig projectName={name} />
    </AppLayout>
  )
}

export default ProjectPage
