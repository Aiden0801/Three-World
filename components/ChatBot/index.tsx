import { Configuration, OpenAIApi } from 'openai'
import { useEffect, useState } from 'react'
import { addResponseMessage, Widget } from 'react-chat-widget'
import 'react-chat-widget/lib/styles.css'
import { BASE_URL } from '@/config/constants'
import { fetcher } from '@/lib/fetcher'

const ChatBot = () => {
  const [messageList, setMessageList] = useState('')
  const [userMessage, setUserMessage] = useState('')
  const [turn, setTurn] = useState(false)
  const handleCallApi = async (message: string) => {
    console.log(message)
    console.log(BASE_URL)
    const response = await fetcher('http://localhost:3000/api/openai/chatgpt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: messageList,
      }),
    })
    console.log(response)
    addResponseMessage(response)
    setMessageList((messageList) => messageList + '\nAI: ' + response)
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
