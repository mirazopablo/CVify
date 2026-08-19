"use client"

import { ResumeProvider, useUI } from "@/lib/resume-context"
import { Shield } from "lucide-react"
import { Toolbar } from "@/components/toolbar"
import { EditorPanel } from "@/components/editor/editor-panel"
import { ResumePreview } from "@/components/preview/resume-preview"

export default function Page() {
  return (
    <ResumeProvider>
      <PageContent />
    </ResumeProvider>
  )
}

function PageContent() {
  const ui = useUI()
  return (
    <div className="flex h-screen flex-col bg-muted/30">
        <Toolbar />

        <main className="flex min-h-0 flex-1 flex-col lg:flex-row">
          {/* Left: form editor */}
          <section
            className="no-print flex min-h-0 flex-col border-b border-border bg-card lg:w-[440px] lg:shrink-0 lg:border-b-0 lg:border-r"
            aria-label="Resume editor"
          >
            <EditorPanel />
          </section>

          {/* Right: live print preview */}
          <section
            className="flex-1 overflow-auto bg-muted/40 p-4 lg:p-8"
            aria-label="Resume preview"
          >
            <div className="mx-auto w-fit">
              <div className="cv-viewport">
                <ResumePreview />
              </div>
            </div>
          </section>
        </main>

        {/* Global Privacy Footer */}
        <footer className="no-print flex shrink-0 items-center justify-between gap-2 border-t border-border bg-card px-4 py-2 text-[11px] font-medium text-muted-foreground">
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
