"use client"

import { useState } from "react"
import { useUI } from "@/lib/resume-context"
import { cn } from "@/lib/utils"
import { HeaderForm } from "./header-form"
import { SummaryForm, ThemeForm } from "./misc-forms"
import { ExperienceForm } from "./experience-form"
import { EducationForm } from "./education-form"
import { SkillsForm, LanguagesForm } from "./skills-languages-form"
import { ProjectsForm, ReferencesForm, PublicationsForm } from "./extra-forms"

interface Tab {
  id: string
  labelKey: keyof ReturnType<typeof useUI>
  render: () => React.ReactNode
}

const tabs: Tab[] = [
  { id: "header", labelKey: "headerTab", render: () => <HeaderForm /> },
  { id: "summary", labelKey: "summaryTab", render: () => <SummaryForm /> },
  { id: "experience", labelKey: "experienceTab", render: () => <ExperienceForm /> },
  { id: "education", labelKey: "educationTab", render: () => <EducationForm /> },
  { id: "skills", labelKey: "skillsTab", render: () => <SkillsForm /> },
  { id: "projects", labelKey: "projectsTab", render: () => <ProjectsForm /> },
  { id: "languages", labelKey: "languagesTab", render: () => <LanguagesForm /> },
  { id: "publications", labelKey: "publicationsTab", render: () => <PublicationsForm /> },
  { id: "references", labelKey: "referencesTab", render: () => <ReferencesForm /> },
  { id: "theme", labelKey: "themeTab", render: () => <ThemeForm /> },
]

export function EditorPanel() {
  const ui = useUI()
  const [active, setActive] = useState("header")
  const current = tabs.find((t) => t.id === active) ?? tabs[0]

  return (
    <div className="flex h-full flex-col">
      <nav className="flex flex-wrap gap-1 border-b border-border p-2" aria-label="Resume sections">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActive(t.id)}
            aria-current={active === t.id ? "page" : undefined}
            className={cn(
              "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
              active === t.id
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            {ui[t.labelKey] as string}
          </button>
        ))}
      </nav>
      <div className="flex-1 overflow-y-auto p-4">{current.render()}</div>
    </div>
  )
}
