import {
  LayoutDashboard,
  ArrowLeftRight,
  Tags,
  Wallet,
  ChartNoAxesCombined,
  Settings,
  CircleHelp,
} from "lucide-react";

export const navigationItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Transactions",
    href: "/transactions",
    icon: ArrowLeftRight,
  },
  {
    title: "Categories",
    href: "/categories",
    icon: Tags,
  },
  {
    title: "Budgets",
    href: "/budgets",
    icon: Wallet,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: ChartNoAxesCombined,
  },
];

export const secondaryNavigation = [
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
  {
    title: "Help & Support",
    href: "/help",
    icon: CircleHelp,
  },
];