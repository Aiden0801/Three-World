import { Configuration, OpenAIApi } from 'openai'
import { useEffect, useState } from 'react'
import { addResponseMessage, Widget } from 'react-chat-widget'
import 'react-chat-widget/lib/styles.css'
const information = `
Virtual Pro Galaxy is A collection of worlds with virtual tools, for Groups, Communities, Businesses, Events, and Opportunities, built using Blockchain Technology, allowing for secure web operations, user-transactions and seamless integration with all Metaverses.
You can reach us by using the contact form in the landing page.
We provide 4 services including "App and Mobile Development","Web3 Consultation","Global Advisory","Networking".
Our use cases are "Build 2D and 3D websites with no code","Design Your own Metaverse","Virtual Collaborate with your team", and more.
There are more than 20 consultants and 10 advisors in our company.
You can contact us by using the contact form in the landing page of virtualprogalxy.com`
const configuration = new Configuration({
  apiKey: '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',
})
const openai: OpenAIApi = new OpenAIApi(configuration)

const ChatBot = () => {
  const [messageList, setMessageList] = useState('')
  const [userMessage, setUserMessage] = useState('')
  const [turn, setTurn] = useState(false)
  const handleCallApi = async (message: string) => {
    console.log(message)
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: information + messageList + '\nAI:',
      temperature: 0.9,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0.6,
      stop: [' Human:', ' AI:'],
    })
    addResponseMessage(response.data.choices[0].text)
    setMessageList((messageList) => messageList + '\nAI: ' + response.data.choices[0].text)
  }
  useEffect(() => {
    if (messageList) setTurn((turn) => !turn)
  }, [messageList])
  useEffect(() => {
    if (turn) handleCallApi(messageList)
  }, [turn])
  const handleNewUserMessage = (newMessage) => {
    setMessageList((messageList) => messageList + '\nHuman: ' + newMessage)
    //    setUserMessage((userMessage) => userMessage + '\n' + newMessage)
  }
  return (
    <Widget
      title="HHHQ chat bot"
      subtitle="Ask whatever you want!"
      handleNewUserMessage={handleNewUserMessage}></Widget>
  )
}

export default ChatBot
