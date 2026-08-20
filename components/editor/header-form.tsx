"use client"

import { useResume, useUI } from "@/lib/resume-context"
import { TextField, PhoneField } from "./fields"
import { PhotoCropper } from "../photo-cropper"

export function HeaderForm() {
  const { data, updateHeader } = useResume()
  const ui = useUI()
  const h = data.header

  return (
    <div className="grid gap-4">
      <PhotoCropper value={h.photo} onChange={(photo) => updateHeader({ photo })} />

      <div className="grid gap-3 sm:grid-cols-2">
        <TextField label={ui.fullName} value={h.fullName} onChange={(v) => updateHeader({ fullName: v })} />
        <TextField label={ui.jobTitle} value={h.jobTitle} onChange={(v) => updateHeader({ jobTitle: v })} />
        <TextField label={ui.email} type="email" value={h.email} onChange={(v) => updateHeader({ email: v })} />
        <PhoneField label={ui.phone} value={h.phone} onChange={(v) => updateHeader({ phone: v })} />
        <TextField label={ui.location} value={h.location} onChange={(v) => updateHeader({ location: v })} />
        <TextField label={ui.website} value={h.website} onChange={(v) => updateHeader({ website: v })} />
        <TextField label={ui.github} value={h.github} onChange={(v) => updateHeader({ github: v })} />
        <TextField label={ui.linkedin} value={h.linkedin} onChange={(v) => updateHeader({ linkedin: v })} />
      </div>
    </div>
  )
}
