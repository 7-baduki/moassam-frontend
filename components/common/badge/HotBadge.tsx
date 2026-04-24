type HotBadgeVariant = 'type1' | 'type2';

interface HotBadgeProps {
  label: string;
  variant?: HotBadgeVariant;
}

const VARIANT_STYLES: Record<HotBadgeVariant, string> = {
  type1: 'bg-yellow-100 text-yellow-800',
  type2: 'bg-pink-50 text-[#FF4646]',
};

export default function HotBadge({ label, variant = 'type1' }: HotBadgeProps) {
  return (
    <span
      role="status"
      aria-label={label}
      className={`inline-flex items-center rounded-lg px-1 py-0.5 text-xs leading-[140%] font-semibold tracking-[-0.02em] ${VARIANT_STYLES[variant]}`}
    >
      {label}
    </span>
  );
}
