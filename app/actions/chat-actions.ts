'use server'

import { createMessage, createConversation, getConversationMessages } from '@/lib/db'

export async function handleUserMessage(conversationId: string, content: string) {
  try {
    const message = await createMessage(conversationId, 'user', content)
    return message
  } catch (error) {
    console.error('Failed to save user message:', error)
    throw error
  }
}

export async function startNewConversation(title?: string) {
  try {
    const conversation = await createConversation(title || 'New Conversation')
    return conversation
  } catch (error) {
    console.error('Failed to create conversation:', error)
    throw error
  }
}

export async function loadConversationHistory(conversationId: string) {
  try {
    const messages = await getConversationMessages(conversationId)
    return messages
  } catch (error) {
    console.error('Failed to load conversation history:', error)
    throw error
  }
}
