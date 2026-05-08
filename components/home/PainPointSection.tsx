import Image from 'next/image';
import Badge from '@/components/common/badge/Badge';
import { PainPoint } from '@/app/assets/images';

export default function PainPointSection() {
  return (
    <section className="w-full bg-black-100 py-25">
      <div className="mx-auto flex w-full max-w-[1172px] items-start gap-26">
        <div className="shrink-0">
          <Badge label="숨은고충" variant="pink-light" />
          <p className="typo-line-m2 mt-4 text-2xl font-semibold text-black-800">
            이런 순간,
            <br />
            자주 있지 않나요?
          </p>
        </div>
        <div className="min-w-0 flex-1">
          <Image src={PainPoint} alt="페인포인트 예시" className="w-full" />
        </div>
      </div>
    </section>
  );
}
