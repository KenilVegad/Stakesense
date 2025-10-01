import type { Metadata } from 'next';
import { PT_Sans } from 'next/font/google'
import { Header } from '@/components/layout/header';
import MainWrapper from '@/components/layout/main-wrapper';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';

export const metadata: Metadata = {
  title: 'Backoffice Portal',
  description: 'Ministry of Corporate Affairs - Secure e-Governance Portal.',
};

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-pt-sans',
  display: 'swap',
  fallback: ['system-ui', 'arial', 'sans-serif'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={ptSans.variable}>
      <body className="font-body antialiased">
        <Header />
        <MainWrapper>
          {children}
        </MainWrapper>
        <Toaster />
      </body>
    </html>
  );
}
