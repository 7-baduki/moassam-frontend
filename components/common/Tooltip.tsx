interface LoginTooltipProps {
  label: string;
}

export function Tooltip({ label }: LoginTooltipProps) {
  return (
    <div className="absolute -top-9 left-1/2 -translate-x-1/2 opacity-90">
      <div className="rounded-[20px] bg-[#3D3D3D] px-3.75 py-1.5 text-xs font-medium whitespace-nowrap text-white">
        {label}
      </div>
      <div className="mx-auto h-0 w-0 border-x-12 border-t-16 border-x-transparent border-t-[#3D3D3D]" />
    </div>
  );
}
