interface LoginTooltipProps {
  label: string;
}

export function Tooltip({ label }: LoginTooltipProps) {
  return (
    <div className="absolute -top-9 left-1/2 -translate-x-1/2 opacity-90">
      <div className="flex h-7.5 w-32.5 items-center justify-center rounded-[20px] bg-[#3D3D3D] py-1.5 pr-3.75 pl-3.75 text-xs font-medium text-white">
        {label}
      </div>
      <div className="mx-auto h-0 w-0 border-x-12 border-t-16 border-x-transparent border-t-[#3D3D3D]" />
    </div>
  );
}
