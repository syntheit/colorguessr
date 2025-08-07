import { cn } from "~/lib/utils";
import { memo } from "react";

interface ColorDisplayProps {
  color: string;
  className?: string;
}

export const ColorDisplay = memo(function ColorDisplay({ color, className }: ColorDisplayProps) {
  return (
    <div className={cn("relative", className)}>
      <div 
        className="w-full h-64 md:h-80 rounded-2xl shadow-2xl border-4 border-border/20"
        style={{ backgroundColor: color }}
      />
    </div>
  );
}); 