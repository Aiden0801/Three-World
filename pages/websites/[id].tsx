import { GetServerSideProps } from 'next'
import React from 'react'

import { AppLayout } from '@/layouts/AppLayout'
import { IPropsProjectPgae } from '@/types'
import { ProjectCofig } from '@/page-components/websites'
import { BASE_URL } from '@/config/constants'
import { fetcher } from '@/lib/fetcher'
/**
 * @vlad what does this actually do RIGHT NOW?
 * I imagine this is the way you want to get the `savedData` prop
 * (which should be a JSON (object) directly since next does handle it),
 * but right now serves... what purpose?
 */
export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.params.id
  const savedData = await await fetcher(`${BASE_URL.SERVER}/api/projects/${slug}/websiteconfig`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  })
  console.log('getServerSide', savedData)
  return {
    props: { name: context.params.id, savedData: savedData },
  }
}

const ProjectPage: React.FC<IPropsProjectPgae> = ({ name, savedData }: IPropsProjectPgae) => {
  return (
    <AppLayout currentPage="dashboard">
      <ProjectCofig projectName={name} configData={savedData} />
    </AppLayout>
  )
}

export default ProjectPage
