// ============================================================================
// Global resume state model.
//
// The whole application is driven by a single serializable object (`ResumeData`)
// so it can be persisted to localStorage, exported/imported as JSON, and read
// linearly by the ATS simulator. Every array item carries a stable `id` used as
// a React key and for edit/remove operations.
// ============================================================================

export type Language = "en" | "es"

/** UI-configurable colors. Stored as hex so <input type="color"> maps 1:1. */
export interface ThemeConfig {
  accent: string // section headings + name accent
  text: string // primary body text
  muted: string // secondary text (dates, locations)
}

export interface HeaderData {
  fullName: string
  jobTitle: string
  email: string
  phone: string
  location: string
  website: string
  github: string
  linkedin: string
  /** Square (1:1) cropped photo as a base64 data URL, or empty string. */
  photo: string
}

export interface ExperienceItem {
  id: string
  role: string
  company: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  description: string // free text; newlines become bullet points
}

export interface EducationItem {
  id: string
  degree: string
  institution: string
  location: string
  startDate: string
  endDate: string
  description: string
}

export interface SkillGroup {
  id: string
  category: string // e.g. "Languages", "Frameworks"
  items: string // comma separated plain text (ATS-safe)
}

export interface ProjectItem {
  id: string
  name: string
  url: string
  description: string
  tech: string
}

export interface LanguageItem {
  id: string
  name: string // e.g. "English"
  level: string // plain text, e.g. "Native", "C1" — never a progress bar
}

export interface ReferenceItem {
  id: string
  name: string
  relation: string
  contact: string
}

export interface PublicationItem {
  id: string
  title: string
  publisher: string
  date: string
  url: string
}

export type TemplateLayout = "classic" | "modern" | "structured"

export interface ResumeData {
  language: Language
  theme: ThemeConfig
  layout: TemplateLayout
  header: HeaderData
  summary: string
  experience: ExperienceItem[]
  education: EducationItem[]
  skills: SkillGroup[]
  projects: ProjectItem[]
  languages: LanguageItem[]
  references: ReferenceItem[]
  publications: PublicationItem[]
}

/** A saved profile envelope kept in localStorage. */
export interface ResumeProfile {
  id: string
  name: string
  updatedAt: number
  data: ResumeData
}
