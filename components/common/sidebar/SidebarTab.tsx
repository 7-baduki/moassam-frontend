import Link from 'next/link';

interface SidebarTabProps {
  label: string;
  href: string;
  isActive: boolean;
}

export default function SidebarTab({ label, href, isActive }: SidebarTabProps) {
  return (
    <Link
      href={href}
      aria-current={isActive ? 'page' : undefined}
      className={`block rounded-[8px_40px_40px_8px] py-3 pl-5 text-sm leading-[140%] font-semibold tracking-[-0.02em] transition-colors ${
        isActive ? 'bg-pink-50 text-pink-500' : 'text-black-700 hover:bg-black-200'
      }`}
    >
      {label}
    </Link>
  );
}
