import logger from '@/utils/logger'
import {
  Button,
  Card,
  Container,
  createStyles,
  Group,
  SimpleGrid,
  Select,
  Textarea,
  Text,
  TextInput,
  Box,
  Title,
} from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { IconSend } from '@tabler/icons'
import { useEffect, useState } from 'react'
import { z } from 'zod'
import { SectionTitle } from './section-title'

const contactReasons = [
  'Inquiries',
  'Partnership',
  'Services',
  'Feedback',
  'Other',
] as const

export const schema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters long'),
  email: z.string().email('Email must be a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters long'),
  reason: z.enum(contactReasons),
})

export type ContactFormValues = z.input<typeof schema>
export type ContactFormData = z.output<typeof schema>
export type VPGContactProps = {
  onSubmit: (values: ContactFormData) => Promise<boolean>
}

export function VPGContact({ onSubmit }: VPGContactProps) {
  const [sending, setSending] = useState(false)
  const form = useForm<ContactFormValues>({
    validateInputOnBlur: true,
    validate: zodResolver(schema),
    initialValues: {
      name: '',
      email: '',
      message: '',
      reason: 'Inquiries',
    },
  })

  const handleSubmit = async (values: ContactFormValues) => {
    if (sending) return
    setSending(true)
    if (!onSubmit) {
      logger.warn('no submit function was passed to the contact form')
      throw new Error('Form submission not implemented')
    }
    try {
      const sent = await onSubmit(values)
      if (sent) {
        showNotification({
          title: 'Message sent',
          message: 'Thank you for contacting us, we will get back to you soon',
          color: 'teal',
          icon: <IconSend size={16} stroke={1.5} />,
        })
        form.reset()
      } else throw new Error('Form submission error')
    } catch (error) {
      showNotification({
        title: 'Message not sent',
        message: 'Something went wrong, please try again later',
        color: 'red',
        icon: <IconSend size={16} stroke={1.5} />,
      })
    } finally {
      setSending(false)
    }
  }

  return (
    <Container size="lg" my="xl">
      <SimpleGrid
        breakpoints={[
          { maxWidth: 'sm', cols: 1 },
          { minWidth: 'sm', cols: 2 },
        ]}
      >
        <Box
          sx={(theme) => ({
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            padding: theme.spacing.md,
            [theme.fn.largerThan('sm')]: {
              backgroundColor: theme.colors[theme.primaryColor][8],
              borderRadius: theme.radius.md,
              margin: theme.spacing.xl,
              height: `calc(100% - ${theme.spacing.xl * 3}px)`,
              padding: theme.spacing.xl,
              transform: 'translateX(25%)',
              paddingRight: `${theme.spacing.xl * 1.5}%`,
              marginLeft: `-${theme.spacing.xl}%`,
              ['& > h2, > p']: {
                color: theme.white,
              },
            },
          })}
        >
          <SectionTitle order={2} align="left">
            Contact us
          </SectionTitle>
          <Text size="lg" align="left" mb="xl" component="p">
            We are always happy to hear from you. Please fill out the form and
            we will get back to you as soon as possible.
          </Text>
        </Box>

        <Card p="xl" radius="md" mb="xl" withBorder={false} shadow="xl">
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              mb="sm"
              // fullWidth
              withAsterisk
              label="Email"
              placeholder="Your email"
              {...form.getInputProps('email')}
            />
            <SimpleGrid
              mb="sm"
              breakpoints={[
                { maxWidth: 'sm', cols: 1 },
                { minWidth: 'md', cols: 2 },
              ]}
            >
              <TextInput
                // fullWidth
                label="Name"
                withAsterisk
                placeholder="Your name"
                {...form.getInputProps('name')}
              />
              <Select
                // fullWidth
                withAsterisk
                label="Reason for contact"
                placeholder="What would you like to talk us about?"
                data={contactReasons}
                {...form.getInputProps('reason')}
              />
            </SimpleGrid>

            <Textarea
              autosize
              minRows={6}
              maxRows={10}
              withAsterisk
              label="Message"
              placeholder="type your message"
              {...form.getInputProps('message')}
            />
            <Group my="sm" position="center">
              <Button
                type="submit"
                uppercase
                variant="subtle"
                size="lg"
                // fullWidth
                loading={sending}
                disabled={sending || !form.isValid()}
                loaderPosition="right"
                rightIcon={<IconSend stroke={1.5} size={20} />}
              >
                Send
              </Button>
            </Group>
          </form>
        </Card>
      </SimpleGrid>
    </Container>
  )
}
