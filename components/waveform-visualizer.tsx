'use client'

import { useEffect, useRef } from 'react'

interface WaveformVisualizerProps {
  data: Uint8Array
  width?: number
  height?: number
  barWidth?: number
  barGap?: number
  color?: string
  backgroundColor?: string
}

export function WaveformVisualizer({
  data,
  width = 400,
  height = 100,
  barWidth = 2,
  barGap = 1,
  color = '#3b82f6',
  backgroundColor = '#f3f4f6',
}: WaveformVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || data.length === 0) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.fillStyle = backgroundColor
    ctx.fillRect(0, 0, width, height)

    // Draw waveform
    ctx.fillStyle = color
    const barCount = Math.floor(width / (barWidth + barGap))
    const step = Math.floor(data.length / barCount)

    for (let i = 0; i < barCount && i * step < data.length; i++) {
      const value = data[i * step]
      const normalizedValue = value / 255

      const barX = i * (barWidth + barGap)
      const barHeight = normalizedValue * height
      const barY = height - barHeight

      ctx.fillRect(barX, barY, barWidth, barHeight)
    }
  }, [data, width, height, barWidth, barGap, color, backgroundColor])

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="rounded-lg border border-gray-200"
    />
  )
}
