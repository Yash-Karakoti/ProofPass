import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface PrivacyTooltipProps {
  content: string;
  children?: React.ReactNode;
}

export function PrivacyTooltip({ content, children }: PrivacyTooltipProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {children || (
          <button className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-muted text-muted-foreground hover:text-foreground transition-colors">
            <Info className="w-3 h-3" />
          </button>
        )}
      </TooltipTrigger>
      <TooltipContent className="max-w-xs bg-card border-border text-foreground">
        <p className="text-sm">{content}</p>
      </TooltipContent>
    </Tooltip>
  );
}
