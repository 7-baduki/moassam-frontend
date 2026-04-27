import { cn } from '@/utils/cn';

type ButtonSize = 'full' | 'sm' | 'md' | 'lg';
type ButtonVariant = 'primary' | 'outline' | 'ghost';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
  children: React.ReactNode;
}

const BASE_STYLES =
  'cursor-pointer rounded-lg font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50';

const SIZE_STYLES: Record<ButtonSize, string> = {
  full: 'w-full py-2 text-sm',
  sm: 'w-20 py-1.5 text-sm',
  md: 'w-35 py-2 text-base',
  lg: 'w-90 py-4.5 text-lg font-semibold',
};

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary: 'bg-pink-500 text-white hover:bg-pink-600 disabled:hover:bg-pink-500',
  outline:
    'border border-pink-500 text-pink-500 hover:border-pink-600 hover:text-pink-600 disabled:border-black-700 disabled:text-black-700 disabled:hover:border-black-700 disabled:hover:text-black-700',
  ghost: 'bg-transparent text-black-700 hover:underline disabled:hover:no-underline',
};

export function Button({
  size = 'md',
  variant = 'primary',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(BASE_STYLES, SIZE_STYLES[size], VARIANT_STYLES[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
