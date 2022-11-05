import { getProviders, signIn } from "next-auth/react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { Login } from "../page-components/Auth";
import { Button } from "@mantine/core";
export default function LogInPage() {
  // { providers }
  return (
    <>
      <Login />
    </>
  );
}
