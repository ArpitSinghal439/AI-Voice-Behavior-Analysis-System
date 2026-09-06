'use server'

import { transcribeAudio, textToSpeech } from '@/lib/openai'

export async function transcribeRecording(audioBlob: Blob) {
  try {
    const arrayBuffer = await audioBlob.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const transcription = await transcribeAudio(buffer)
    return transcription
  } catch (error) {
    console.error('Failed to transcribe:', error)
    throw error
  }
}

export async function generateSpeech(text: string) {
  try {
    const audioBuffer = await textToSpeech(text)
    const blob = new Blob([audioBuffer], { type: 'audio/mpeg' })
    return blob
  } catch (error) {
    console.error('Failed to generate speech:', error)
    throw error
  }
}

export async function processVoiceConversation(
  userAudioBlob: Blob,
  conversationHistory: Array<{ role: string; content: string }>
) {
  try {
    // 1. Transcribe user audio
    const userTranscription = await transcribeRecording(userAudioBlob)

    // 2. Get AI response (this would call your chat API)
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          ...conversationHistory,
          { role: 'user', content: userTranscription },
        ],
      }),
    })

    // Parse the streaming response
    let aiResponse = ''
    if (response.body) {
      const reader = response.body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        // Parse SSE format
        const lines = chunk.split('\n')
        for (const line of lines) {
          if (line.startsWith('data:')) {
            try {
              const data = JSON.parse(line.slice(5))
              if (data.type === 'text-delta') {
                aiResponse += data.delta
              }
            } catch (e) {
              // Ignore parse errors
            }
          }
        }
      }
    }

    // 3. Convert AI response to speech
    const audioBlob = await generateSpeech(aiResponse)

    return {
      userTranscription,
      aiResponse,
      audioBlob,
    }
  } catch (error) {
    console.error('Failed to process voice conversation:', error)
    throw error
  }
}
