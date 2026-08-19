"use client"

import { useRef, useState } from "react"
import { ResumeProvider, useResume, useUI } from "@/lib/resume-context"
import { Shield, PenLine, FileText, Settings } from "lucide-react"
import { Toolbar } from "@/components/toolbar"
import { EditorPanel } from "@/components/editor/editor-panel"
import { ResumePreview } from "@/components/preview/resume-preview"
import { MobileOptionsPanel } from "@/components/mobile-options"
import { ATSSimulator } from "@/components/ats-simulator"
import { ProfileManager } from "@/components/profile-manager"
import { importJSON } from "@/lib/storage"
import { printResume } from "@/lib/print"
import { cn } from "@/lib/utils"

export default function Page() {
  return (
    <ResumeProvider>
      <PageContent />
    </ResumeProvider>
  )
}

function PageContent() {
  const ui = useUI()
  const { data, setData } = useResume()
  const [viewMode, setViewMode] = useState<"edit" | "preview" | "options">("edit")

  // Shared state for modals and import
  const [atsOpen, setAtsOpen] = useState(false)
  const [profilesOpen, setProfilesOpen] = useState(false)
  const importRef = useRef<HTMLInputElement | null>(null)
  const [importError, setImportError] = useState<string | null>(null)

  const handleImport = async (file: File) => {
    try {
      const parsed = await importJSON(file)
      setData(parsed)
      setImportError(null)
      // Switch back to edit mode on mobile so they see the imported data
      if (window.innerWidth < 1024) setViewMode("edit")
    } catch (err) {
      setImportError(err instanceof Error ? err.message : "Import failed")
      setTimeout(() => setImportError(null), 3000)
    }
  }

  return (
    <div className="flex h-[100dvh] flex-col bg-muted/30">
        <Toolbar 
          onOpenProfiles={() => setProfilesOpen(true)}
          onOpenAts={() => setAtsOpen(true)}
          onImportClick={() => importRef.current?.click()}
        />

        {importError ? (
          <p className="no-print w-full bg-destructive/10 py-1 text-center text-xs text-destructive" role="alert">
            {importError}
          </p>
        ) : null}

        <main className="flex min-h-0 flex-1 flex-col lg:flex-row relative pb-[60px] lg:pb-0">
          {/* Left: form editor */}
          <section
            className={cn(
              "no-print flex min-h-0 flex-col border-b border-border bg-card lg:w-[440px] lg:shrink-0 lg:border-b-0 lg:border-r",
              viewMode === "edit" ? "flex flex-1" : "hidden lg:flex"
            )}
            aria-label="Resume editor"
          >
            <EditorPanel />
          </section>

          {/* Right: live print preview */}
          <section
            className={cn(
              "flex-1 overflow-auto bg-muted/40 p-4 lg:p-8 print:!block print:p-0 print:overflow-visible",
              viewMode === "preview" ? "block" : "hidden lg:block"
            )}
            aria-label="Resume preview"
          >
            <div className="mx-auto w-fit cv-viewport-wrapper">
              <div className="cv-viewport">
                <ResumePreview />
              </div>
            </div>
          </section>

          {/* Mobile Options Panel */}
          {viewMode === "options" && (
            <section className="flex-1 overflow-y-auto bg-background lg:hidden animate-in fade-in slide-in-from-bottom-2 duration-200">
              <MobileOptionsPanel 
                onOpenProfiles={() => setProfilesOpen(true)}
                onOpenAts={() => setAtsOpen(true)}
                onImportClick={() => importRef.current?.click()}
                onPrintClick={() => {
                  setViewMode("preview")
                  // wait for render before invoking print
                  setTimeout(() => printResume(data), 100)
                }}
              />
            </section>
          )}

          {/* Mobile Bottom Navigation */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 border-t border-border bg-background flex h-[60px] z-50">
            <button
              onClick={() => setViewMode("edit")}
              className={cn(
                "flex-1 flex flex-col items-center justify-center gap-1 text-xs font-medium transition-colors",
                viewMode === "edit" ? "text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <PenLine className="h-5 w-5" />
              <span>{ui.editBtn}</span>
            </button>
            <button
              onClick={() => setViewMode("preview")}
              className={cn(
                "flex-1 flex flex-col items-center justify-center gap-1 text-xs font-medium transition-colors",
                viewMode === "preview" ? "text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <FileText className="h-5 w-5" />
              <span>{ui.previewBtn}</span>
            </button>
            <button
              onClick={() => setViewMode("options")}
              className={cn(
                "flex-1 flex flex-col items-center justify-center gap-1 text-xs font-medium transition-colors",
                viewMode === "options" ? "text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <Settings className="h-5 w-5" />
              <span>{ui.optionsBtn}</span>
            </button>
          </div>
        </main>

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

        <ATSSimulator open={atsOpen} onClose={() => setAtsOpen(false)} />
        <ProfileManager open={profilesOpen} onClose={() => setProfilesOpen(false)} />

        {/* Global Privacy Footer */}
        <footer className="no-print hidden lg:flex shrink-0 items-center justify-between gap-2 border-t border-border bg-card px-4 py-2 text-[11px] font-medium text-muted-foreground">
          <div className="flex items-center gap-2">
            <Shield className="h-3 w-3 text-emerald-500" />
            <span>{ui.privacyFooter}</span>
          </div>
          <a
            href="https://github.com/mirazopablo/CVify"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-foreground transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
            <span>Open Source</span>
          </a>
        </footer>
      </div>
  )
}
