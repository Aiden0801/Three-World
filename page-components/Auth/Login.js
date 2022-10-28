import { signIn, useSession } from "next-auth/react"
import Head from 'next/head';
import { useRouter } from 'next/router'
import { Stack, Text } from '@mantine/core';
import { useEffect } from 'react';

import { DiscordButton, GithubButton, GoogleButton } from "../../components/Button"

export default function Login({ providers }) {
    const router = useRouter()

    const { data: session, status } = useSession()

    console.log(status);
    useEffect(() => {
        console.log(status);
        if (status === "authenticated") {
            router.push('./')
        }
    }, [status]);
    const handleLogIn = async (providerName) => {
        console.log(providerName);

        await signIn(providerName.toLowerCase(), { callbackUrl: 'http://localhost:3000/dashboard' });
    }

    return (
        <>
            <div style={{ width: '100%', height: '100vh', display: 'flex' }}>
                <Stack style={{ width: 300, height: 220, margin: 'auto', padding: '10px 10px 10px 10px' }} align="center" sx={(theme) => ({ backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[4], height: 300 })}>
                    <Text weight="bold" variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }} size="xl"> Login Method</Text>
                    <GoogleButton onClick={() => { handleLogIn('google') }}>With Google</GoogleButton>
                    <GithubButton onClick={() => { handleLogIn('github') }}>Login  with GitHub</GithubButton>
                    <DiscordButton onClick={() => { handleLogIn('discord') }}>Join with Discord</DiscordButton>
                </Stack>

            </div>
            {/* Object.values(providers).map((provider) => (
            <div key={provider.name}>
                <button onClick={() => { handleLogIn(provider.name) }}>
                    Sign in with {provider.name}
                </button>
            </div>
            )) */}

        </>
    )
}