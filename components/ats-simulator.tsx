"use client"

import { useMemo, useState } from "react"
import { Modal } from "./ui/modal"
import { useResume } from "@/lib/resume-context"
import { buildMetadata, extractATSText } from "@/lib/ats-extract"

// Read-only view of exactly what a text-based ATS parser reads, in order,
// plus the document metadata that will be injected into <head> before print.
export function ATSSimulator({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { data } = useResume()
  const [copied, setCopied] = useState(false)

  const text = useMemo(() => extractATSText(data), [data])
  const meta = useMemo(() => buildMetadata(data), [data])
  const wordCount = useMemo(() => text.split(/\s+/).filter(Boolean).length, [text])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* clipboard blocked; ignore */
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="ATS Simulator"
      description="The linear text a recruitment bot extracts from your CV, in reading order."
      footer={
        <>
          <span className="mr-auto self-center text-xs text-muted-foreground">{wordCount} words</span>
          <button
            type="button"
            onClick={copy}
            className="rounded-md border border-border px-3 py-1.5 text-xs font-medium hover:bg-muted"
          >
            {copied ? "Copied!" : "Copy text"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:opacity-90"
          >
            Close
          </button>
        </>
      }
    >
      <div className="grid gap-4">
        <div>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Injected metadata
          </h3>
          <dl className="grid gap-1 rounded-md border border-border bg-muted/40 p-3 text-xs">
            <MetaRow label="author" value={meta.author} />
            <MetaRow label="description" value={meta.description} />
            <MetaRow label="keywords" value={meta.keywords} />
          </dl>
        </div>
        <div>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Extracted text (read order)
          </h3>
          <textarea
            readOnly
            value={text}
            rows={18}
            className="w-full resize-y rounded-md border border-border bg-muted/30 p-3 font-mono text-xs leading-relaxed text-foreground outline-none"
            aria-label="Extracted ATS text"
          />
        </div>
      </div>
    </Modal>
  )
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2">
      <dt className="shrink-0 font-mono font-medium text-muted-foreground">{label}:</dt>
      <dd className="min-w-0 break-words text-foreground">{value || <em className="text-muted-foreground">—</em>}</dd>
    </div>
  )
}
