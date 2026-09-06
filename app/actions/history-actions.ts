'use server'

import { getRecordings, getVoiceAnalysis, deleteRecording } from '@/lib/db'
import type { Recording, VoiceAnalysis } from '@/lib/db'

export async function fetchRecordings(): Promise<Recording[]> {
  return await getRecordings()
}

export async function fetchVoiceAnalysis(recordingId: string): Promise<VoiceAnalysis | null> {
  return await getVoiceAnalysis(recordingId)
}

export async function removeRecording(id: string): Promise<void> {
  await deleteRecording(id)
}
