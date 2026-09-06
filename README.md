# AI Voice & Behavior Analysis System

An AI-powered voice analysis platform designed to analyze speech patterns, behavioral signals, and voice data to generate meaningful insights through interactive dashboards, risk scoring, alerts, and conversation analysis.

## 🚀 Overview

The **AI Voice & Behavior Analysis System** is a full-stack web application that leverages artificial intelligence and voice-based analysis to monitor and interpret speech-related behavioral patterns.

The platform provides an intuitive dashboard for visualizing voice analysis results, behavioral signals, energy patterns, risk indicators, alerts, and historical conversations.

---

## ✨ Features

- 🎙️ Voice recording and audio capture
- 🤖 AI-powered voice analysis
- 📊 Interactive analytics dashboard
- ⚠️ Risk score calculation and monitoring
- 🔔 Intelligent alert system
- 🧠 Behavioral signal analysis
- 📈 Energy and activity visualization
- 💬 Conversation and chat analysis
- 🗂️ Voice analysis history tracking
- 🔐 User authentication
- 🗄️ Database integration using Supabase

---

## 🛠️ Technology Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend & Database

- Next.js Server Actions
- Supabase
- PostgreSQL

### AI & Voice Processing

- OpenAI API
- Voice Recording
- Audio Processing
- AI-based Speech Analysis

---

## 📂 Project Structure

```text
AIS/
│
├── app/
│   ├── actions/
│   ├── dashboard/
│   ├── login/
│   ├── about/
│   └── privacy/
│
├── components/
│   ├── dashboard/
│   └── ui/
│
├── hooks/
│   ├── use-mobile.tsx
│   ├── use-toast.ts
│   └── use-voice-recorder.ts
│
├── lib/
│   ├── supabase/
│   ├── db.ts
│   └── openai.ts
│
├── scripts/
│   └── database setup scripts
│
├── public/
│
└── package.json
