'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'
import { useVoiceRecorder } from '@/hooks/use-voice-recorder'
import { WaveformVisualizer } from '@/components/waveform-visualizer'
import { processVoiceConversation } from '@/app/actions/voice-actions'
import { Mic, Volume2, MessageSquare, Send } from 'lucide-react'

interface ConversationMessage {
  role: 'user' | 'assistant'
  content: string
  audioUrl?: string
}

export default function VoiceConversationPage() {
  const [messages, setMessages] = useState<ConversationMessage[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [conversationMode, setConversationMode] = useState<'text' | 'voice'>('voice')
  const audioRefRef = useRef<HTMLAudioElement | null>(null)

  const {
    isRecording,
    duration,
    waveformData,
    audioURL,
    error: recordingError,
    start,
    stop,
    reset,
  } = useVoiceRecorder()

  const handleStartRecording = async () => {
    await start()
  }

  const handleStopRecording = async () => {
    stop()
  }

  const handleSendVoiceMessage = async () => {
    if (!audioURL) return

    setIsProcessing(true)
    try {
      // Convert data URL to blob
      const response = await fetch(audioURL)
      const audioBlob = await response.blob()

      // Process voice conversation
      const result = await processVoiceConversation(audioBlob, messages)

      // Add user message
      setMessages((prev) => [
        ...prev,
        {
          role: 'user',
          content: result.userTranscription,
        },
      ])

      // Create audio URL for AI response
      const aiAudioUrl = URL.createObjectURL(result.audioBlob)

      // Add AI message
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: result.aiResponse,
          audioUrl: aiAudioUrl,
        },
      ])

      // Auto-play AI response
      setTimeout(() => {
        playAudio(aiAudioUrl)
      }, 100)

      reset()
    } catch (error) {
      console.error('Failed to process voice message:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  const playAudio = (url: string) => {
    if (audioRefRef.current) {
      audioRefRef.current.src = url
      audioRefRef.current.play().catch((err) => console.error('Failed to play audio:', err))
    }
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border p-4">
        <h1 className="text-2xl font-bold text-foreground">Voice Conversation</h1>
        <p className="text-sm text-muted-foreground">Have natural conversations with voice recording and AI responses</p>

        {/* Mode Toggle */}
        <div className="flex gap-2 mt-4">
          <Button
            variant={conversationMode === 'voice' ? 'default' : 'outline'}
            onClick={() => setConversationMode('voice')}
            size="sm"
          >
            <Mic className="h-4 w-4 mr-2" />
            Voice Mode
          </Button>
          <Button
            variant={conversationMode === 'text' ? 'default' : 'outline'}
            onClick={() => setConversationMode('text')}
            size="sm"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Text Mode
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Mic className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h2 className="text-xl font-semibold text-foreground mb-2">Start a Voice Conversation</h2>
              <p className="text-muted-foreground">Click the microphone button to begin recording</p>
            </div>
          </div>
        ) : (
          messages.map((message, i) => (
            <div key={i} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <Card
                className={`max-w-md p-4 ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                <p className="text-sm mb-2">{message.content}</p>
                {message.audioUrl && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => playAudio(message.audioUrl!)}
                    className={message.role === 'user' ? 'text-primary-foreground hover:text-primary-foreground/80' : ''}
                  >
                    <Volume2 className="h-4 w-4 mr-1" />
                    Play
                  </Button>
                )}
              </Card>
            </div>
          ))
        )}

        {isProcessing && (
          <div className="flex justify-center">
            <Spinner />
          </div>
        )}
      </div>

      {/* Recording Section */}
      <div className="border-t border-border p-4 bg-background space-y-4">
        {conversationMode === 'voice' && (
          <>
            {/* Recording Display */}
            {isRecording && (
              <div className="flex flex-col items-center gap-3">
                <WaveformVisualizer data={waveformData} width={400} height={60} />
                <p className="text-sm text-muted-foreground">Recording: {duration}s</p>
              </div>
            )}

            {recordingError && (
              <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{recordingError}</div>
            )}

            {/* Recording Controls */}
            <div className="flex justify-center gap-2">
              <Button
                size="lg"
                onClick={isRecording ? handleStopRecording : handleStartRecording}
                disabled={isProcessing}
                className={isRecording ? 'bg-destructive hover:bg-destructive/90' : ''}
              >
                <Mic className="h-5 w-5 mr-2" />
                {isRecording ? 'Stop Recording' : 'Start Recording'}
              </Button>

              {audioURL && !isRecording && (
                <>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => playAudio(audioURL)}
                    disabled={isProcessing}
                  >
                    <Volume2 className="h-5 w-5 mr-2" />
                    Play Preview
                  </Button>

                  <Button
                    size="lg"
                    onClick={handleSendVoiceMessage}
                    disabled={isProcessing}
                  >
                    <Send className="h-5 w-5 mr-2" />
                    Send
                  </Button>

                  <Button size="lg" variant="outline" onClick={reset} disabled={isProcessing}>
                    Reset
                  </Button>
                </>
              )}
            </div>
          </>
        )}
      </div>

      {/* Hidden audio element for playback */}
      <audio ref={audioRefRef} />
    </div>
  )
}
