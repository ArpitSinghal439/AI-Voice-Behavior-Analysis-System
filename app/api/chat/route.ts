import {
  consumeStream,
  convertToModelMessages,
  streamText,
  UIMessage,
} from 'ai'
import { createMessage } from '@/lib/db'

export const maxDuration = 30

export async function POST(req: Request) {
  const {
    messages,
    conversationId,
  }: { messages: UIMessage[]; conversationId: string } = await req.json()

  const result = streamText({
    model: 'openai/gpt-4o-mini',
    system:
      'You are a helpful AI assistant. You provide clear, concise, and supportive responses. When discussing voice analysis or recording topics, you provide insights about communication patterns and emotional indicators.',
    // Note: convertToModelMessages is async in version 6
    messages: await convertToModelMessages(messages),
    abortSignal: req.signal,
  })

  return result.toUIMessageStreamResponse({
    // Pass original messages for persistence - onFinish receives complete history
    originalMessages: messages,
    onFinish: async ({ messages: allMessages, isAborted }) => {
      if (isAborted || !conversationId) return

      // Save the assistant's response to database
      try {
        const lastMessage = allMessages[allMessages.length - 1]
        if (lastMessage?.role === 'assistant') {
          const textContent =
            lastMessage.parts
              ?.filter((p: any) => p.type === 'text')
              .map((p: any) => p.text)
              .join('') || ''

          if (textContent) {
            await createMessage(conversationId, 'assistant', textContent)
          }
        }
      } catch (error) {
        console.error('Failed to save message:', error)
      }
    },
    consumeSseStream: consumeStream,
  })
}
