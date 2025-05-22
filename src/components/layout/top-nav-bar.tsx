
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CodeXml } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/#experience', label: 'Work' }, // Link to section on homepage
  { href: '/#projects', label: 'Projects' }, // Link to section on homepage
  { href: '/overview', label: 'Resume' }, // Stays as a separate page
  { href: '/contact', label: 'Contact' }, // Stays as a separate page
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
            if (item.href.startsWith('/#')) {
                 isActive = item.href === '/' && pathname === '/'; // Should not be active if just a hash link on root
            } else {
                isActive = pathname === item.href;
            }
            
            if (item.href === '/') {
                isActive = pathname === '/';
            }


            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium transition-colors duration-150 ease-in-out rounded-md",
                  "hover:text-primary hover:bg-accent/50",
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
