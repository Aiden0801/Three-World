import { Hero } from './hero'
import { Services } from './services'
import { ContactFormData, VPGContact, VPGContactProps } from './contacts'
import { Worlds } from './world'
import Head from 'next/head'
import { About } from './about'

export type IndexProps = {
  onFormSubmit: (values: ContactFormData) => Promise<boolean>
}

export function Index({ onFormSubmit }: IndexProps) {
  return (
    <>
      <Head>
        <title>Virtual Pro Galaxy</title>
        <meta name="description" content="Virtual Pro Galaxy" />
      </Head>
      <Hero />
      <Worlds />
      <About/>
      <Services />
      <VPGContact onSubmit={onFormSubmit} />
    </>
  )
}
