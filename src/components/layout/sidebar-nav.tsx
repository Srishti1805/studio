
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { Home, Briefcase, FileText, Mail } from 'lucide-react'; // Removed Sparkles

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/overview', label: 'Resume', icon: FileText },
  { href: '/portfolio', label: 'Projects', icon: Briefcase },
  // { href: '/cover-letter', label: 'AI Tools', icon: Sparkles }, // Removed AI Tools
  { href: '/contact', label: 'Contact', icon: Mail },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        return (
          <SidebarMenuItem key={item.href}>
            <Link href={item.href} passHref legacyBehavior>
              <SidebarMenuButton
                asChild
                isActive={isActive}
                className={cn(
                  'justify-start text-sidebar-foreground/80 hover:text-sidebar-accent-foreground',
                  isActive && 'bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90'
                )}
                tooltip={item.label}
              >
                <a>
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </a>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
