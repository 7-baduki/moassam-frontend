interface DropdownItemProps {
  label: string;
}

export function DropdownItem({ label }: DropdownItemProps) {
  return (
    <div className="w-full px-5 py-[7.5px] text-left text-sm leading-[140%] tracking-[-0.02em] text-black">
      {label}
    </div>
  );
}
