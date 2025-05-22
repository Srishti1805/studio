
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CodeXml } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/#about', label: 'About Me' }, // Link to section on homepage
  { href: '/#experience', label: 'Work' }, // Link to section on homepage
  { href: '/#projects', label: 'Projects' }, // Updated to link to section on homepage
  { href: '/overview', label: 'Resume' }, // Stays as a separate page
  { href: '/contact', label: 'Contact' }, // Stays as a separate page
];

export function TopNavBar() {
  const pathname = usePathname();

  // For homepage section links, we'll consider the root path active
  // and rely on browser's scroll highlighting or manual scroll.
  // For distinct pages like /resume or /contact, we check the exact path.

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center px-4 sm:px-6 lg:px-8">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <CodeXml className="h-7 w-7 text-primary" />
          <span className="font-bold text-lg text-foreground hidden sm:inline-block">Jane R. Doe</span>
        </Link>
        <nav className="flex flex-1 items-center justify-end space-x-2 sm:space-x-4">
          {navItems.map((item) => {
            // For section links on the homepage, they are active if the base path is '/'
            // and it's the "Home" link itself, or if it's another page.
            // This simplified logic ensures only one primary page link is "active".
            // Actual section highlighting as you scroll is a separate feature.
            let isActive = false;
            if (item.href.startsWith('/#')) {
                // For hash links, we don't mark them "active" in the nav bar in this simplified version
                // to avoid conflicts with the "Home" link when on the root page.
                // The "Home" link is active if pathname is just "/"
                 isActive = item.href === '/' && pathname === '/';
            } else {
                isActive = pathname === item.href;
            }
            
            // Special case for "Home" link to be active only on exact match
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
