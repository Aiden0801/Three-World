import { Button, } from '@mantine/core';
import { GithubIcon, DiscordIcon, } from '@mantine/ds';
import Image from 'next/image'

export function GoogleButton(props) {
    return <Button leftIcon={<Image src="/GoogleIcon.svg" alt="" width={36} height={36} />} variant="outline" color="black" {...props} />;
}
export function DiscordButton(props) {
    return (
        <Button
            leftIcon={<DiscordIcon size={36} />}
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
    );
}

export function GithubButton(props) {
    return (
        <Button
            {...props}
            leftIcon={<GithubIcon size={36} />}
            sx={(theme) => ({
                backgroundColor: theme.colors.dark[theme.colorScheme === 'dark' ? 9 : 6],
                color: '#fff',
                '&:hover': {
                    backgroundColor: theme.colors.dark[theme.colorScheme === 'dark' ? 9 : 6],
                },
            })}
        />
    );
}

// export function SocialButtons() {
//     return (
//         <Group position="center" sx={{ padding: 15 }}>
//             <GoogleButton>Continue with Google</GoogleButton>
//             <TwitterButton href="https://twitter.com/mantinedev" target="_blank">
//                 Follow on Twitter
//             </TwitterButton>
//             <FacebookButton>Sign in with Facebook</FacebookButton>
//             <GithubButton>Login with GitHub</GithubButton>
//             <DiscordButton>Join Discord community</DiscordButton>
//         </Group>
//     );
// }