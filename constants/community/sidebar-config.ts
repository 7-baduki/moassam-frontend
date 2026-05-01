export interface SidebarTabItem {
  label: string;
  href: string;
}

export interface SidebarSection {
  ariaLabel: string;
  tabs: SidebarTabItem[];
  className: string;
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

const SIDEBAR_ROUTE_CONFIGS: SidebarRouteConfig[] = [
  {
    prefix: '/community',
    visible: true,
    sections: [
      {
        ariaLabel: '메인 메뉴',
        tabs: COMMUNITY_TABS,
        className: 'mt-15 ml-20',
      },
    ],
  },
  {
    prefix: '/my',
    visible: false,
    sections: [],
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
