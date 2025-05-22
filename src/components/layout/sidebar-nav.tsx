"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { UserCircle, Briefcase, FileText, Mail } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Overview', icon: UserCircle },
  { href: '/portfolio', label: 'Portfolio', icon: Briefcase },
  { href: '/cover-letter', label: 'Cover Letter Gen', icon: FileText },
  { href: '/contact', label: 'Contact Me', icon: Mail },
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
                  'justify-start',
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
