import { RiskScore } from "@/components/dashboard/risk-score"
import { VoiceAnalysis } from "@/components/dashboard/voice-analysis"
import { BehaviorSignals } from "@/components/dashboard/behavior-signals"
import { HardwareStatus } from "@/components/dashboard/hardware-status"
import { AlertPanel } from "@/components/dashboard/alert-panel"
import { EnergyChart } from "@/components/dashboard/energy-chart"
import { StatsStrip } from "@/components/dashboard/stats-strip"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <StatsStrip />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6">
          <RiskScore />
          <HardwareStatus />
        </div>
        <div className="flex flex-col gap-6">
          <VoiceAnalysis />
          <EnergyChart />
        </div>
        <div className="flex flex-col gap-6">
          <BehaviorSignals />
          <AlertPanel />
        </div>
      </div>
    </div>
  )
}
