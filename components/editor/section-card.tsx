"use client"

import { useState } from "react"
import { ChevronDown, GripVertical } from "lucide-react"
import { cn } from "@/lib/utils"
import { useUI } from "@/lib/resume-context"

// Collapsible container for a group of fields (used for each array item).

export function SectionCard({
  title,
  subtitle,
  defaultOpen = false,
  onRemove,
  onMoveUp,
  onMoveDown,
  children,
}: {
  title: string
  subtitle?: string
  defaultOpen?: boolean
  onRemove?: () => void
  onMoveUp?: () => void
  onMoveDown?: () => void
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen)
  const ui = useUI()

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <div className="flex items-center gap-1 px-2 py-1.5">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex flex-1 min-w-0 items-center gap-2 rounded-md px-2 py-1.5 text-left hover:bg-muted"
          aria-expanded={open}
        >
          <GripVertical className="size-4 shrink-0 text-muted-foreground" aria-hidden />
          <div
            className={cn(
              "grid flex-1 items-center gap-2",
              subtitle ? "grid-cols-[minmax(0,auto)_minmax(0,1fr)]" : "grid-cols-1"
            )}
          >
            <span className="truncate text-sm font-medium text-foreground">{title || "Untitled"}</span>
            {subtitle ? <span className="truncate text-xs text-muted-foreground">{subtitle}</span> : null}
          </div>
          <ChevronDown
            className={cn("ml-auto size-4 shrink-0 text-muted-foreground transition-transform", open && "rotate-180")}
            aria-hidden
          />
        </button>
        <div className="flex shrink-0 items-center gap-0.5">
          {onMoveUp ? (
            <IconBtn label="Move up" onClick={onMoveUp}>
              ↑
            </IconBtn>
          ) : null}
          {onMoveDown ? (
            <IconBtn label="Move down" onClick={onMoveDown}>
              ↓
            </IconBtn>
          ) : null}
          {onRemove ? (
            <IconBtn label={ui.deleteItem} onClick={onRemove} danger>
              ✕
            </IconBtn>
          ) : null}
        </div>
      </div>
      {open ? <div className="grid gap-3 border-t border-border p-3">{children}</div> : null}
    </div>
  )
}

function IconBtn({
  children,
  label,
  onClick,
  danger,
}: {
  children: React.ReactNode
  label: string
  onClick: () => void
  danger?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={cn(
        "flex size-7 items-center justify-center rounded-md text-sm text-muted-foreground hover:bg-muted",
        danger && "hover:bg-destructive/10 hover:text-destructive",
      )}
    >
      {children}
    </button>
  )
}

/** Header row for a whole section (e.g. "Work Experience") with an add button. */
export function SectionGroup({
  title,
  description,
  onAdd,
  addLabel = "Add",
  children,
}: {
  title: string
  description?: string
  onAdd?: () => void
  addLabel?: string
  children: React.ReactNode
}) {
  const ui = useUI()
  return (
    <section className="grid gap-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          {description ? <p className="mt-0.5 text-xs text-muted-foreground">{description}</p> : null}
        </div>
        {onAdd ? (
          <button
            type="button"
            onClick={onAdd}
            className="shrink-0 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:opacity-90"
          >
            + {addLabel}
          </button>
        ) : null}
      </div>
      <div className="grid gap-2">{children}</div>
    </section>
  )
}
