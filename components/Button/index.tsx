import { Button, ButtonProps } from '@mantine/core'
import { GithubIcon, DiscordIcon } from '@mantine/ds'
import Image from 'next/image'
interface IButtonProps extends ButtonProps {
   onClick?: () => void
}
export function GoogleButton(props: IButtonProps) {
   return (
      <Button
         radius="xl"
         leftIcon={
            <Image src="/GoogleIcon.svg" alt="" width={36} height={36} />
         }
         variant="outline"
         color="black"
         {...props}
      />
   )
}
export function DiscordButton(props: IButtonProps) {
   return (
      <Button
         radius="xl"
         leftIcon={<DiscordIcon size={36} />}
         sx={(theme) => ({
            backgroundColor:
               theme.colorScheme === 'dark' ? '#5865F2' : '#5865F2',
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
         {...props}
         leftIcon={<GithubIcon size={36} />}
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
