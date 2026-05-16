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
    <Link href={href} className="group relative isolate block w-81 pt-8.5 max-sm:w-58 max-sm:pt-3">
      <Image
        src={characterSrc}
        alt=""
        width={150}
        height={141}
        className="absolute top-0 right-3.75 z-5 transition-opacity group-hover:opacity-0 max-sm:h-23.5 max-sm:w-25 md:right-0"
      />
      <Image
        src={characterHoverSrc}
        alt=""
        width={130}
        height={145}
        className="absolute top-0 right-3.75 z-5 opacity-0 transition-opacity group-hover:z-15 group-hover:opacity-100 max-sm:h-23.5 max-sm:w-25 md:right-2"
      />

      <div className="relative flex h-49.75 w-full flex-col max-sm:h-28.25">
        {/* 상단 */}
        <div
          className="flex h-17.75 shrink-0 items-end rounded-tl-2xl rounded-tr-2xl max-sm:mt-5 max-sm:h-7"
          style={{ background: upperBg }}
        >
          <div
            className="inline-flex w-fit items-center rounded-tl-lg rounded-tr-[30px] py-1 pr-6.5 pl-5 text-xs font-semibold text-white max-sm:py-0.5 max-sm:pr-10 max-sm:pl-5 max-sm:text-[11px]"
            style={{ background: mainColor }}
          >
            {label}
          </div>
        </div>

        {/* 하단 */}
        <div
          className="relative z-10 flex flex-1 flex-col justify-between rounded-br-2xl rounded-bl-2xl p-5 max-sm:h-16.25 max-sm:flex-none max-sm:flex-row max-sm:items-center max-sm:py-3"
          style={{ background: lowerBg, backdropFilter: 'blur(4px)' }}
        >
          <p
            className="typo-line-m2 text-xl font-semibold whitespace-pre-line max-sm:text-sm"
            style={{ color: mainColor }}
          >
            {description}
          </p>
          <div className="flex items-center gap-2 self-end">
            <span className="text-sm font-medium text-black-700 max-sm:hidden">바로가기</span>
            <div
              className="flex h-5 w-5 shrink-0 items-center justify-center rounded-sm max-sm:h-3 max-sm:w-3"
              style={{ background: mainColor }}
            >
              <ChevronRightIcon className="h-[8px] w-[4px] max-sm:h-[4.8px] max-sm:w-[2.4px]" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
