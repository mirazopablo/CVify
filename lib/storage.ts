import type { ResumeData, ResumeProfile } from "./resume-types"
import { uid } from "./initial-data"

// ============================================================================
// localStorage-backed profile store + JSON backup helpers.
// All access is guarded so it is safe to import during SSR (no-ops on server).
// ============================================================================

const PROFILES_KEY = "ats-resume:profiles"
const LAST_ACTIVE_KEY = "ats-resume:last-active"

function canUseStorage(): boolean {
  return typeof window !== "undefined" && !!window.localStorage
}

export function loadProfiles(): ResumeProfile[] {
  if (!canUseStorage()) return []
  try {
    const raw = window.localStorage.getItem(PROFILES_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as ResumeProfile[]) : []
  } catch {
    return []
  }
}

function persistProfiles(profiles: ResumeProfile[]): void {
  if (!canUseStorage()) return
  window.localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles))
}

/** Create or overwrite a profile by name. Returns the saved profile. */
export function saveProfile(name: string, data: ResumeData, existingId?: string): ResumeProfile {
  const profiles = loadProfiles()
  const now = Date.now()

  if (existingId) {
    const idx = profiles.findIndex((p) => p.id === existingId)
    if (idx !== -1) {
      profiles[idx] = { ...profiles[idx], name, data, updatedAt: now }
      persistProfiles(profiles)
      setLastActive(profiles[idx].id)
      return profiles[idx]
    }
  }

  const profile: ResumeProfile = { id: uid(), name, data, updatedAt: now }
  profiles.push(profile)
  persistProfiles(profiles)
  setLastActive(profile.id)
  return profile
}

export function deleteProfile(id: string): ResumeProfile[] {
  const profiles = loadProfiles().filter((p) => p.id !== id)
  persistProfiles(profiles)
  if (getLastActive() === id) setLastActive(null)
  return profiles
}

export function setLastActive(id: string | null): void {
  if (!canUseStorage()) return
  if (id) window.localStorage.setItem(LAST_ACTIVE_KEY, id)
  else window.localStorage.removeItem(LAST_ACTIVE_KEY)
}

export function getLastActive(): string | null {
  if (!canUseStorage()) return null
  return window.localStorage.getItem(LAST_ACTIVE_KEY)
}

// ---------------------------------------------------------------------------
// JSON backup: export current data as a downloadable file, import from a File.
// ---------------------------------------------------------------------------

export function exportJSON(data: ResumeData, fileName = "resume-backup.json"): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = fileName
  a.click()
  URL.revokeObjectURL(url)
}

export function importJSON(file: File): Promise<ResumeData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result))
        // minimal shape validation
        if (parsed && typeof parsed === "object" && "header" in parsed) {
          resolve(parsed as ResumeData)
        } else {
          reject(new Error("Invalid resume JSON structure."))
        }
      } catch {
        reject(new Error("Could not parse JSON file."))
      }
    }
    reader.onerror = () => reject(new Error("Could not read file."))
    reader.readAsText(file)
  })
}
