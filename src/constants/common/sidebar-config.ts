export interface SidebarTabItem {
  label: string;
  href?: string;
  children?: SidebarChildTabItem[];
}

export interface SidebarChildTabItem {
  label: string;
  href: string;
}

export interface SidebarSection {
  ariaLabel: string;
  tabs: SidebarTabItem[];
}

export interface SidebarConfig {
  visible: boolean;
  sections: SidebarSection[];
}

export interface SidebarRouteConfig extends SidebarConfig {
  prefix: string;
}

const COMMUNITY_TABS: SidebarTabItem[] = [
  { label: '모아방', href: '/community/moabang' },
  { label: '자유게시판', href: '/community/board' },
];

const MY_PAGE_TABS: SidebarTabItem[] = [
  { label: '대시보드', href: '/mypage/dashboard' },
  { label: '관찰일지 내역', href: '/mypage/observations' },
  {
    label: '내 활동',
    children: [
      { label: '게시글', href: '/mypage/posts' },
      { label: '댓글', href: '/mypage/comments' },
    ],
  },
  { label: '북마크', href: '/mypage/bookmarks' },
];

export const SIDEBAR_ROUTE_CONFIGS: SidebarRouteConfig[] = [
  {
    prefix: '/community',
    visible: true,
    sections: [
      {
        ariaLabel: '커뮤니티 목록',
        tabs: COMMUNITY_TABS,
      },
    ],
  },
  {
    prefix: '/mypage',
    visible: true,
    sections: [
      {
        ariaLabel: '마이페이지 목록',
        tabs: MY_PAGE_TABS,
      },
    ],
  },
];

export const HIDDEN_SIDEBAR_CONFIG: SidebarConfig = {
  visible: false,
  sections: [],
};
