import { cn } from "../../lib/utils"

export function Badge({ children, className, variant = 'default' }: { children: React.ReactNode, className?: string, variant?: 'default'|'success'|'warning'|'danger'|'info' }) {
  const variants = {
    default: "bg-[#222222] text-[#a1a1aa] border-[#333333]",
    success: "bg-[#22c55e]/10 text-[#22c55e] border-[#22c55e]/20",
    warning: "bg-[#f59e0b]/10 text-[#f59e0b] border-[#f59e0b]/20",
    danger: "bg-[#ef4444]/10 text-[#ef4444] border-[#ef4444]/20",
    info: "bg-[#3b82f6]/10 text-[#3b82f6] border-[#3b82f6]/20"
  }
  
  return (
    <span className={cn("px-2 py-0.5 text-xs rounded-full border", variants[variant], className)}>
      {children}
    </span>
  )
}
