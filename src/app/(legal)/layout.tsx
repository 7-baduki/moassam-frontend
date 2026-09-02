import Footer from '@/components/common/footer/Footer';

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <div className="flex-1 px-4 py-8 md:px-9 md:py-15">
        <div className="mx-auto max-w-260">{children}</div>
      </div>
      <Footer />
    </div>
  );
}
