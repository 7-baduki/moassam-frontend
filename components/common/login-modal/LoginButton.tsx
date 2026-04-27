import { cn } from '@/utils/cn';
import { Button } from '@/components/common/button/Button';

interface LoginButtonProps {
  icon: React.ReactNode;
  label: string;
  className?: string;
  onClick?: () => void;
}

export function LoginButton({ icon, label, className, onClick }: LoginButtonProps) {
  return (
    <Button
      type="button"
      className={cn(
        'flex h-15 w-full cursor-pointer items-center justify-center gap-3 rounded-lg px-25 py-[17.5px] text-base leading-[140%] font-medium tracking-[-0.02em] transition-opacity hover:opacity-90',
        className,
      )}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </Button>
  );
}
