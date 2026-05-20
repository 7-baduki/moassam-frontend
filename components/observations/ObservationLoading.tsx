import Image from 'next/image';
import observationMascot from '@/app/assets/images/observation-mascot.png';
import Spinner from '@/components/common/spinner/Spinner';

export default function ObservationLoading() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-5 bg-black-100">
      <Image
        src={observationMascot}
        alt="관찰일지 로딩 캐릭터"
        width={206}
        height={227}
        className="h-auto w-32 md:w-51.5"
      />
      <div className="flex flex-col items-center gap-0.5 text-center text-black">
        <p className="text-base font-semibold md:text-xl">관찰일지를 준비하고 있어요</p>
        <p className="text-xs font-medium md:text-sm">
          영유아의 성향과 키워드를 바탕으로 내용을 정리하는 중이에요
        </p>
      </div>
      <Spinner />
    </div>
  );
}
