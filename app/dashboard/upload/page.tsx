"use client"

import { useState } from "react"
import {
  Upload,
  Mic,
  FileAudio,
  Play,
  X,
  Brain,
  CheckCircle,
  Loader2,
  MessageSquare,
  Smile,
  Pause,
} from "lucide-react"
import { useVoiceRecorder } from "@/hooks/use-voice-recorder"
import { WaveformVisualizer } from "@/components/waveform-visualizer"
import { uploadAudioFile, analyzeRecordingWithAI } from "@/app/actions/upload-actions"

type UploadState = "idle" | "recording" | "uploaded" | "analyzing" | "complete"

const moodOptions = [
  { label: "Great", value: "great", color: "bg-primary/10 text-primary border-primary/20" },
  { label: "Good", value: "good", color: "bg-chart-2/10 text-chart-2 border-chart-2/20" },
  { label: "Okay", value: "okay", color: "bg-chart-3/10 text-chart-3 border-chart-3/20" },
  { label: "Low", value: "low", color: "bg-chart-4/10 text-chart-4 border-chart-4/20" },
  { label: "Very Low", value: "very-low", color: "bg-destructive/10 text-destructive border-destructive/20" },
]

export default function VoiceUploadPage() {
  const [state, setState] = useState<UploadState>("idle")
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [mood, setMood] = useState<string | null>(null)
  const [journalEntry, setJournalEntry] = useState("")
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [uploadedRecordingId, setUploadedRecordingId] = useState<string | null>(null)
  const [analyzeError, setAnalyzeError] = useState<string | null>(null)

  const {
    isRecording,
    isPaused,
    duration,
    waveformData,
    error: recordingError,
    start,
    pause,
    resume,
    stop,
    cancel,
  } = useVoiceRecorder({
    onDataAvailable: (blob) => {
      setAudioBlob(blob)
      setSelectedFile(`recording_${duration}s.webm`)
      setState("uploaded")
    },
  })

  async function handleFileSelect() {
    // For demo, just create a file input
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "audio/*"
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        setAudioBlob(file)
        setSelectedFile(file.name)
        setState("uploaded")
      }
    }
    input.click()
  }

  async function handleRecord() {
    if (isRecording) {
      if (isPaused) {
        resume()
      } else {
        stop()
      }
    } else {
      await start()
    }
  }

  async function handleAnalyze() {
    if (!audioBlob || !selectedFile) return

    setState("analyzing")
    setAnalyzeError(null)
    try {
      // First, upload the audio file
      const recording = await uploadAudioFile(audioBlob, selectedFile.replace(/\.[^/.]+$/, ""))
      setUploadedRecordingId(recording.id)

      // For now, use a mock transcription
      // In a real app, you would use Whisper API
      const mockTranscription =
        "Hello, I wanted to record some thoughts for the day. I had a great meeting with the team and discussed some interesting ideas about improving our workflow."

      // Analyze with AI
      const analysis = await analyzeRecordingWithAI(recording.id, mockTranscription)

      // Store analysis results
      setState("complete")
    } catch (error: any) {
      console.error("Failed to analyze:", error)
      setAnalyzeError(error?.message || "An unknown error occurred during analysis")
      setState("uploaded")
    }
  }

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-bold text-foreground">Data Input</h2>
        <p className="text-sm text-muted-foreground">
          Submit voice notes, mood logs, and journal entries for AI analysis.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Voice Upload / Record Section */}
        <div className="flex flex-col gap-5 rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <FileAudio className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Voice Note
            </h3>
          </div>

          {/* Record Button */}
          <div className="flex flex-col items-center gap-4 py-4">
            <button
              onClick={handleRecord}
              disabled={state === "analyzing"}
              className={`flex h-24 w-24 items-center justify-center rounded-full border-2 transition-all ${
                isRecording
                  ? "animate-pulse border-destructive bg-destructive/10"
                  : "border-primary/30 bg-primary/5 hover:bg-primary/10"
              }`}
              aria-label={isRecording ? "Stop recording" : "Start recording"}
            >
              {isRecording ? (
                <div className="flex flex-col items-center gap-1">
                  {isPaused ? (
                    <Play className="h-6 w-6 text-primary" />
                  ) : (
                    <div className="h-6 w-6 rounded-sm bg-destructive animate-pulse" />
                  )}
                  <span className="font-mono text-[10px] text-foreground">{duration}s</span>
                </div>
              ) : (
                <Mic className="h-8 w-8 text-primary" />
              )}
            </button>
            <p className="text-xs text-muted-foreground">
              {isRecording
                ? isPaused
                  ? "Paused - tap to resume"
                  : "Recording... tap to stop"
                : "Tap to record a voice note"}
            </p>
          </div>

          {/* Waveform Visualization */}
          {isRecording && waveformData.length > 0 && (
            <WaveformVisualizer data={waveformData} width={400} height={60} />
          )}

          {recordingError && (
            <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
              {recordingError}
            </div>
          )}

          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">or</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* File Upload */}
          <button
            onClick={handleFileSelect}
            disabled={isRecording || state === "analyzing"}
            className="flex flex-col items-center gap-3 rounded-xl border-2 border-dashed border-border bg-secondary/30 p-8 transition-colors hover:border-primary/30 hover:bg-secondary/50 disabled:opacity-50"
          >
            <Upload className="h-8 w-8 text-muted-foreground" />
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">Upload audio file</p>
              <p className="text-xs text-muted-foreground">.wav, .mp3, .webm supported</p>
            </div>
          </button>

          {/* Selected File & Playback */}
          {selectedFile && audioBlob && (
            <div className="flex flex-col gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4">
              <div className="flex items-center gap-3">
                <FileAudio className="h-4 w-4 text-primary" />
                <span className="flex-1 text-sm text-foreground">{selectedFile}</span>
                <button
                  onClick={() => {
                    setSelectedFile(null)
                    setAudioBlob(null)
                    setState("idle")
                  }}
                  className="text-muted-foreground hover:text-foreground"
                  aria-label="Remove file"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              
              {/* Audio Player */}
              <div className="w-full mt-2">
                <audio 
                  controls 
                  className="w-full h-10 rounded-md outline-none" 
                  src={URL.createObjectURL(audioBlob)}
                >
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>
          )}

          {/* Analyze Button */}
          {(state === "uploaded" || state === "complete" || state === "analyzing") && (
            <div className="flex flex-col gap-2">
              <button
                onClick={handleAnalyze}
                disabled={state === "analyzing"}
                className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
              >
                {state === "analyzing" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Analyzing...
                  </>
                ) : state === "complete" ? (
                  <>
                    <CheckCircle className="h-4 w-4" /> Analysis Complete
                  </>
                ) : (
                  <>
                    <Brain className="h-4 w-4" /> Analyze with AI
                  </>
                )}
              </button>
              {analyzeError && (
                <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive mt-2 text-center">
                  Error: {analyzeError}
                </div>
              )}
            </div>
          )}

          {/* Analysis Result */}
          {state === "complete" && (
            <div className="flex flex-col gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4">
              <h4 className="text-sm font-semibold text-foreground">AI Analysis Result</h4>
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-lg bg-secondary/60 p-2 text-center">
                  <p className="font-mono text-base font-bold text-primary">Positive</p>
                  <p className="text-[9px] text-muted-foreground">Sentiment</p>
                </div>
                <div className="rounded-lg bg-secondary/60 p-2 text-center">
                  <p className="font-mono text-base font-bold text-chart-3">0.85</p>
                  <p className="text-[9px] text-muted-foreground">Score</p>
                </div>
                <div className="rounded-lg bg-secondary/60 p-2 text-center">
                  <p className="font-mono text-base font-bold text-chart-2">Calm</p>
                  <p className="text-[9px] text-muted-foreground">Tone</p>
                </div>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Positive sentiment detected with calm and confident tone. Main themes include work
                collaboration and workflow improvement. Recommend follow-up discussion with team.
              </p>
            </div>
          )}
        </div>

        {/* Right Column: Mood + Journal */}
        <div className="flex flex-col gap-6">
          {/* Mood Selector */}
          <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <Smile className="h-4 w-4 text-chart-3" />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Daily Mood Log
              </h3>
            </div>
            <p className="text-xs text-muted-foreground">How are you feeling right now?</p>
            <div className="flex flex-wrap gap-2">
              {moodOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setMood(option.value)}
                  className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all ${
                    mood === option.value
                      ? `${option.color} ring-1 ring-current`
                      : "border-border bg-secondary/30 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            {mood && (
              <p className="text-xs text-primary">
                Mood logged. This data helps AI track emotional trends over time.
              </p>
            )}
          </div>

          {/* Journal Entry */}
          <div className="flex flex-1 flex-col gap-4 rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-chart-2" />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Journal Entry
              </h3>
            </div>
            <p className="text-xs text-muted-foreground">
              Write about your day. AI will analyze patterns in your writing over time.
            </p>
            <textarea
              value={journalEntry}
              onChange={(e) => setJournalEntry(e.target.value)}
              placeholder="How was your day? What's on your mind..."
              className="flex-1 resize-none rounded-xl border border-border bg-secondary/30 p-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30"
              rows={6}
            />
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-muted-foreground">
                {journalEntry.length} characters
              </span>
              <button
                disabled={!journalEntry.trim()}
                className="rounded-lg bg-primary px-5 py-2 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-40"
              >
                Save Entry
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

