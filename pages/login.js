// import Head from 'next/head';
// import Layout, { siteTitle } from '../components/layout';
// import utilStyles from '../../styles/utils.module.css';
// import { IconEyeCheck, IconEyeOff } from '@tabler/icons';
// import { useForm } from '@mantine/form';
// import { TextInput, Button, Group, Box, PasswordInput } from '@mantine/core';
// import { randomId } from '@mantine/hooks';
// import { handleClientScriptLoad } from 'next/script';
// import { signIn } from 'next-auth/react'
// export default function Login() {
//     const form = useForm({
//         initialValues: {
//             email: '',
//             password: '',
//         },

//         validate: {
//             email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
//         },
//     });
//     const handleSignIn = () => {
//         console.log(form.values);
//         signIn();
//     }
//     return (
//         <Box sx={{ maxWidth: 300 }} mx="auto">
//             <form onSubmit={form.onSubmit(() => { handleSignIn() })}>
//                 <TextInput
//                     withAsterisk
//                     label="Email"
//                     placeholder="Email Address"
//                     {...form.getInputProps('email')}
//                 />
//                 <PasswordInput
//                     label="Password"
//                     placeholder="Password"
//                     visibilityToggleIcon={({ reveal, size }) =>
//                         reveal ? <IconEyeOff size={size} /> : <IconEyeCheck size={size} />
//                     }
//                     {...form.getInputProps('password')}

//                 />

//                 <Group position="right" mt="md">
//                     <Button type="submit">Sing In</Button>
//                 </Group>
//             </form>
//         </Box>
//     );

// }
import { getProviders, signIn } from "next-auth/react"
import Head from 'next/head';
import { Login } from '../page-components/Auth';
export default function LogInPage({ providers }) {

    return (
        <>
            <Login providers={providers} />

        </>
    )
}


export async function getServerSideProps(context) {
    const providers = await getProviders()
    return {
        props: { providers },
    }
}