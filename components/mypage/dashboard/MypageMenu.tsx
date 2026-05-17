import Link from 'next/link';
import { ChevronDownIcon } from '@/app/assets/icons';

const MENU_ITEMS = [
  { label: '내 관찰일지 내역', href: '/mypage/observations' },
  { label: '게시글', href: '/mypage/posts' },
  { label: '댓글', href: '/mypage/comments' },
  { label: '북마크', href: '/mypage/bookmarks' },
];

export default function MypageMenu() {
  return (
    <div className="mt-7.5 mb-12 xl:hidden">
      <p className="mb-3 pl-3.75 text-base font-semibold text-black">보관함</p>
      <ul className="flex flex-col bg-white">
        {MENU_ITEMS.map((item) => (
          <li key={item.href} className="px-4 py-4.5">
            <Link
              href={item.href}
              className="flex items-center justify-between text-sm font-medium text-black-800"
            >
              {item.label}
              <ChevronDownIcon className="h-4 w-4 -rotate-90 text-black-600" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
