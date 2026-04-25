type BadgeVariant =
  | 'yellow'
  | 'pink-light'
  | 'green-light'
  | 'pink-dark'
  | 'green-dark'
  | 'outline-yellow'
  | 'outline-pink'
  | 'outline-green'
  | 'outline-gray';

interface BadgeProps {
  label: string;
  variant: BadgeVariant;
}

const VARIANT_STYLES: Record<BadgeVariant, string> = {
  yellow: 'bg-yellow-100 text-yellow-800',
  'pink-light': 'bg-pink-100 text-pink-700',
  'green-light': 'bg-green-100 text-green-700',
  'pink-dark': 'bg-pink-700 text-white',
  'green-dark': 'bg-green-700 text-white',
  'outline-yellow': 'border border-yellow-800 text-yellow-800',
  'outline-pink': 'border border-pink-700 text-pink-700',
  'outline-green': 'border border-green-700 text-green-800',
  'outline-gray': 'border border-black-560 text-black-560',
};

export default function Badge({ label, variant }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-2xl px-3.5 py-0.5 text-xs leading-[140%] font-semibold tracking-[-0.02em] ${VARIANT_STYLES[variant]}`}
    >
      {label}
    </span>
  );
}
