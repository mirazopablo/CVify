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

export function Toolbar({
  onOpenProfiles,
  onOpenAts,
  onImportClick,
}: {
  onOpenProfiles: () => void
  onOpenAts: () => void
  onImportClick: () => void
}) {
  const { data, setLanguage, setLayout, loadSample } = useResume()
  const ui = useUI()

  return (
    <header className="no-print flex items-center gap-4 border-b border-border bg-card px-4 py-2.5 overflow-x-auto whitespace-nowrap">
      <div className="flex items-center gap-3 shrink-0">
        <Image src="/logo.jpeg" alt="CVify Logo" width={80} height={80} className="w-20 h-20 rounded-md object-cover" />
        <h1 className="text-2xl font-extrabold text-foreground tracking-tight">CVify</h1>
      </div>

      {/* Language toggle */}
      <div className="flex items-center shrink-0 overflow-hidden rounded-md border border-border" role="group" aria-label="Language">
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

      {/* Layout toggle */}
      <select
        value={data.layout || "classic"}
        onChange={(e) => setLayout(e.target.value as "classic" | "modern" | "structured")}
        className="shrink-0 rounded-md border border-border bg-card px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-muted outline-none focus:ring-2 focus:ring-ring"
        aria-label="Layout"
      >
        <option value="classic">{ui.layoutClassic}</option>
        <option value="modern">{ui.layoutModern}</option>
        <option value="structured">{ui.layoutStructured}</option>
      </select>

      {/* Desktop only buttons */}
      <div className="ml-auto hidden lg:flex items-center gap-1.5 shrink-0">
        <ToolbarButton icon={<FolderOpen className="size-4" />} onClick={onOpenProfiles}>
          {ui.profiles}
        </ToolbarButton>
        <ToolbarButton icon={<ScanSearch className="size-4" />} onClick={onOpenAts}>
          {ui.atsSim}
        </ToolbarButton>
        <ToolbarButton icon={<Sparkles className="size-4" />} onClick={loadSample}>
          {ui.sample}
        </ToolbarButton>
        <ToolbarButton icon={<Download className="size-4" />} onClick={() => exportJSON(data)}>
          {ui.export}
        </ToolbarButton>
        <ToolbarButton icon={<Upload className="size-4" />} onClick={onImportClick}>
          {ui.import}
        </ToolbarButton>
        <button
          type="button"
          onClick={() => printResume(data)}
          className="flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:opacity-90"
        >
          <Printer className="size-4" />
          {ui.print}
        </button>
      </div>
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
