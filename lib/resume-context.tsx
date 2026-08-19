"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import type {
  EducationItem,
  ExperienceItem,
  HeaderData,
  Language,
  LanguageItem,
  ProjectItem,
  PublicationItem,
  ReferenceItem,
  ResumeData,
  SkillGroup,
  ThemeConfig,
  TemplateLayout,
} from "./resume-types"
import { emptyResume, sampleResume, uid } from "./initial-data"
import { getUILabels, type UILabels } from "./i18n"

// ============================================================================
// Central store built on Context API. Exposes granular, typed mutators so form
// components never need to know how the tree is shaped beyond their own slice.
// ============================================================================

type ArrayKey = "experience" | "education" | "skills" | "projects" | "languages" | "references" | "publications"

interface ResumeContextValue {
  data: ResumeData
  setData: (data: ResumeData) => void
  reset: () => void
  loadSample: () => void

  setLanguage: (lang: Language) => void
  setLayout: (layout: TemplateLayout) => void
  updateTheme: (patch: Partial<ThemeConfig>) => void
  updateHeader: (patch: Partial<HeaderData>) => void
  setSummary: (value: string) => void

  addExperience: () => void
  updateExperience: (id: string, patch: Partial<ExperienceItem>) => void
  addEducation: () => void
  updateEducation: (id: string, patch: Partial<EducationItem>) => void
  addSkill: () => void
  updateSkill: (id: string, patch: Partial<SkillGroup>) => void
  addProject: () => void
  updateProject: (id: string, patch: Partial<ProjectItem>) => void
  addLanguageItem: () => void
  updateLanguageItem: (id: string, patch: Partial<LanguageItem>) => void
  addReference: () => void
  updateReference: (id: string, patch: Partial<ReferenceItem>) => void
  addPublication: () => void
  updatePublication: (id: string, patch: Partial<PublicationItem>) => void

  removeItem: (key: ArrayKey, id: string) => void
  moveItem: (key: ArrayKey, id: string, dir: -1 | 1) => void

  // active profile tracking (which localStorage profile the state maps to)
  activeProfileId: string | null
  setActiveProfileId: (id: string | null) => void
  activeProfileName: string
  setActiveProfileName: (name: string) => void
}

const ResumeContext = createContext<ResumeContextValue | null>(null)

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [data, setDataState] = useState<ResumeData>(emptyResume)
  const [activeProfileId, setActiveProfileId] = useState<string | null>(null)
  const [activeProfileName, setActiveProfileName] = useState<string>("")

  // Seed with the sample resume on first client mount for a non-empty preview.
  useEffect(() => {
    setDataState(sampleResume)
  }, [])

  const setData = useCallback((next: ResumeData) => setDataState(next), [])
  const reset = useCallback(() => {
    setDataState({ ...emptyResume })
    setActiveProfileId(null)
    setActiveProfileName("")
  }, [])
  const loadSample = useCallback(() => setDataState({ ...sampleResume }), [])

  const setLanguage = useCallback(
    (language: Language) => setDataState((d) => ({ ...d, language })),
    [],
  )
  const setLayout = useCallback(
    (layout: TemplateLayout) => setDataState((d) => ({ ...d, layout })),
    [],
  )
  const updateTheme = useCallback(
    (patch: Partial<ThemeConfig>) => setDataState((d) => ({ ...d, theme: { ...d.theme, ...patch } })),
    [],
  )
  const updateHeader = useCallback(
    (patch: Partial<HeaderData>) => setDataState((d) => ({ ...d, header: { ...d.header, ...patch } })),
    [],
  )
  const setSummary = useCallback((summary: string) => setDataState((d) => ({ ...d, summary })), [])

  // Generic array helpers ----------------------------------------------------
  const pushItem = useCallback(<T,>(key: ArrayKey, item: T) => {
    setDataState((d) => ({ ...d, [key]: [...(d[key] as T[]), item] }))
  }, [])

  const patchItem = useCallback(<T extends { id: string }>(key: ArrayKey, id: string, patch: Partial<T>) => {
    setDataState((d) => ({
      ...d,
      [key]: (d[key] as T[]).map((it) => (it.id === id ? { ...it, ...patch } : it)),
    }))
  }, [])

  const removeItem = useCallback((key: ArrayKey, id: string) => {
    setDataState((d) => ({ ...d, [key]: (d[key] as { id: string }[]).filter((it) => it.id !== id) }))
  }, [])

  const moveItem = useCallback((key: ArrayKey, id: string, dir: -1 | 1) => {
    setDataState((d) => {
      const arr = [...(d[key] as { id: string }[])]
      const i = arr.findIndex((it) => it.id === id)
      const j = i + dir
      if (i === -1 || j < 0 || j >= arr.length) return d
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
      return { ...d, [key]: arr }
    })
  }, [])

  // Typed adders --------------------------------------------------------------
  const addExperience = useCallback(
    () =>
      pushItem<ExperienceItem>("experience", {
        id: uid(),
        role: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        current: false,
        description: "",
      }),
    [pushItem],
  )
  const addEducation = useCallback(
    () =>
      pushItem<EducationItem>("education", {
        id: uid(),
        degree: "",
        institution: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
      }),
    [pushItem],
  )
  const addSkill = useCallback(
    () => pushItem<SkillGroup>("skills", { id: uid(), category: "", items: "" }),
    [pushItem],
  )
  const addProject = useCallback(
    () => pushItem<ProjectItem>("projects", { id: uid(), name: "", url: "", description: "", tech: "" }),
    [pushItem],
  )
  const addLanguageItem = useCallback(
    () => pushItem<LanguageItem>("languages", { id: uid(), name: "", level: "" }),
    [pushItem],
  )
  const addReference = useCallback(
    () => pushItem<ReferenceItem>("references", { id: uid(), name: "", relation: "", contact: "" }),
    [pushItem],
  )
  const addPublication = useCallback(
    () => pushItem<PublicationItem>("publications", { id: uid(), title: "", publisher: "", date: "", url: "" }),
    [pushItem],
  )

  const value = useMemo<ResumeContextValue>(
    () => ({
      data,
      setData,
      reset,
      loadSample,
      setLanguage,
      setLayout,
      updateTheme,
      updateHeader,
      setSummary,
      addExperience,
      updateExperience: (id, patch) => patchItem<ExperienceItem>("experience", id, patch),
      addEducation,
      updateEducation: (id, patch) => patchItem<EducationItem>("education", id, patch),
      addSkill,
      updateSkill: (id, patch) => patchItem<SkillGroup>("skills", id, patch),
      addProject,
      updateProject: (id, patch) => patchItem<ProjectItem>("projects", id, patch),
      addLanguageItem,
      updateLanguageItem: (id, patch) => patchItem<LanguageItem>("languages", id, patch),
      addReference,
      updateReference: (id, patch) => patchItem<ReferenceItem>("references", id, patch),
      addPublication,
      updatePublication: (id, patch) => patchItem<PublicationItem>("publications", id, patch),
      removeItem,
      moveItem,
      activeProfileId,
      setActiveProfileId,
      activeProfileName,
      setActiveProfileName,
    }),
    [
      data,
      setData,
      reset,
      loadSample,
      setLanguage,
      setLayout,
      updateTheme,
      updateHeader,
      setSummary,
      addExperience,
      addEducation,
      addSkill,
      addProject,
      addLanguageItem,
      addReference,
      addPublication,
      patchItem,
      removeItem,
      moveItem,
      activeProfileId,
      activeProfileName,
    ],
  )

  return <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>
}

export function useResume(): ResumeContextValue {
  const ctx = useContext(ResumeContext)
  if (!ctx) throw new Error("useResume must be used within a ResumeProvider")
  return ctx
}

export function useUI(): UILabels {
  const { data } = useResume()
  return getUILabels(data.language)
}
