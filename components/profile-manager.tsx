"use client"

import { useEffect, useState } from "react"
import { Shield } from "lucide-react"
import { Modal } from "./ui/modal"
import { useResume, useUI } from "@/lib/resume-context"
import { deleteProfile, loadProfiles, saveProfile, setLastActive } from "@/lib/storage"
import type { ResumeProfile } from "@/lib/resume-types"

// Save / load / delete named profiles stored in localStorage.
export function ProfileManager({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { data, setData, activeProfileId, setActiveProfileId, activeProfileName, setActiveProfileName } = useResume()
  const ui = useUI()
  const [profiles, setProfiles] = useState<ResumeProfile[]>([])
  const [name, setName] = useState("")

  useEffect(() => {
    if (open) {
      setProfiles(loadProfiles())
      setName(activeProfileName)
    }
  }, [open, activeProfileName])

  const handleSaveNew = () => {
    const finalName = name.trim() || "Untitled profile"
    const saved = saveProfile(finalName, data)
    setActiveProfileId(saved.id)
    setActiveProfileName(saved.name)
    setProfiles(loadProfiles())
  }

  const handleUpdateActive = () => {
    if (!activeProfileId) return handleSaveNew()
    const finalName = name.trim() || activeProfileName || "Untitled profile"
    const saved = saveProfile(finalName, data, activeProfileId)
    setActiveProfileName(saved.name)
    setProfiles(loadProfiles())
  }

  const handleLoad = (p: ResumeProfile) => {
    setData(p.data)
    setActiveProfileId(p.id)
    setActiveProfileName(p.name)
    setLastActive(p.id)
    onClose()
  }

  const handleDelete = (id: string) => {
    setProfiles(deleteProfile(id))
    if (activeProfileId === id) {
      setActiveProfileId(null)
      setActiveProfileName("")
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={ui.profilesTitle}
      description={ui.profilesDesc}
    >
      <div className="grid gap-4">
        {/* Privacy Notice Banner */}
        <div className="flex items-start gap-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-3 text-emerald-600 dark:text-emerald-400">
          <Shield className="mt-0.5 h-4 w-4 shrink-0" />
          <div className="text-xs">
            <p className="font-semibold">{ui.privacyTitle}</p>
            <p className="mt-1 opacity-90">{ui.privacyDesc}</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 rounded-lg border border-border p-3 sm:flex-row sm:items-end">
          <label className="flex flex-1 flex-col gap-1.5">
            <span className="text-xs font-medium text-muted-foreground">{ui.profileName}</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={ui.profileNameHint}
              className="h-9 rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring/30"
            />
          </label>
          <div className="flex gap-2">
            {activeProfileId ? (
              <button
                type="button"
                onClick={handleUpdateActive}
                className="h-9 rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground hover:opacity-90"
              >
                {ui.updateBtn}
              </button>
            ) : null}
            <button
              type="button"
              onClick={handleSaveNew}
              className="h-9 rounded-md border border-border px-3 text-xs font-medium hover:bg-muted"
            >
              {ui.saveNewBtn}
            </button>
          </div>
        </div>

        <div className="grid gap-2">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {ui.savedProfiles} ({profiles.length})
          </h3>
          {profiles.length === 0 ? (
            <p className="rounded-md border border-dashed border-border px-3 py-6 text-center text-xs text-muted-foreground">
              {ui.noProfiles}
            </p>
          ) : (
            profiles
              .slice()
              .sort((a, b) => b.updatedAt - a.updatedAt)
              .map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between gap-3 rounded-md border border-border px-3 py-2"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">
                      {p.name}
                      {p.id === activeProfileId ? (
                        <span className="ml-2 rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary">
                          {ui.activeBadge}
                        </span>
                      ) : null}
                    </p>
                    <p className="text-[11px] text-muted-foreground">{new Date(p.updatedAt).toLocaleString()}</p>
                  </div>
                  <div className="flex shrink-0 gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleLoad(p)}
                      className="rounded-md border border-border px-2.5 py-1 text-xs font-medium hover:bg-muted"
                    >
                      {ui.loadBtn}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(p.id)}
                      className="rounded-md px-2.5 py-1 text-xs font-medium text-destructive hover:bg-destructive/10"
                    >
                      {ui.deleteBtn}
                    </button>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    </Modal>
  )
}
