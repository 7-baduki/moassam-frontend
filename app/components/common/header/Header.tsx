import Link from 'next/link';
import HeaderLogo from '@/app/assets/icons/headerLogo.svg';

interface HeaderProps {
  isLoggedIn?: boolean;
}

export default function Header({ isLoggedIn = false }: HeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between px-20">
      <div className="flex items-center gap-8.5">
        <Link href="/">
          <HeaderLogo />
        </Link>
        <nav className="flex items-center gap-8.5 text-base leading-[140%] font-medium tracking-[-0.02em]">
          <Link href="/ai" className="font-semibold text-pink-500">
            AI 일지 생성
          </Link>
          <Link href="/community">커뮤니티</Link>
          <Link href="/my-class">내 수업</Link>
        </nav>
      </div>
      <div className="flex items-center gap-6">
        {isLoggedIn ? (
          <>{/* 로그인 아이콘 추가 예정 */}</>
        ) : (
          <button className="rounded border border-pink-500 px-3.5 py-1.5 text-sm text-pink-500">
            간편로그인
          </button> // 공통 컴포넌트가 생성되면 수정 할 예정
        )}
      </div>
    </header>
  );
}
