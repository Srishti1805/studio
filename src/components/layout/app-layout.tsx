import type React from 'react';
import { TopNavBar } from './top-nav-bar';

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <TopNavBar />
      {/* The main content needs padding-top to account for the fixed/sticky TopNavBar height (h-16 = 4rem = 64px) */}
      <main className="flex-1 pt-16">
        <div className="p-4 sm:p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
