interface TagLabelProps {
  label: string;
}

export default function TagLabel({ label }: TagLabelProps) {
  return (
    <span className="inline-block rounded-r-2xl bg-yellow-900 py-0.5 pr-4 pl-5 text-xs leading-[140%] font-semibold tracking-[-0.02em] text-white">
      {label}
    </span>
  );
}
