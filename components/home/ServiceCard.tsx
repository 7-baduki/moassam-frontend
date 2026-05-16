import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

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
    <Link href={href} className="group relative isolate block w-81 pt-[34px]">
      <Image
        src={characterSrc}
        alt=""
        width={150}
        height={141}
        className="absolute top-0 right-0 z-[5] transition-opacity group-hover:opacity-0"
      />
      <Image
        src={characterHoverSrc}
        alt=""
        width={130}
        height={145}
        className="absolute top-0 right-2 z-[5] opacity-0 transition-opacity group-hover:z-[15] group-hover:opacity-100"
      />

      <div className="relative flex h-[199px] w-81 flex-col">
        <div
          className="flex h-[71px] shrink-0 items-end rounded-tl-2xl rounded-tr-2xl"
          style={{ background: upperBg }}
        >
          <div
            className="inline-flex w-fit items-center rounded-tl-[8px] rounded-tr-[30px] py-1 pr-6.5 pl-5 text-xs font-semibold text-white"
            style={{ background: mainColor }}
          >
            {label}
          </div>
        </div>

        <div
          className="relative z-10 flex flex-1 flex-col justify-between rounded-br-2xl rounded-bl-2xl p-5"
          style={{ background: lowerBg, backdropFilter: 'blur(4px)' }}
        >
          <p
            className="typo-line-m2 text-xl font-semibold whitespace-pre-line"
            style={{ color: mainColor }}
          >
            {description}
          </p>
          <div className="flex items-center justify-end gap-2">
            <span className="text-sm font-medium text-black-700">바로가기</span>
            <div
              className="flex h-5 w-5 shrink-0 items-center justify-center rounded-sm text-xs font-bold text-white"
              style={{ background: mainColor }}
            >
              ›
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
