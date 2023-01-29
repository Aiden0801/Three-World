import { useState } from 'react'
import { z } from 'zod'
import {
  Button,
  Group,
  SimpleGrid,
  Select,
  Textarea,
  TextInput,
} from '@mantine/core'
import { IconSend } from '@tabler/icons'
import { showNotification } from '@mantine/notifications'
import { useForm, zodResolver } from '@mantine/form'
import logger from '@/utils/logger'

const contactReasons = [
  'Demo request',
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
  defaultReason?: typeof contactReasons[number]
}

export const ContactForm: React.FC<VPGContactProps> = ({
  onSubmit,
  defaultReason = 'Inquiries',
}) => {
  const [sending, setSending] = useState(false)
  const form = useForm<ContactFormValues>({
    validateInputOnBlur: true,
    validate: zodResolver(schema),
    initialValues: {
      name: '',
      email: '',
      message: '',
      reason: defaultReason,
    },
  })

  const handleSubmit = async (values: ContactFormValues) => {
    if (sending) return
    if (!onSubmit) {
      logger.warn('no submit function was passed to the contact form')
      throw new Error('Form submission not implemented')
    }
    setSending(true)
    try {
      const sent = await onSubmit(values)
      if (sent) {
        notifySuccess()
        form.reset()
      } else throw new Error('Form submission error')
    } catch (error) {
      notifyError()
    } finally {
      setSending(false)
    }
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        mb="sm"
        // fullWidth
        withAsterisk
        label="Email"
        placeholder="Your email"
        disabled={sending}
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
          disabled={sending}
          label="Name"
          withAsterisk
          placeholder="Your name"
          {...form.getInputProps('name')}
        />
        <Select
          // fullWidth
          disabled={sending}
          withAsterisk
          label="Reason for contact"
          placeholder="What would you like to talk us about?"
          data={contactReasons}
          {...form.getInputProps('reason')}
        />
      </SimpleGrid>

      <Textarea
        disabled={sending}
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
          loaderPosition="center"
          rightIcon={<IconSend stroke={1.5} size={20} />}
        >
          Send
        </Button>
      </Group>
    </form>
  )
}

function notifySuccess() {
  showNotification({
    title: 'Message sent',
    message: 'Thank you for contacting us, we will get back to you soon',
    color: 'teal',
    icon: <IconSend size={16} stroke={1.5} />,
  })
}

function notifyError() {
  showNotification({
    title: 'Message not sent',
    message: 'Something went wrong, please try again later',
    color: 'red',
    icon: <IconSend size={16} stroke={1.5} />,
  })
}
