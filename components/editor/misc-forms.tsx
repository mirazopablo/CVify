"use client"

import { useResume, useUI } from "@/lib/resume-context"
import { TextAreaField } from "./fields"

export function SummaryForm() {
  const { data, setSummary } = useResume()
  const ui = useUI()
  return (
    <TextAreaField
      label={ui.summaryLabel}
      value={data.summary}
      onChange={setSummary}
      rows={6}
      placeholder={ui.summaryPlaceholder}
      hint={ui.summaryHint}
    />
  )
}

function ColorInput({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (v: string) => void
}) {
  return (
    <label className="flex items-center justify-between gap-3 rounded-md border border-border bg-card px-3 py-2">
      <span className="text-sm text-foreground">{label}</span>
      <span className="flex items-center gap-2">
        <span className="font-mono text-xs uppercase text-muted-foreground">{value}</span>
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-8 w-10 cursor-pointer rounded border border-input bg-transparent"
          aria-label={label}
        />
      </span>
    </label>
  )
}

export function ThemeForm() {
  const { data, updateTheme } = useResume()
  const ui = useUI()
  const t = data.theme
  return (
    <div className="grid gap-2">
      <ColorInput label={ui.accentColor} value={t.accent} onChange={(accent) => updateTheme({ accent })} />
      <ColorInput label={ui.textColor} value={t.text} onChange={(text) => updateTheme({ text })} />
      <ColorInput label={ui.mutedColor} value={t.muted} onChange={(muted) => updateTheme({ muted })} />
      <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
        {ui.themeHint}
      </p>
    </div>
  )
}
