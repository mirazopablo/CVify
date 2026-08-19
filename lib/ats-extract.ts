import type { ResumeData } from "./resume-types"
import { getResumeLabels } from "./i18n"

// ============================================================================
// Deterministic, linear text extraction — this mirrors exactly what a naive
// ATS text parser would read from the document, in reading order. It also
// produces the metadata (keywords/author/description) injected into <head>
// before printing.
// ============================================================================

function line(parts: (string | undefined)[], sep = " | "): string {
  return parts.filter((p) => p && p.trim()).join(sep)
}

export function extractATSText(data: ResumeData): string {
  const L = getResumeLabels(data.language)
  const out: string[] = []
  const { header } = data

  // Header
  if (header.fullName) out.push(header.fullName)
  if (header.jobTitle) out.push(header.jobTitle)
  const contact = line([header.email, header.phone, header.location])
  if (contact) out.push(contact)
  const links = line([header.website, header.github, header.linkedin])
  if (links) out.push(links)

  // Summary
  if (data.summary.trim()) {
    out.push("", L.summary.toUpperCase(), data.summary.trim())
  }

  // Experience
  if (data.experience.length) {
    out.push("", L.experience.toUpperCase())
    for (const e of data.experience) {
      out.push(line([e.role, e.company]))
      out.push(line([e.location, `${e.startDate} - ${e.current ? L.present : e.endDate}`]))
      if (e.description.trim()) {
        for (const d of e.description.split("\n")) {
          if (d.trim()) out.push(`- ${d.trim()}`)
        }
      }
    }
  }

  // Education
  if (data.education.length) {
    out.push("", L.education.toUpperCase())
    for (const ed of data.education) {
      out.push(line([ed.degree, ed.institution]))
      out.push(line([ed.location, `${ed.startDate} - ${ed.endDate}`]))
      if (ed.description.trim()) out.push(ed.description.trim())
    }
  }

  // Skills
  if (data.skills.length) {
    out.push("", L.skills.toUpperCase())
    for (const s of data.skills) {
      out.push(line([s.category, s.items], ": "))
    }
  }

  // Projects
  if (data.projects.length) {
    out.push("", L.projects.toUpperCase())
    for (const p of data.projects) {
      out.push(line([p.name, p.url]))
      if (p.description.trim()) out.push(p.description.trim())
      if (p.tech.trim()) out.push(line([L.tech, p.tech], ": "))
    }
  }

  // Languages
  if (data.languages.length) {
    out.push("", L.languages.toUpperCase())
    for (const ln of data.languages) {
      out.push(line([ln.name, ln.level], ": "))
    }
  }

  // Publications
  if (data.publications.length) {
    out.push("", L.publications.toUpperCase())
    for (const pb of data.publications) {
      out.push(line([pb.title, pb.publisher, pb.date]))
      if (pb.url.trim()) out.push(pb.url.trim())
    }
  }

  // References
  if (data.references.length) {
    out.push("", L.references.toUpperCase())
    for (const r of data.references) {
      out.push(line([r.name, r.relation, r.contact]))
    }
  }

  return out.join("\n").replace(/\n{3,}/g, "\n\n").trim()
}

/** Build the document metadata a web-oriented PDF engine can capture. */
export function buildMetadata(data: ResumeData): {
  author: string
  description: string
  keywords: string
} {
  const { header } = data
  const skillKeywords = data.skills.flatMap((s) => s.items.split(",").map((x) => x.trim())).filter(Boolean)
  const keywords = [header.jobTitle, ...skillKeywords].filter(Boolean).join(", ")

  return {
    author: header.fullName || "Resume",
    description:
      data.summary.trim() ||
      line([header.fullName, header.jobTitle], " - ") ||
      "Professional resume",
    keywords,
  }
}
