'use client'

import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'
import { startNewConversation, handleUserMessage } from '@/app/actions/chat-actions'

export default function ChatPage() {
  const [conversationId, setConversationId] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Initialize a new conversation
    const initConversation = async () => {
      setIsLoading(true)
      try {
        const conversation = await startNewConversation()
        setConversationId(conversation.id)
      } catch (error) {
        console.error('Failed to initialize conversation:', error)
      } finally {
        setIsLoading(false)
      }
    }

    initConversation()
  }, [])

  const { messages, input, handleInputChange, handleSubmit, isLoading: isChatLoading } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
      prepareSendMessagesRequest: ({ messages }) => ({
        body: {
          messages,
          conversationId,
        },
      }),
    }),
  })

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim() || !conversationId) return

    // Save user message to database
    try {
      await handleUserMessage(conversationId, input)
    } catch (error) {
      console.error('Failed to save message:', error)
    }

    // Send to AI
    handleSubmit(e)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border p-4">
        <h1 className="text-2xl font-bold text-foreground">AI Chat Assistant</h1>
        <p className="text-sm text-muted-foreground">Ask questions about voice analysis or anything else</p>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-foreground mb-2">Start a Conversation</h2>
              <p className="text-muted-foreground">Ask me anything about voice analysis or your recordings</p>
            </div>
          </div>
        ) : (
          messages.map((message, i) => (
            <div key={i} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <Card
                className={`max-w-md p-3 ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                <div className="text-sm">
                  {message.parts
                    ?.filter((p: any) => p.type === 'text')
                    .map((p: any, idx: number) => (
                      <p key={idx}>{p.text}</p>
                    ))}
                </div>
              </Card>
            </div>
          ))
        )}
        {isChatLoading && (
          <div className="flex justify-start">
            <div className="bg-muted p-3 rounded-lg">
              <Spinner className="h-4 w-4" />
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-border p-4 bg-background">
        <form onSubmit={onSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message..."
            disabled={!conversationId || isChatLoading}
            className="flex-1"
          />
          <Button
            type="submit"
            disabled={!conversationId || isChatLoading || !input.trim()}
          >
            {isChatLoading ? <Spinner className="h-4 w-4 mr-2" /> : null}
            Send
          </Button>
        </form>
      </div>
    </div>
  )
}
