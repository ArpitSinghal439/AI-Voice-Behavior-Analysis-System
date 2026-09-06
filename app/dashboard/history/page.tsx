'use client'

import { useEffect, useState } from 'react'
import { fetchRecordings, fetchVoiceAnalysis, removeRecording } from '@/app/actions/history-actions'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { Play, Trash2, BarChart3, Download } from 'lucide-react'
import type { Recording, VoiceAnalysis } from '@/lib/db'

export default function HistoryPage() {
  const [recordings, setRecordings] = useState<Recording[]>([])
  const [analyses, setAnalyses] = useState<Record<string, VoiceAnalysis>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [selectedRecording, setSelectedRecording] = useState<Recording | null>(null)

  useEffect(() => {
    const loadRecordings = async () => {
      try {
        const data = await fetchRecordings()
        setRecordings(data)

        // Load analysis for each recording
        const analysesMap: Record<string, VoiceAnalysis> = {}
        for (const recording of data) {
          try {
            const analysis = await fetchVoiceAnalysis(recording.id)
            if (analysis) {
              analysesMap[recording.id] = analysis
            }
          } catch (error) {
            console.error(`Failed to load analysis for ${recording.id}:`, error)
          }
        }
        setAnalyses(analysesMap)
      } catch (error) {
        console.error('Failed to load recordings:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadRecordings()
  }, [])

  const handleDelete = async (id: string) => {
    try {
      await removeRecording(id)
      setRecordings(recordings.filter((r) => r.id !== id))
      if (selectedRecording?.id === id) {
        setSelectedRecording(null)
      }
    } catch (error) {
      console.error('Failed to delete recording:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-foreground">Recording History</h2>
        <p className="text-sm text-muted-foreground">
          View and manage your voice recordings and analysis results
        </p>
      </div>

      {recordings.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground mb-4">No recordings yet</p>
          <p className="text-sm text-muted-foreground">Create your first recording in the upload section</p>
        </Card>
      ) : (
        <div className="grid gap-4 lg:grid-cols-3">
          {/* Recording List */}
          <div className="lg:col-span-2">
            <div className="space-y-3">
              {recordings.map((recording) => {
                const analysis = analyses[recording.id]
                const sentimentColor =
                  analysis?.sentiment === 'positive'
                    ? 'bg-green-500/20 text-green-700'
                    : analysis?.sentiment === 'negative'
                      ? 'bg-red-500/20 text-red-700'
                      : 'bg-gray-500/20 text-gray-700'

                return (
                  <Card
                    key={recording.id}
                    className={`p-4 cursor-pointer hover:bg-accent transition-colors border ${
                      selectedRecording?.id === recording.id ? 'border-primary' : ''
                    }`}
                    onClick={() => setSelectedRecording(recording)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{recording.title}</h3>
                        {recording.description && (
                          <p className="text-sm text-muted-foreground mt-1">{recording.description}</p>
                        )}
                        <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                          <span>{new Date(recording.created_at).toLocaleDateString()}</span>
                          <span>{Math.round(recording.duration_seconds)}s</span>
                          <span>{(recording.file_size_bytes / 1024 / 1024).toFixed(2)} MB</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {analysis && (
                          <div className="text-right">
                            <span
                              className={`inline-block px-2 py-1 rounded text-xs font-medium ${sentimentColor}`}
                            >
                              {analysis.sentiment}
                            </span>
                          </div>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            window.open(recording.audio_url, '_blank')
                          }}
                          title="Play recording"
                        >
                          <Play className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDelete(recording.id)
                          }}
                          title="Delete recording"
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Analysis Detail */}
          {selectedRecording && analyses[selectedRecording.id] && (
            <Card className="p-6 lg:col-span-1 h-fit">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Analysis
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Sentiment</p>
                  <p className="text-sm font-medium text-foreground capitalize">
                    {analyses[selectedRecording.id].sentiment || 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Tone</p>
                  <p className="text-sm font-medium text-foreground capitalize">
                    {analyses[selectedRecording.id].tone || 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Sentiment Score</p>
                  <p className="text-sm font-medium text-foreground">
                    {analyses[selectedRecording.id].sentiment_score?.toFixed(2) || 'N/A'}
                  </p>
                </div>
                {analyses[selectedRecording.id].key_insights?.length > 0 && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Key Insights</p>
                    <ul className="space-y-1">
                      {analyses[selectedRecording.id].key_insights.map((insight, i) => (
                        <li key={i} className="text-xs text-foreground">
                          • {insight}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {analyses[selectedRecording.id].transcription && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Transcription</p>
                    <p className="text-xs text-foreground leading-relaxed">
                      {analyses[selectedRecording.id].transcription}
                    </p>
                  </div>
                )}
              </div>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}

