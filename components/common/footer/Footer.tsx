import Link from 'next/link';
import { MainLogoIcon } from '@/app/assets/icons';

export default function Footer() {
  return (
    <footer className="bg-black-200 px-4 py-6 md:px-9 md:py-15 xl:px-20">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-center gap-0.5 md:flex-row md:items-center md:gap-10">
          <MainLogoIcon className="h-12 w-12 md:h-25 md:w-25" aria-hidden="true" />
          <div className="flex flex-col items-center gap-3.5 md:items-start md:gap-1">
            <span className="text-[15px] font-semibold text-black-700 md:text-[20px]">MOASSAM</span>
            <div className="flex flex-col items-center">
              <span className="font-semibold text-black-600">
                <span className="hidden text-base md:inline">
                  문의하기 | moassam.official@gmail.com
                </span>
                <span className="text-xs md:hidden">문의하기</span>
              </span>
              <span className="text-sm text-black-700 md:hidden">moassam.official@gmail.com</span>
            </div>
            <span className="text-[11px] text-black-500 md:text-base md:text-black-600">
              © 2026 모아쌤 All rights reserved.
            </span>
          </div>
        </div>
        <div className="w-full border-t border-black-300" />
        <div className="flex items-center justify-center gap-3 text-[13px] md:justify-start md:gap-4 md:text-sm">
          <Link href="/privacy" className="text-black-700 hover:underline">
            개인정보처리방침
          </Link>
          <span className="text-black-400 md:hidden">·</span>
          <Link href="/terms" className="text-black-600 hover:underline">
            이용약관
          </Link>
        </div>
      </div>
    </footer>
  );
}
