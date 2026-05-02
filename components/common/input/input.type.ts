export type InputVariant = 'default' | 'search';
export type InputSize = 'sm' | 'full';

export interface InputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'size' | 'value'
> {
  variant?: InputVariant;
  size?: InputSize;
  value?: string;
  onClear?: () => void;
}
