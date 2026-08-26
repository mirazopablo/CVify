"use client"

import { Download, FolderOpen, Printer, ScanSearch, Sparkles, Upload, Settings } from "lucide-react"
import { useResume, useUI } from "@/lib/resume-context"
import { exportJSON } from "@/lib/storage"
import { printResume } from "@/lib/print"

export function MobileOptionsPanel({
  onOpenProfiles,
  onOpenAts,
  onImportClick,
  onPrintClick,
}: {
  onOpenProfiles: () => void
  onOpenAts: () => void
  onImportClick: () => void
  onPrintClick: () => void
}) {
  const { data, loadSample } = useResume()
  const ui = useUI()

  return (
    <div className="flex flex-col gap-6 p-6 h-full max-w-md mx-auto">
      <div className="flex items-center gap-3 border-b border-border pb-4">
        <Settings className="w-6 h-6 text-primary" />
        <h2 className="text-xl font-bold">{ui.optionsBtn || "Options"}</h2>
      </div>

      <div className="flex flex-col gap-2">
        <OptionButton
          icon={<FolderOpen className="w-5 h-5 text-muted-foreground" />}
          label={ui.profiles}
          onClick={onOpenProfiles}
        />
        <OptionButton
          icon={<ScanSearch className="w-5 h-5 text-muted-foreground" />}
          label={ui.atsSim}
          onClick={onOpenAts}
        />
        <OptionButton
          icon={<Sparkles className="w-5 h-5 text-muted-foreground" />}
          label={ui.sample}
          onClick={loadSample}
        />
        
        <div className="h-px bg-border my-2" />
        
        <OptionButton
          icon={<Download className="w-5 h-5 text-muted-foreground" />}
          label={ui.export}
          onClick={() => exportJSON(data)}
        />
        <OptionButton
          icon={<Upload className="w-5 h-5 text-muted-foreground" />}
          label={ui.import}
          onClick={onImportClick}
        />
        
        <div className="h-px bg-border my-2" />
        
        <OptionButton
          icon={<Printer className="w-5 h-5 text-muted-foreground" />}
          label={ui.print}
          onClick={onPrintClick}
        />

        <div className="h-px bg-border my-2" />
        
        <div className="flex justify-center pt-2">
          <a 
            href="https://cafecito.app/mirazopablo" 
            rel="noopener noreferrer" 
            target="_blank"
            className="transition-transform hover:scale-105"
          >
            <img 
              src="https://cdn.cafecito.app/imgs/buttons/button_5.png" 
              srcSet="https://cdn.cafecito.app/imgs/buttons/button_5.png 1x, https://cdn.cafecito.app/imgs/buttons/button_5_2x.png 2x, https://cdn.cafecito.app/imgs/buttons/button_5_3.75x.png 3.75x" 
              alt="Invitame un café en cafecito.app" 
              className="h-10 w-auto"
            />
          </a>
        </div>
      </div>
    </div>
  )
}

function OptionButton({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-4 w-full p-4 rounded-xl bg-card border border-border/50 hover:bg-muted/50 active:bg-muted transition-colors text-left"
    >
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted/50 shrink-0">
        {icon}
      </div>
      <span className="font-medium text-base text-foreground">{label}</span>
    </button>
  )
}
