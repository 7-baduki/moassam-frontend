import Link from 'next/link';
import HeaderLogo from '@/app/assets/icons/headerLogo.svg';

interface HeaderProps {
  isLoggedIn?: boolean;
}

export default function Header({ isLoggedIn = false }: HeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between px-20">
      <div className="flex items-center gap-[34px]">
        <Link href="/">
          <HeaderLogo />
        </Link>
        <nav className="flex items-center gap-[34px]">
          <Link href="/ai" className="text-pink-500">
            AI 일지 생성
          </Link>
          <Link href="/community">커뮤니티</Link>
          <Link href="/my-class">내 수업</Link>
        </nav>
      </div>
      <div className="flex items-center gap-[24px]">
        {isLoggedIn ? (
          <>{/* 로그인 아이콘 추가 예정 */}</>
        ) : (
          <button className="rounded border border-pink-500 px-[14px] py-[6px] text-sm text-pink-500">
            간편로그인
          </button>
        )}
      </div>
    </header>
  );
}
