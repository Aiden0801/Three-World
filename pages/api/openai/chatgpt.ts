import axios from 'axios'
import { Configuration, OpenAIApi } from 'openai'
import type { NextApiRequest, NextApiResponse } from 'next'
const information = `
Virtual Pro Galaxy is A collection of worlds with virtual tools, for Groups, Communities, Businesses, Events, and Opportunities, built using Blockchain Technology, allowing for secure web operations, user-transactions and seamless integration with all Metaverses.
You can reach us by using the contact form in the landing page.
We provide 4 services including "App and Mobile Development","Web3 Consultation","Global Advisory","Networking".
Our use cases are "Build 2D and 3D websites with no code","Design Your own Metaverse","Virtual Collaborate with your team", and more.
There are more than 20 consultants and 10 advisors in our company.
You can contact us by using the contact form in the landing page of virtualprogalxy.com`

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai: OpenAIApi = new OpenAIApi(configuration)
async function handler(req: NextApiRequest, res: NextApiResponse) {
  // res.status(200).json({ name: req.body, name: req.name });
  let { message } = req.body

  try {
    console.log(message)
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: information + message + '\nAI:',
      temperature: 0.9,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0.6,
      stop: [' Human:', ' AI:'],
    })
    console.log(response.data.choices[0].text)
    res.status(200).json(response.data.choices[0].text)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

export default handler
