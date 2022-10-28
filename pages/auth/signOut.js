import React, { Button } from 'react'
import { getProviders, signOut } from "next-auth/react"

export default function SignOut() {
    return (
        <button onClick={() => { signOut() }}>signOut</button>
    )
}
