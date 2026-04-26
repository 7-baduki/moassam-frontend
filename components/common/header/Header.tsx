import Link from 'next/link';
import { Button } from '@/components/common/button/Button';
import HeaderLogo from '@/app/assets/icons/HeaderLogo.svg';
import BellOffIcon from '@/app/assets/icons/BellOffIcon.svg';
import ProfileIcon from '@/app/assets/icons/ProfileIcon.svg';

interface HeaderProps {
  isLoggedIn?: boolean;
}

export default function Header({ isLoggedIn = true }: HeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-black-200 px-20">
      <div className="flex items-center gap-8.5">
        <Link href="/" aria-label="모아쌤 홈으로 이동">
          <HeaderLogo aria-hidden="true" />
        </Link>
        <nav
          aria-label="주요 메뉴"
          className="flex items-center gap-8.5 text-base leading-[140%] font-medium tracking-[-0.02em]"
        >
          <Link href="/ai" className="font-semibold text-pink-500">
            AI 일지 생성
          </Link>
          <Link href="/community">커뮤니티</Link>
          <Link href="/my-class">내 수업</Link>
        </nav>
      </div>
      <div className="flex items-center gap-5">
        {isLoggedIn ? (
          <>
            <BellOffIcon className="cursor-pointer" />
            <ProfileIcon className="cursor-pointer" />
          </>
        ) : (
          <Button variant="outline" size="sm">
            로그인
          </Button>
        )}
      </div>
    </header>
  );
}
