import React, { useEffect } from 'react'
import Router from 'next/router';
import { signOut } from 'next-auth/react'
export default function Logout() {

    useEffect(() => {
        signOut();
        Router.push('/')
    }, []);
    return (
        <></>
    )
}
