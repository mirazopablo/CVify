"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { Download, FolderOpen, Printer, ScanSearch, Sparkles, Upload } from "lucide-react"
import { useResume, useUI } from "@/lib/resume-context"
import { exportJSON, importJSON } from "@/lib/storage"
import { printResume } from "@/lib/print"
import { cn } from "@/lib/utils"
import { ATSSimulator } from "./ats-simulator"
import { ProfileManager } from "./profile-manager"

export function Toolbar() {
  const { data, setLanguage, setData, loadSample } = useResume()
  const ui = useUI()
  const [atsOpen, setAtsOpen] = useState(false)
  const [profilesOpen, setProfilesOpen] = useState(false)
  const importRef = useRef<HTMLInputElement | null>(null)
  const [importError, setImportError] = useState<string | null>(null)

  const handleImport = async (file: File) => {
    try {
      const parsed = await importJSON(file)
      setData(parsed)
      setImportError(null)
    } catch (err) {
      setImportError(err instanceof Error ? err.message : "Import failed")
      setTimeout(() => setImportError(null), 3000)
    }
  }

  return (
    <header className="no-print flex flex-wrap items-center gap-2 border-b border-border bg-card px-4 py-2.5">
      <div className="mr-4 flex items-center gap-3">
        <Image src="/logo.jpeg" alt="CVify Logo" width={80} height={80} className="rounded-md object-cover" />
        <h1 className="text-2xl font-extrabold text-foreground tracking-tight">CVify</h1>
      </div>

      {/* Language toggle */}
      <div className="flex items-center overflow-hidden rounded-md border border-border" role="group" aria-label="Language">
        {(["en", "es"] as const).map((lng) => (
          <button
            key={lng}
            type="button"
            onClick={() => setLanguage(lng)}
            aria-pressed={data.language === lng}
            className={cn(
              "px-2.5 py-1 text-xs font-medium transition-colors",
              data.language === lng ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted",
            )}
          >
            {lng === "en" ? "EN" : "ES"}
          </button>
        ))}
      </div>

      <div className="ml-auto flex flex-wrap items-center gap-1.5">
        <ToolbarButton icon={<FolderOpen className="size-4" />} onClick={() => setProfilesOpen(true)}>
          {ui.profiles}
        </ToolbarButton>
        <ToolbarButton icon={<ScanSearch className="size-4" />} onClick={() => setAtsOpen(true)}>
          {ui.atsSim}
        </ToolbarButton>
        <ToolbarButton icon={<Sparkles className="size-4" />} onClick={loadSample}>
          {ui.sample}
        </ToolbarButton>
        <ToolbarButton icon={<Download className="size-4" />} onClick={() => exportJSON(data)}>
          {ui.export}
        </ToolbarButton>
        <ToolbarButton icon={<Upload className="size-4" />} onClick={() => importRef.current?.click()}>
          {ui.import}
        </ToolbarButton>
        <input
          ref={importRef}
          type="file"
          accept="application/json"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0]
            if (f) handleImport(f)
            e.target.value = ""
          }}
        />
        <button
          type="button"
          onClick={() => printResume(data)}
          className="flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:opacity-90"
        >
          <Printer className="size-4" />
          {ui.print}
        </button>
      </div>

      {importError ? (
        <p className="w-full text-xs text-destructive" role="alert">
          {importError}
        </p>
      ) : null}

      <ATSSimulator open={atsOpen} onClose={() => setAtsOpen(false)} />
      <ProfileManager open={profilesOpen} onClose={() => setProfilesOpen(false)} />
    </header>
  )
}

function ToolbarButton({
  icon,
  onClick,
  children,
}: {
  icon: React.ReactNode
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-muted"
    >
      {icon}
      <span className="hidden sm:inline">{children}</span>
    </button>
  )
}
