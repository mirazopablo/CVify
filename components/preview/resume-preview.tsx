"use client"

import type { CSSProperties } from "react"
import { useResume } from "@/lib/resume-context"
import { getResumeLabels } from "@/lib/i18n"
import type { ResumeData } from "@/lib/resume-types"

// ============================================================================
// The printable CV. Single column, semantic HTML5 only (header/section/
// article/h1/h2/p/ul). No tables, no multi-column layout, no progress bars.
// Colors come from inline CSS variables so <input type=color> updates live and
// text always remains real, selectable text.
// ============================================================================

function dateRange(start: string, end: string, current: boolean, present: string): string {
  if (!start && !end && !current) return ""
  const right = current ? present : end
  return [start, right].filter(Boolean).join(" – ")
}

function Bullets({ text }: { text: string }) {
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean)
  if (lines.length === 0) return null
  if (lines.length === 1) return <p className="cv-text">{lines[0]}</p>
  return (
    <ul className="cv-bullets">
      {lines.map((l, i) => (
        <li key={i}>{l}</li>
      ))}
    </ul>
  )
}

export function ResumePreview({ data: dataProp }: { data?: ResumeData }) {
  const ctx = useResume()
  const data = dataProp ?? ctx.data
  const L = getResumeLabels(data.language)
  const { header: h } = data

  const styleVars = {
    "--cv-accent": data.theme.accent,
    "--cv-text": data.theme.text,
    "--cv-muted": data.theme.muted,
  } as CSSProperties

  const contactLine = [h.email, h.phone, h.location].filter(Boolean).join("  •  ")
  const links = [h.website, h.github, h.linkedin].filter(Boolean)

  return (
    <article id="cv-document" className="cv-root" style={styleVars} lang={data.language}>
      {/* Header */}
      <header className="cv-header">
        <div className="cv-header-main">
          <h1 className="cv-name">{h.fullName || "Your Name"}</h1>
          {h.jobTitle ? <p className="cv-title">{h.jobTitle}</p> : null}
          {contactLine ? <p className="cv-contact">{contactLine}</p> : null}
          {links.length ? <p className="cv-links">{links.join("  •  ")}</p> : null}
        </div>
        {h.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={h.photo || "/placeholder.svg"} alt={`Photo of ${h.fullName || "candidate"}`} className="cv-photo" />
        ) : null}
      </header>

      {/* Summary */}
      {data.summary.trim() ? (
        <section className="cv-section">
          <h2 className="cv-section-title">{L.summary}</h2>
          <p className="cv-text">{data.summary}</p>
        </section>
      ) : null}

      {/* Experience */}
      {data.experience.length ? (
        <section className="cv-section">
          <h2 className="cv-section-title">{L.experience}</h2>
          {data.experience.map((e) => (
            <article key={e.id} className="cv-entry">
              <div className="cv-entry-head">
                <p className="cv-entry-title">
                  {e.role}
                  {e.role && e.company ? <span className="cv-sep"> — </span> : null}
                  {e.company}
                </p>
                <p className="cv-entry-meta">{dateRange(e.startDate, e.endDate, e.current, L.present)}</p>
              </div>
              {e.location ? <p className="cv-entry-sub">{e.location}</p> : null}
              <Bullets text={e.description} />
            </article>
          ))}
        </section>
      ) : null}

      {/* Education */}
      {data.education.length ? (
        <section className="cv-section">
          <h2 className="cv-section-title">{L.education}</h2>
          {data.education.map((ed) => (
            <article key={ed.id} className="cv-entry">
              <div className="cv-entry-head">
                <p className="cv-entry-title">
                  {ed.degree}
                  {ed.degree && ed.institution ? <span className="cv-sep"> — </span> : null}
                  {ed.institution}
                </p>
                <p className="cv-entry-meta">{dateRange(ed.startDate, ed.endDate, false, L.present)}</p>
              </div>
              {ed.location ? <p className="cv-entry-sub">{ed.location}</p> : null}
              {ed.description ? <p className="cv-text">{ed.description}</p> : null}
            </article>
          ))}
        </section>
      ) : null}

      {/* Skills */}
      {data.skills.length ? (
        <section className="cv-section">
          <h2 className="cv-section-title">{L.skills}</h2>
          {data.skills.map((s) => (
            <p key={s.id} className="cv-text">
              {s.category ? <strong className="cv-skill-cat">{s.category}: </strong> : null}
              {s.items}
            </p>
          ))}
        </section>
      ) : null}

      {/* Projects */}
      {data.projects.length ? (
        <section className="cv-section">
          <h2 className="cv-section-title">{L.projects}</h2>
          {data.projects.map((p) => (
            <article key={p.id} className="cv-entry">
              <div className="cv-entry-head">
                <p className="cv-entry-title">{p.name}</p>
                {p.url ? <p className="cv-entry-meta">{p.url}</p> : null}
              </div>
              {p.description ? <p className="cv-text">{p.description}</p> : null}
              {p.tech ? (
                <p className="cv-entry-sub">
                  {L.tech}: {p.tech}
                </p>
              ) : null}
            </article>
          ))}
        </section>
      ) : null}

      {/* Languages */}
      {data.languages.length ? (
        <section className="cv-section">
          <h2 className="cv-section-title">{L.languages}</h2>
          <p className="cv-text">
            {data.languages.map((ln, i) => (
              <span key={ln.id}>
                {ln.name}
                {ln.level ? ` (${ln.level})` : ""}
                {i < data.languages.length - 1 ? "  •  " : ""}
              </span>
            ))}
          </p>
        </section>
      ) : null}

      {/* Publications */}
      {data.publications.length ? (
        <section className="cv-section">
          <h2 className="cv-section-title">{L.publications}</h2>
          {data.publications.map((pb) => (
            <article key={pb.id} className="cv-entry">
              <p className="cv-entry-title">{pb.title}</p>
              <p className="cv-entry-sub">{[pb.publisher, pb.date].filter(Boolean).join("  •  ")}</p>
              {pb.url ? <p className="cv-entry-meta-inline">{pb.url}</p> : null}
            </article>
          ))}
        </section>
      ) : null}

      {/* References */}
      {data.references.length ? (
        <section className="cv-section">
          <h2 className="cv-section-title">{L.references}</h2>
          {data.references.map((r) => (
            <p key={r.id} className="cv-text">
              <strong>{r.name}</strong>
              {r.relation ? ` — ${r.relation}` : ""}
              {r.contact ? `  •  ${r.contact}` : ""}
            </p>
          ))}
        </section>
      ) : null}
    </article>
  )
}
