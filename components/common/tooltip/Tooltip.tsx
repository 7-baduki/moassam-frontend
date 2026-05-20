import { cn } from '@/utils/cn';

interface TooltipProps {
  label: string;
  className?: string;
  labelClassName?: string;
  style?: React.CSSProperties;
}

export function Tooltip({ label, className, labelClassName, style }: TooltipProps) {
  return (
    <div className={cn('absolute -top-9 left-1/2 z-200 -translate-x-1/2', className)} style={style}>
      <div
        className={cn(
          'rounded-[20px] bg-black/80 px-3.75 py-1.5 text-xs font-medium whitespace-nowrap text-white',
          labelClassName,
        )}
      >
        {label}
      </div>
      <div className="mx-auto h-0 w-0 border-x-12 border-t-16 border-x-transparent border-t-black/80" />
    </div>
  );
}
