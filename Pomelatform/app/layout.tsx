import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';

const inter = Inter({ subsets: ['latin'] });

import { getUser, getUserRole } from '@/lib/auth-service';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Pomelatform Studio',
  description: 'Collaborative Software Development Dashboard',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  // If no user, middleware should catch this, but safe optional chaining

  // Note: For layout, we don't necessarily want to block rendering if user is missing 
  // (e.g. login page uses this layout too? NO, login page usually has its own layout or excluded)
  // But root layout wraps everything.
  // Wait, if Login page is inside app/login, it inherits RootLayout.
  // This means Sidebar will show on Login page if we aren't careful.
  // We should probably check if user exists before showing Sidebar, or use Route Groups for dashboard layout.

  const role = user ? await getUserRole(user.id) : null;
  const isAuth = !!user;

  return (
    <html lang="en">
      <body className={`${inter.className} flex h-screen overflow-hidden bg-background text-foreground`}>
        {isAuth && <Sidebar user={user} role={role} />}
        <div className="flex-1 flex flex-col overflow-hidden">
          {isAuth && <Header />}
          <main className={`flex-1 overflow-y-auto p-6 bg-secondary/20 ${!isAuth ? 'p-0 bg-transparent flex items-center justify-center' : ''}`}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
