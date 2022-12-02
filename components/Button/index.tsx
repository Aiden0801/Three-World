import { createStyles } from '@mantine/core'
import { Button, ButtonProps } from '@mantine/core'
import { GithubIcon, DiscordIcon } from '@mantine/ds'
import Image from 'next/image'
interface IButtonProps extends ButtonProps {
   onClick?: () => void
}

const useStyles = createStyles((theme) => ({
   button: {
      width: '400px',
      height: '50px',
   },
}))
export function GoogleButton(props: IButtonProps) {
   const { classes } = useStyles()
   return (
      <Button
         className={classes.button}
         compact
         size="xl"
         radius="xl"
         leftIcon={
            <Image src="/GoogleIcon.svg" alt="" width={50} height={50} />
         }
         color="red"
         sx={(theme) => ({
            backgroundColor: theme.colors.gray[0],
         })}
         variant="outline"
         {...props}
      />
   )
}
export function DiscordButton(props: IButtonProps) {
   const { classes } = useStyles()
   return (
      <Button
         className={classes.button}
         radius="xl"
         size="xl"
         leftIcon={<DiscordIcon size={50} />}
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
   const { classes } = useStyles()
   return (
      <Button
         className={classes.button}
         radius="xl"
         size="xl"
         {...props}
         leftIcon={<GithubIcon size={50} />}
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
