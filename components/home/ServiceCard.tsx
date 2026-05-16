import Image from 'next/image';
import Link from 'next/link';
import ServiceObservationChar from '@/app/assets/images/home/service-observation.png';
import ServiceObservationHoverChar from '@/app/assets/images/home/service-observation-hover.png';

export default function ServiceCard() {
  return (
    <Link href="/observations" className="group relative isolate block w-81 pt-[34px]">
      <Image
        src={ServiceObservationChar}
        alt=""
        width={150}
        height={141}
        className="absolute top-0 right-0 z-[5] transition-opacity group-hover:opacity-0"
      />
      <Image
        src={ServiceObservationHoverChar}
        alt=""
        width={130}
        height={145}
        className="absolute top-0 right-2 z-[5] opacity-0 transition-opacity group-hover:z-[15] group-hover:opacity-100"
      />

      <div className="relative flex h-[199px] w-81 flex-col">
        {/* 상단: 71px, pink-50 — 캐릭터 위로 올라옴 */}
        <div className="flex h-[71px] shrink-0 items-end rounded-tl-2xl rounded-tr-2xl bg-pink-50">
          <div className="inline-flex w-fit items-center rounded-tl-[8px] rounded-tr-[30px] bg-pink-700 py-1 pr-6.5 pl-5 text-xs font-semibold text-white">
            AI 관찰일지
          </div>
        </div>

        {/* 하단: z-10으로 캐릭터 하단을 가림 */}
        <div
          className="relative z-10 flex flex-1 flex-col justify-between rounded-br-2xl rounded-bl-2xl p-5"
          style={{ background: '#FBC9CDE5', backdropFilter: 'blur(4px)' }}
        >
          <p className="typo-line-m2 text-xl font-semibold text-pink-700">
            한줄만 적어도
            <br />
            전문 관찰일지 완성
          </p>
          <div className="flex items-center justify-end gap-2">
            <span className="text-sm font-medium text-black-700">바로가기</span>
            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-sm bg-pink-700 text-xs font-bold text-white">
              ›
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
