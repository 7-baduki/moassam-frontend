type BadgeVariant =
  | 'common'
  | 'age3'
  | 'age5'
  | 'age6'
  | 'age7'
  | 'activity'
  | 'diary'
  | 'plan'
  | 'notice';

interface BadgeProps {
  label: string;
  variant: BadgeVariant;
}

const VARIANT_STYLES: Record<BadgeVariant, string> = {
  common: 'bg-yellow-100 text-yellow-800',
  age3: 'bg-pink-100 text-pink-700',
  age5: 'bg-green-100 text-green-700',
  age6: 'bg-pink-700 text-white',
  age7: 'bg-green-700 text-white',
  activity: 'border border-yellow-800 text-yellow-800',
  diary: 'border border-pink-700 <text-pink-7></text-pink-7>00',
  plan: 'border border-green-700 text-green-800',
  notice: 'border border-black-600 text-black-600',
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
