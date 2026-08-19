"use client"

import { useResume, useUI } from "@/lib/resume-context"
import { CheckboxField, TextAreaField, TextField } from "./fields"
import { SectionCard, SectionGroup } from "./section-card"

export function ExperienceForm() {
  const { data, addExperience, updateExperience, removeItem, moveItem } = useResume()
  const ui = useUI()

  return (
    <SectionGroup title={ui.experienceTab} onAdd={addExperience} addLabel={ui.addRole}>
      {data.experience.map((e) => (
        <SectionCard
          key={e.id}
          title={e.role || "New role"}
          subtitle={e.company}
          onRemove={() => removeItem("experience", e.id)}
          onMoveUp={() => moveItem("experience", e.id, -1)}
          onMoveDown={() => moveItem("experience", e.id, 1)}
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <TextField label={ui.roleTitle} value={e.role} onChange={(v) => updateExperience(e.id, { role: v })} />
            <TextField label={ui.company} value={e.company} onChange={(v) => updateExperience(e.id, { company: v })} />
            <TextField label={ui.location} value={e.location} onChange={(v) => updateExperience(e.id, { location: v })} />
            <div className="grid grid-cols-2 gap-3">
              <TextField
                label={ui.startDate}
                value={e.startDate}
                placeholder="2021"
                onChange={(v) => updateExperience(e.id, { startDate: v })}
              />
              <TextField
                label={ui.endDate}
                value={e.endDate}
                placeholder="2023"
                onChange={(v) => updateExperience(e.id, { endDate: v })}
              />
            </div>
          </div>
          <CheckboxField
            label={ui.currentRole}
            checked={e.current}
            onChange={(current) => updateExperience(e.id, { current })}
          />
          <TextAreaField
            label={ui.description}
            value={e.description}
            onChange={(v) => updateExperience(e.id, { description: v })}
            hint={ui.experienceDescHint}
            rows={4}
          />
        </SectionCard>
      ))}
      {data.experience.length === 0 ? <EmptyHint text={ui.noExperienceHint} /> : null}
    </SectionGroup>
  )
}

export function EmptyHint({ text }: { text: string }) {
  return (
    <p className="rounded-md border border-dashed border-border px-3 py-4 text-center text-xs text-muted-foreground">
      {text}
    </p>
  )
}
