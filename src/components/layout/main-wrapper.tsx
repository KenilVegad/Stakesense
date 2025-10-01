'use client';

import { usePathname } from 'next/navigation';

export default function MainWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/';

  return (
    <main className={isLoginPage ? '' : 'pt-28'}>
      {children}
    </main>
  );
}
