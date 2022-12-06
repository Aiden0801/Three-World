import { GetServerSideProps } from 'next'
import React from 'react'
import PageWrapper from '../../components/MainPage/PageWrapper'
import { IPropsProjectPgae } from '../../types'
import { ProjectCofig } from '../../page-components/Dashboard'
export const getServerSideProps: GetServerSideProps = async (context) => {
   return {
      props: { name: context.params.id },
   }
}

const ProjectPage: React.FC<IPropsProjectPgae> = ({
   name,
}: IPropsProjectPgae) => {
   return (
      <>
         <PageWrapper currentPage="sessions">
            <ProjectCofig projectName={name} />
         </PageWrapper>
      </>
   )
}

export default ProjectPage
