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
    <section className="w-full bg-white py-15 md:py-20" aria-label="주요 서비스 섹션">
      <div className="mx-auto flex w-full flex-col items-center gap-7.5 md:max-w-293 md:flex-row md:items-start md:gap-17.5">
        <div className="shrink-0 md:mt-7.5">
          <Badge label="주요 서비스" variant="pink-light" />
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:gap-4">
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
                height={125}
                className="h-31.25 w-81 rounded-2xl object-cover object-top"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
