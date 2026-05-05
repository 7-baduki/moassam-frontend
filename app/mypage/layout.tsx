export default function MyPageLayout({ children }: { children: React.ReactNode }) {
  return <div className="px-[clamp(1.5rem,11.7vw,14.0625rem)] py-20">{children}</div>;
}
