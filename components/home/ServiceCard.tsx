import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { ChevronRightIcon } from '@/app/assets/icons';

interface ServiceCardProps {
  label: string;
  description: string;
  href: string;
  characterSrc: StaticImageData;
  characterHoverSrc: StaticImageData;
  mainColor: string;
  upperBg: string;
  lowerBg: string;
}

export default function ServiceCard({
  label,
  description,
  href,
  characterSrc,
  characterHoverSrc,
  mainColor,
  upperBg,
  lowerBg,
}: ServiceCardProps) {
  return (
    <Link href={href} className="group relative isolate block w-58 pt-3 md:w-81 md:pt-8.5">
      <Image
        src={characterSrc}
        alt=""
        width={150}
        height={141}
        className="absolute top-0 right-3.75 z-5 h-23.5 w-25 transition-opacity group-hover:opacity-0 md:right-0 md:h-auto md:w-auto"
      />
      <Image
        src={characterHoverSrc}
        alt=""
        width={130}
        height={145}
        className="absolute top-0 right-3.75 z-5 h-23.5 w-25 opacity-0 transition-opacity group-hover:z-10 group-hover:opacity-100 md:right-2 md:h-auto md:w-auto"
      />

      <div className="relative flex h-28.25 w-full flex-col md:h-49.75">
        {/* 상단 */}
        <div
          className="mt-5 flex h-7 shrink-0 items-end rounded-tl-2xl rounded-tr-2xl md:mt-0 md:h-17.75"
          style={{ background: upperBg }}
        >
          <div
            className="inline-flex w-fit items-center rounded-tl-lg rounded-tr-[30px] py-0.5 pr-10 pl-5 text-[11px] font-semibold text-white md:py-1 md:pr-6.5 md:text-xs"
            style={{ background: mainColor }}
          >
            {label}
          </div>
        </div>

        {/* 하단 */}
        <div
          className="relative z-10 flex h-16.25 flex-none flex-row items-center justify-between rounded-br-2xl rounded-bl-2xl px-5 py-3 md:h-auto md:flex-1 md:flex-col md:items-stretch md:p-5"
          style={{ background: lowerBg, backdropFilter: 'blur(4px)' }}
        >
          <p
            className="typo-line-m2 text-sm font-semibold whitespace-pre-line md:text-xl"
            style={{ color: mainColor }}
          >
            {description}
          </p>
          <div className="flex items-center gap-2 self-end">
            <span className="hidden text-sm font-medium text-black-700 md:inline">바로가기</span>
            <div
              className="flex h-3 w-3 shrink-0 items-center justify-center rounded-sm md:h-5 md:w-5"
              style={{ background: mainColor }}
            >
              <ChevronRightIcon className="h-[4.8px] w-[2.4px] md:h-2 md:w-1" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
