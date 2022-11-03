import { getProviders, signIn } from "next-auth/react"
import Head from 'next/head';
import { GetServerSideProps } from 'next'
import { Login } from '../page-components/Auth';
export default function LogInPage(
    // { providers }
) {

    return (
        <>
            <Login />
        </>
    )
}


// export const getServerSideProps: GetServerSideProps = async (context) => {
//     const providers = await getProviders()
//     return {
//         props: { providers },
//     }
// }