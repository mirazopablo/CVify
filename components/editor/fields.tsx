"use client"

import { cn } from "@/lib/utils"

// Lightweight labeled form primitives shared across every editor section.

interface TextFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  type?: string
  className?: string
}

export function TextField({ label, value, onChange, placeholder, type = "text", className }: TextFieldProps) {
  return (
    <label className={cn("flex flex-col gap-1.5", className)}>
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="h-9 rounded-md border border-input bg-background px-3 text-sm outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/30"
      />
    </label>
  )
}

interface TextAreaFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  rows?: number
  hint?: string
  className?: string
}

export function TextAreaField({ label, value, onChange, placeholder, rows = 4, hint, className }: TextAreaFieldProps) {
  return (
    <label className={cn("flex flex-col gap-1.5", className)}>
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <textarea
        value={value}
        rows={rows}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="resize-y rounded-md border border-input bg-background px-3 py-2 text-sm leading-relaxed outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/30"
      />
      {hint ? <span className="text-[11px] leading-relaxed text-muted-foreground/80">{hint}</span> : null}
    </label>
  )
}

export function CheckboxField({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded border-input accent-primary"
      />
      {label}
    </label>
  )
}
