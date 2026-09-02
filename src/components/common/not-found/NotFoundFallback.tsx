import Image from 'next/image';
import Link from 'next/link';
import ErrorMascot from '@/app/assets/images/error-mascot.png';

interface NotFoundFallbackProps {
  description?: string;
  href?: string;
  actionLabel?: string;
}

export default function NotFoundFallback({
  description = '요청하신 페이지가 존재하지 않아요',
  href = '/',
  actionLabel = '홈으로 이동',
}: NotFoundFallbackProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4.5">
      <Image
        src={ErrorMascot}
        alt="에러 마스코트"
        width={280}
        height={309}
        className="h-auto w-36 md:w-70"
      />
      <div className="flex w-52.5 flex-col items-center gap-4.5">
        <div className="flex flex-col items-center gap-2 px-2 text-center">
          <p className="text-base font-semibold text-black md:text-xl">페이지를 찾을 수 없어요</p>
          <p className="text-xs text-black-500 md:text-sm">{description}</p>
        </div>
        <Link
          href={href}
          className="flex h-11 w-full items-center justify-center rounded-lg bg-green-500 text-sm font-semibold text-white hover:bg-green-700"
        >
          {actionLabel}
        </Link>
      </div>
    </div>
  );
}
