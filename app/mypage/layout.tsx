export default function MyPageLayout({ children }: { children: React.ReactNode }) {
  return <div className="xl:px-[clamp(1.5rem,11.7vw,14.0625rem)] xl:py-20">{children}</div>;
}
