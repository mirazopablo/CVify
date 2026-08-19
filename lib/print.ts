import type { ResumeData } from "./resume-types"
import { buildMetadata } from "./ats-extract"

// ============================================================================
// Injects structured document metadata into <head> and triggers the browser's
// native print flow. Using window.print() (not html2canvas) guarantees the
// generated PDF contains real, selectable text with a linear reading order.
// ============================================================================

function upsertMeta(name: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)
  if (!el) {
    el = document.createElement("meta")
    el.setAttribute("name", name)
    document.head.appendChild(el)
  }
  el.setAttribute("content", content)
}

export function printResume(data: ResumeData) {
  const meta = buildMetadata(data)
  const prevTitle = document.title

  // Document title becomes the default PDF file name in most browsers.
  const fileTitle = data.header.fullName
    ? `${data.header.fullName} — ${data.header.jobTitle || "Resume"}`
    : "Resume"
  document.title = fileTitle

  upsertMeta("author", meta.author)
  upsertMeta("description", meta.description)
  upsertMeta("keywords", meta.keywords)

  const restore = () => {
    document.title = prevTitle
    window.removeEventListener("afterprint", restore)
  }
  window.addEventListener("afterprint", restore)

  window.print()
}
