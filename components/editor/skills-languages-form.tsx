"use client"

import { useResume, useUI } from "@/lib/resume-context"
import { TextField } from "./fields"
import { SectionCard, SectionGroup } from "./section-card"
import { EmptyHint } from "./experience-form"

export function SkillsForm() {
  const { data, addSkill, updateSkill, removeItem, moveItem } = useResume()
  const ui = useUI()

  return (
    <SectionGroup
      title={ui.skillsTab}
      description={ui.skillsDesc}
      onAdd={addSkill}
      addLabel={ui.addGroup}
    >
      {data.skills.map((s) => (
        <SectionCard
          key={s.id}
          title={s.category || "New group"}
          subtitle={s.items}
          onRemove={() => removeItem("skills", s.id)}
          onMoveUp={() => moveItem("skills", s.id, -1)}
          onMoveDown={() => moveItem("skills", s.id, 1)}
        >
          <TextField
            label={ui.category}
            value={s.category}
            placeholder={ui.categoryHint}
            onChange={(v) => updateSkill(s.id, { category: v })}
          />
          <TextField
            label={ui.commaSeparated}
            value={s.items}
            placeholder={ui.commaSeparatedHint}
            onChange={(v) => updateSkill(s.id, { items: v })}
          />
        </SectionCard>
      ))}
      {data.skills.length === 0 ? <EmptyHint text={ui.noSkillsHint} /> : null}
    </SectionGroup>
  )
}

export function LanguagesForm() {
  const { data, addLanguageItem, updateLanguageItem, removeItem, moveItem } = useResume()
  const ui = useUI()

  return (
    <SectionGroup title={ui.languagesTab} onAdd={addLanguageItem} addLabel={ui.addLanguage}>
      {data.languages.map((ln) => (
        <SectionCard
          key={ln.id}
          title={ln.name || "New language"}
          subtitle={ln.level}
          onRemove={() => removeItem("languages", ln.id)}
          onMoveUp={() => moveItem("languages", ln.id, -1)}
          onMoveDown={() => moveItem("languages", ln.id, 1)}
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <TextField label={ui.language} value={ln.name} onChange={(v) => updateLanguageItem(ln.id, { name: v })} />
            <TextField
              label={ui.level}
              value={ln.level}
              placeholder={ui.levelHint}
              onChange={(v) => updateLanguageItem(ln.id, { level: v })}
            />
          </div>
        </SectionCard>
      ))}
      {data.languages.length === 0 ? <EmptyHint text={ui.noLanguagesHint} /> : null}
    </SectionGroup>
  )
}
