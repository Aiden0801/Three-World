import { forwardRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { Button, ButtonProps, Tooltip } from '@mantine/core'
import { GithubIcon, DiscordIcon } from '@mantine/ds'
interface IButtonProps extends ButtonProps {
  onClick?: () => void
}

export function GoogleButton(props: IButtonProps) {
  return (
    <Button
      compact
      size="xl"
      radius="xl"
      leftIcon={<Image src="/GoogleIcon.svg" alt="" width={32} height={32} />}
      color="red.9"
      // variant="outline"
      {...props}
    />
  )
}
export function DiscordButton(props: IButtonProps) {
  return (
    <Button
      radius="xl"
      size="xl"
      leftIcon={<DiscordIcon size={32} />}
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? '#5865F2' : '#5865F2',
        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.fn.lighten('#5865F2', 0.05)
              : theme.fn.darken('#5865F2', 0.05),
        },
      })}
      {...props}
    />
  )
}

export function GithubButton(props: IButtonProps) {
  return (
    <Button
      radius="xl"
      size="xl"
      {...props}
      leftIcon={<GithubIcon size={32} />}
      sx={(theme) => ({
        backgroundColor:
          theme.colors.dark[theme.colorScheme === 'dark' ? 9 : 6],
        color: '#fff',
        '&:hover': {
          backgroundColor:
            theme.colors.dark[theme.colorScheme === 'dark' ? 9 : 6],
        },
      })}
    />
  )
}

export const SocialButton = {
  Google: GoogleButton,
  Discord: DiscordButton,
  Github: GithubButton,
}

export type IPropsToolTipButton = ButtonProps & {
  description?: string
  onClick?: () => void
}
export const ToolTipButton = forwardRef<HTMLButtonElement, IPropsToolTipButton>(
  ({ description, ...props }, _ref) => {
    return (
      <Tooltip label={description}>
        <Button {...props} />
      </Tooltip>
    )
  }
)
ToolTipButton.displayName = 'ToolTipButton'
export type IPropsLinkButton = ButtonProps & {
  href?: string
}
export const LinkButton = forwardRef<HTMLButtonElement, IPropsLinkButton>(
  ({ href, ...props }, _ref) => {
    return (
      <Link href={href} passHref>
        <Button {...props} />
      </Link>
    )
  }
)

LinkButton.displayName = 'LinkButton'
