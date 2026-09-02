import {
  HIDDEN_SIDEBAR_CONFIG,
  SIDEBAR_ROUTE_CONFIGS,
  type SidebarConfig,
} from '@/constants/common/sidebar-config';

export function getSidebarConfig(pathname: string): SidebarConfig {
  const matchedConfig = SIDEBAR_ROUTE_CONFIGS.find(
    (config) => pathname === config.prefix || pathname.startsWith(`${config.prefix}/`),
  );

  return matchedConfig ?? HIDDEN_SIDEBAR_CONFIG;
}
