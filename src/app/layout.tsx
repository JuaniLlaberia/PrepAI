import NextTopLoader from 'nextjs-toploader';
import { ThemeProvider } from 'next-themes';
import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';

import './globals.css';
import ReactQueryProvider from '@/components/ReactQueryProvider';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
  title: 'PrepAI | Master interviews with AI',
  description:
    'Dive into AI fully customizable paths based on your needs to land your next job.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={GeistSans.className}>
        <NextTopLoader color='#8b5cf6' showSpinner={false} />
        <Toaster richColors />
        <ThemeProvider
          attribute='class'
          defaultTheme='light'
          enableSystem
          disableTransitionOnChange
        >
          <main className='h-screen bg-background text-primary'>
            <ReactQueryProvider>{children}</ReactQueryProvider>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
