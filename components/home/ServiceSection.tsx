import Image from 'next/image';
import Link from 'next/link';
import Badge from '@/components/common/badge/Badge';
import { ServiceObservations, ServiceBoard, ServiceMoabang } from '@/app/assets/images';

const SERVICES = [
  {
    label: 'AI 관찰일지',
    href: '/observations',
    imageSrc: ServiceObservations,
  },
  {
    label: '자유게시판',
    href: '/community/board',
    imageSrc: ServiceBoard,
  },
  {
    label: '모아방',
    href: '/community/moabang',
    imageSrc: ServiceMoabang,
  },
];

export default function ServiceSection() {
  return (
    <section className="w-full bg-white py-20 md:py-15">
      <div className="mx-auto flex w-full max-w-293 items-start gap-18.5 md:flex-col md:items-center md:gap-7.5 lg:flex-row lg:items-start lg:gap-18.5">
        <div className="mt-7.5 md:mt-0 lg:mt-7.5">
          <Badge label="주요 서비스" variant="pink-light" />
        </div>
        <div className="flex gap-3.5 md:flex-col md:gap-4 lg:flex-row lg:gap-3.5">
          {SERVICES.map(({ label, href, imageSrc }) => (
            <Link
              key={label}
              href={href}
              className="block w-81 shrink-0 transition-opacity hover:opacity-90"
            >
              <Image
                src={imageSrc}
                alt={label}
                width={324}
                height={233}
                className="h-58.25 w-81 rounded-2xl object-cover"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
