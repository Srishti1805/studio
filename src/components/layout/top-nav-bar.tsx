
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CodeXml } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/#experience', label: 'Work' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#education', label: 'Education' },
  { href: '/overview', label: 'Resume' },
  { href: '/contact', label: 'Contact' },
];

export function TopNavBar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center px-4 sm:px-6 lg:px-8">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <CodeXml className="h-7 w-7 text-primary" />
          <span className="font-bold text-lg text-foreground hidden sm:inline-block">Jane R. Doe</span>
        </Link>
        <nav className="flex flex-1 items-center justify-end space-x-2 sm:space-x-4">
          {navItems.map((item) => {
            let isActive = false;
            if (item.href === '/') {
                // 'Home' tab is active if the current path is exactly '/'
                isActive = pathname === '/';
            } else if (item.href.startsWith('/#')) {
                // Hash links like '/#experience' or '/#projects' are not marked active in the nav bar itself.
                isActive = false; 
            } else {
                // For other page links like '/overview' or '/contact'
                isActive = pathname === item.href;
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium transition-colors duration-150 ease-in-out rounded-md",
                  "hover:text-primary hover:bg-secondary/40",
                  isActive
                    ? "text-primary-foreground bg-primary shadow-md" 
                    : "text-muted-foreground"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
