"use client"

import { useResume, useUI } from "@/lib/resume-context"
import { TextAreaField, TextField } from "./fields"
import { SectionCard, SectionGroup } from "./section-card"
import { EmptyHint } from "./experience-form"

export function ProjectsForm() {
  const { data, addProject, updateProject, removeItem, moveItem } = useResume()
  const ui = useUI()

  return (
    <SectionGroup title={ui.projectsTab} onAdd={addProject} addLabel={ui.addProject}>
      {data.projects.map((p) => (
        <SectionCard
          key={p.id}
          title={p.name || "New project"}
          subtitle={p.tech}
          onRemove={() => removeItem("projects", p.id)}
          onMoveUp={() => moveItem("projects", p.id, -1)}
          onMoveDown={() => moveItem("projects", p.id, 1)}
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <TextField label={ui.projectName} value={p.name} onChange={(v) => updateProject(p.id, { name: v })} />
            <TextField label={ui.url} value={p.url} placeholder={ui.urlHint} onChange={(v) => updateProject(p.id, { url: v })} />
          </div>
          <TextField
            label={ui.techStack}
            value={p.tech}
            onChange={(v) => updateProject(p.id, { tech: v })}
          />
          <TextAreaField
            label={ui.description}
            value={p.description}
            onChange={(v) => updateProject(p.id, { description: v })}
            rows={2}
          />
        </SectionCard>
      ))}
      {data.projects.length === 0 ? <EmptyHint text={ui.noProjectsHint} /> : null}
    </SectionGroup>
  )
}

export function ReferencesForm() {
  const { data, addReference, updateReference, removeItem, moveItem } = useResume()
  const ui = useUI()

  return (
    <SectionGroup title={ui.referencesTab} onAdd={addReference} addLabel={ui.addReference}>
      {data.references.map((r) => (
        <SectionCard
          key={r.id}
          title={r.name || "New reference"}
          subtitle={r.relation}
          onRemove={() => removeItem("references", r.id)}
          onMoveUp={() => moveItem("references", r.id, -1)}
          onMoveDown={() => moveItem("references", r.id, 1)}
        >
          <TextField label={ui.name} value={r.name} onChange={(v) => updateReference(r.id, { name: v })} />
          <TextField
            label={ui.relation}
            value={r.relation}
            onChange={(v) => updateReference(r.id, { relation: v })}
          />
          <TextField label={ui.contactInfo} value={r.contact} onChange={(v) => updateReference(r.id, { contact: v })} />
        </SectionCard>
      ))}
      {data.references.length === 0 ? <EmptyHint text={ui.noReferencesHint} /> : null}
    </SectionGroup>
  )
}

export function PublicationsForm() {
  const { data, addPublication, updatePublication, removeItem, moveItem } = useResume()
  const ui = useUI()

  return (
    <SectionGroup title={ui.publicationsTab} onAdd={addPublication} addLabel={ui.addPublication}>
      {data.publications.map((pb) => (
        <SectionCard
          key={pb.id}
          title={pb.title || "New publication"}
          subtitle={pb.publisher}
          onRemove={() => removeItem("publications", pb.id)}
          onMoveUp={() => moveItem("publications", pb.id, -1)}
          onMoveDown={() => moveItem("publications", pb.id, 1)}
        >
          <TextField label={ui.title} value={pb.title} onChange={(v) => updatePublication(pb.id, { title: v })} />
          <div className="grid gap-3 sm:grid-cols-2">
            <TextField
              label={ui.publisher}
              value={pb.publisher}
              onChange={(v) => updatePublication(pb.id, { publisher: v })}
            />
            <TextField label={ui.date} value={pb.date} onChange={(v) => updatePublication(pb.id, { date: v })} />
          </div>
          <TextField label={ui.url} value={pb.url} placeholder={ui.urlHint} onChange={(v) => updatePublication(pb.id, { url: v })} />
        </SectionCard>
      ))}
      {data.publications.length === 0 ? <EmptyHint text={ui.noPublicationsHint} /> : null}
    </SectionGroup>
  )
}
