interface LoginTooltipProps {
  label: string;
}

export function LoginTooltip({ label }: LoginTooltipProps) {
  return (
    <div className="absolute -top-[36px] left-1/2 -translate-x-1/2 opacity-90">
      <div className="flex h-[30px] w-[130px] items-center justify-center rounded-[20px] bg-[#3D3D3D] py-[6px] pr-[15px] pl-[15px] text-xs font-medium text-white">
        {label}
      </div>
      <div className="mx-auto h-0 w-0 border-x-[12px] border-t-[16px] border-x-transparent border-t-[#3D3D3D]" />
    </div>
  );
}
