import { AppLayout } from '@/layouts/AppLayout'
import { Accordion, Card, Container, SimpleGrid } from '@mantine/core'
import { PrismaClient } from '@prisma/client'
import { InferGetServerSidePropsType } from 'next'
import { useEffect } from 'react'

const prisma = new PrismaClient()

export async function getServerSideProps() {
  const users = await prisma.users.findMany({})
  const websites = await prisma.websiteconfigs.findMany({})
  return {
    props: {
      users,
      websites,
    },
  }
}

export default function PrismaDemo(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  return (
    <AppLayout currentPage="prisma demo">
      <Container size="xl" pt="xl">
        <Accordion>
          <Accordion.Item value="Users">
            <Accordion.Control>Users</Accordion.Control>
            <Accordion.Panel>
              <SimpleGrid
                breakpoints={[
                  { maxWidth: 'xs', cols: 1, spacing: 'md' },
                  { minWidth: 'md', cols: 3, spacing: 'sm' },
                  { minWidth: 'lg', cols: 4, spacing: 'sm' },
                ]}
              >
                {props.users.map((user) => (
                  <Card key={user.id}>
                    <h1>{user.name}</h1>
                    <p>{user.email}</p>
                  </Card>
                ))}
              </SimpleGrid>
            </Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="Websites">
            <Accordion.Control>Websites</Accordion.Control>
            <Accordion.Panel>
              {props.websites.map((website) => (
                <Card key={website.id}>
                  <h1>{website.name}</h1>
                  <p>{website.slug}</p>
                  <p>
                    {website.template.sections.map((section) => (
                      <span key={section.title}>{section.title}</span>
                    ))}
                  </p>
                </Card>
              ))}
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Container>
    </AppLayout>
  )
}
