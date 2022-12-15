import { GetServerSideProps } from 'next'
import React from 'react'

import { AppLayout } from '@/layouts/AppLayout'
import { IPropsProjectPgae } from '@/types'
import { ProjectCofig } from '@/page-components/Dashboard'

/**
 * @vlad what does this actually do RIGHT NOW?
 * I imagine this is the way you want to get the `savedData` prop
 * (which should be a JSON (object) directly since next does handle it),
 * but right now serves... what purpose?
 */
export const getServerSideProps: GetServerSideProps = async (context) => {
  const name = context.params.id
  return {
    props: { name: context.params.id },
  }
}

const ProjectPage: React.FC<IPropsProjectPgae> = ({
  name,
  savedData,
}: IPropsProjectPgae) => {
  return (
    <AppLayout currentPage="sessions">
      <ProjectCofig projectName={name} />
    </AppLayout>
  )
}

export default ProjectPage
