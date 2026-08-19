"use client"

import { useCallback, useEffect, useRef, useState } from "react"

// ============================================================================
// Lightweight 1:1 photo cropper using the native Canvas API (no dependency).
// The user uploads an image, pans (drag) and zooms (slider) within a square
// viewport, and we export a square base64 PNG for the resume header.
// ============================================================================

const VIEWPORT = 240 // on-screen crop box (px)
const OUTPUT = 400 // exported square size (px)

export function PhotoCropper({ value, onChange }: { value: string; onChange: (dataUrl: string) => void }) {
  const [rawSrc, setRawSrc] = useState<string | null>(null)
  const [scale, setScale] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const imgRef = useRef<HTMLImageElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const dragRef = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null)
  const [imgReady, setImgReady] = useState(false)

  const onSelectFile = useCallback((file: File) => {
    const reader = new FileReader()
    reader.onload = () => {
      setRawSrc(String(reader.result))
      setScale(1)
      setOffset({ x: 0, y: 0 })
      setImgReady(false)
    }
    reader.readAsDataURL(file)
  }, [])

  // Load the raw image element whenever a new source is chosen.
  useEffect(() => {
    if (!rawSrc) {
      imgRef.current = null
      return
    }
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      imgRef.current = img
      // Fit the shorter side to the viewport as the baseline scale.
      const base = VIEWPORT / Math.min(img.width, img.height)
      img.dataset.base = String(base)
      setImgReady(true)
    }
    img.src = rawSrc
  }, [rawSrc])

  // Redraw preview canvas on any state change.
  useEffect(() => {
    const canvas = canvasRef.current
    const img = imgRef.current
    if (!canvas || !img || !imgReady) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const base = Number(img.dataset.base || 1)
    const s = base * scale
    const w = img.width * s
    const h = img.height * s
    ctx.clearRect(0, 0, VIEWPORT, VIEWPORT)
    ctx.fillStyle = "#f1f1f1"
    ctx.fillRect(0, 0, VIEWPORT, VIEWPORT)
    // center + offset
    const x = (VIEWPORT - w) / 2 + offset.x
    const y = (VIEWPORT - h) / 2 + offset.y
    ctx.drawImage(img, x, y, w, h)
  }, [scale, offset, imgReady])

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    ;(e.target as HTMLCanvasElement).setPointerCapture(e.pointerId)
    dragRef.current = { x: e.clientX, y: e.clientY, ox: offset.x, oy: offset.y }
  }
  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!dragRef.current) return
    setOffset({
      x: dragRef.current.ox + (e.clientX - dragRef.current.x),
      y: dragRef.current.oy + (e.clientY - dragRef.current.y),
    })
  }
  const onPointerUp = () => {
    dragRef.current = null
  }

  const applyCrop = () => {
    const img = imgRef.current
    if (!img) return
    const out = document.createElement("canvas")
    out.width = OUTPUT
    out.height = OUTPUT
    const ctx = out.getContext("2d")
    if (!ctx) return
    const base = Number(img.dataset.base || 1)
    const ratio = OUTPUT / VIEWPORT
    const s = base * scale * ratio
    const w = img.width * s
    const h = img.height * s
    const x = (OUTPUT - w) / 2 + offset.x * ratio
    const y = (OUTPUT - h) / 2 + offset.y * ratio
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, OUTPUT, OUTPUT)
    ctx.drawImage(img, x, y, w, h)
    onChange(out.toDataURL("image/png"))
    setRawSrc(null)
  }

  // ---- Rendering states -----------------------------------------------------

  // Cropping in progress
  if (rawSrc) {
    return (
      <div className="grid gap-3 rounded-lg border border-border bg-muted/40 p-3">
        <p className="text-xs font-medium text-muted-foreground">Adjust photo (square 1:1 crop)</p>
        <div className="flex flex-col items-center gap-3">
          <canvas
            ref={canvasRef}
            width={VIEWPORT}
            height={VIEWPORT}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            className="cursor-grab touch-none rounded-md border border-border active:cursor-grabbing"
            style={{ width: VIEWPORT, height: VIEWPORT }}
            aria-label="Photo crop area. Drag to reposition."
          />
          <label className="flex w-full max-w-[240px] items-center gap-2 text-xs text-muted-foreground">
            Zoom
            <input
              type="range"
              min={1}
              max={4}
              step={0.01}
              value={scale}
              onChange={(e) => setScale(Number(e.target.value))}
              className="flex-1 accent-primary"
              aria-label="Zoom"
            />
          </label>
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setRawSrc(null)}
            className="rounded-md border border-border px-3 py-1.5 text-xs font-medium hover:bg-muted"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={applyCrop}
            className="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:opacity-90"
          >
            Apply crop
          </button>
        </div>
      </div>
    )
  }

  // Idle state: show existing photo or upload prompt
  return (
    <div className="flex items-center gap-4">
      <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-md border border-border bg-muted">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value || "/placeholder.svg"} alt="Profile preview" className="size-full object-cover" />
        ) : (
          <span className="text-[10px] text-muted-foreground">No photo</span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0]
            if (f) onSelectFile(f)
            e.target.value = ""
          }}
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="rounded-md border border-border px-3 py-1.5 text-xs font-medium hover:bg-muted"
        >
          {value ? "Change photo" : "Upload photo"}
        </button>
        {value ? (
          <button
            type="button"
            onClick={() => onChange("")}
            className="rounded-md px-3 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/10"
          >
            Remove
          </button>
        ) : null}
        <p className="max-w-[200px] text-[11px] leading-relaxed text-muted-foreground">
          Cropped to a 1:1 square and placed top-right of the CV.
        </p>
      </div>
    </div>
  )
}
