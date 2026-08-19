"use client"

import { useResume, useUI } from "@/lib/resume-context"
import { TextAreaField, TextField } from "./fields"
import { SectionCard, SectionGroup } from "./section-card"
import { EmptyHint } from "./experience-form"

export function EducationForm() {
  const { data, addEducation, updateEducation, removeItem, moveItem } = useResume()
  const ui = useUI()

  return (
    <SectionGroup title={ui.educationTab} onAdd={addEducation} addLabel={ui.addEducation}>
      {data.education.map((ed) => (
        <SectionCard
          key={ed.id}
          title={ed.degree || "New entry"}
          subtitle={ed.institution}
          onRemove={() => removeItem("education", ed.id)}
          onMoveUp={() => moveItem("education", ed.id, -1)}
          onMoveDown={() => moveItem("education", ed.id, 1)}
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <TextField label={ui.degree} value={ed.degree} onChange={(v) => updateEducation(ed.id, { degree: v })} />
            <TextField
              label={ui.institution}
              value={ed.institution}
              onChange={(v) => updateEducation(ed.id, { institution: v })}
            />
            <TextField label={ui.location} value={ed.location} onChange={(v) => updateEducation(ed.id, { location: v })} />
            <div className="grid grid-cols-2 gap-3">
              <TextField
                label={ui.startDate}
                value={ed.startDate}
                placeholder="2017"
                onChange={(v) => updateEducation(ed.id, { startDate: v })}
              />
              <TextField
                label={ui.endDate}
                value={ed.endDate}
                placeholder="2021"
                onChange={(v) => updateEducation(ed.id, { endDate: v })}
              />
            </div>
          </div>
          <TextAreaField
            label={ui.description}
            value={ed.description}
            onChange={(v) => updateEducation(ed.id, { description: v })}
            rows={2}
          />
        </SectionCard>
      ))}
      {data.education.length === 0 ? <EmptyHint text={ui.noEducationHint} /> : null}
    </SectionGroup>
  )
}
