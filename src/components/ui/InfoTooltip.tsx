"use client"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Info } from "lucide-react"

interface InfoTooltipProps {
  content: string | React.ReactNode;
  iconSize?: number;
}

export function InfoTooltip({ content, iconSize = 14 }: InfoTooltipProps) {
  return (
    <Tooltip>
      <TooltipTrigger type="button" className="inline-flex cursor-help ml-1.5 align-middle text-muted-foreground hover:text-foreground transition-colors">
        <Info size={iconSize} />
        <span className="sr-only">Información</span>
      </TooltipTrigger>
      <TooltipContent className="max-w-[300px] p-3 text-sm leading-relaxed" sideOffset={5}>
        {content}
      </TooltipContent>
    </Tooltip>
  )
}
