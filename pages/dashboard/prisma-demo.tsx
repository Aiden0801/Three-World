import { AppLayout } from '@/layouts/AppLayout'
import {
  Accordion,
  Card,
  Container,
  List,
  SimpleGrid,
  Text,
  Title,
} from '@mantine/core'
import { PrismaClient } from '@prisma/client'
import { InferGetServerSidePropsType } from 'next'

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
                    <Title order={3} transform="uppercase">
                      {user.name}
                    </Title>
                    <Text size="sm">{user.email}</Text>
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
                  <Title order={3}>{website.name}</Title>
                  <Text component="p" color="dimmed">
                    {website.slug}
                  </Text>
                  {website.template.sections.length ? (
                    <List>
                      {website.template.sections.map((section) => (
                        <List.Item key={section.title}>
                          {section.title}
                        </List.Item>
                      ))}
                    </List>
                  ) : (
                    <Text component="p" color="dimmed">
                      No sections
                    </Text>
                  )}
                </Card>
              ))}
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Container>
    </AppLayout>
  )
}
