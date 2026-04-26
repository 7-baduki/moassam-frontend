import { cn } from '@/utils/cn';

interface LoginButtonProps {
  icon: React.ReactNode;
  label: string;
  className?: string;
  onClick?: () => void;
}

export function LoginButton({ icon, label, className, onClick }: LoginButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        'flex w-full cursor-pointer items-center justify-center gap-3 rounded-2xl px-[100px] py-[17.5px] text-base font-medium transition-opacity hover:opacity-90',
        className,
      )}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
