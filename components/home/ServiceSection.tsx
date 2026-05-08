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
    <section className="w-full bg-white py-20">
      <div className="mx-auto flex max-w-fit items-start gap-[74px]">
        <div className="mt-[30px]">
          <Badge label="주요 서비스" variant="pink-light" />
        </div>
        <div className="flex gap-3.5">
          {SERVICES.map(({ label, href, imageSrc }) => (
            <Link
              key={label}
              href={href}
              className="block w-[324px] shrink-0 transition-opacity hover:opacity-90"
            >
              <Image
                src={imageSrc}
                alt={label}
                width={324}
                height={233}
                className="h-[233px] w-[324px] rounded-2xl object-cover"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
