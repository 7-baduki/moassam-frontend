export interface SidebarTabItem {
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

interface SidebarRouteConfig extends SidebarConfig {
  prefix: string;
}

const COMMUNITY_TABS: SidebarTabItem[] = [
  { label: '모아방', href: '/community/moabang' },
  { label: '자유게시판', href: '/community/board' },
];

const MY_PAGE_TABS: SidebarTabItem[] = [
  { label: '대시보드', href: '/my/dashboard' },
  { label: '관찰일지 내역', href: '/my/observations' },
  { label: '내 활동', href: '/my/activity' },
  { label: '북마크', href: '/my/bookmarks' },
];

const SIDEBAR_ROUTE_CONFIGS: SidebarRouteConfig[] = [
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
    prefix: '/my',
    visible: true,
    sections: [
      {
        ariaLabel: '마이페이지 목록',
        tabs: MY_PAGE_TABS,
      },
    ],
  },
];

const HIDDEN_SIDEBAR_CONFIG: SidebarConfig = {
  visible: false,
  sections: [],
};

export function getSidebarConfig(pathname: string): SidebarConfig {
  const matchedConfig = SIDEBAR_ROUTE_CONFIGS.find(
    (config) => pathname === config.prefix || pathname.startsWith(`${config.prefix}/`),
  );

  return matchedConfig ?? HIDDEN_SIDEBAR_CONFIG;
}
