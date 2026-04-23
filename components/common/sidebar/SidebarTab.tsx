interface SidebarTabProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export default function SidebarTab({ label, isActive, onClick }: SidebarTabProps) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-[8px_40px_40px_8px] py-3 pl-5 text-sm leading-[140%] font-semibold tracking-[-0.02em] transition-colors ${
        isActive ? 'bg-pink-50 text-pink-500' : 'text-black-700 hover:bg-black-200'
      }`}
    >
      {label}
    </div>
  );
}
