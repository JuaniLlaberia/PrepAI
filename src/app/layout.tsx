import NextTopLoader from 'nextjs-toploader';
import { Roboto } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import type { Metadata } from 'next';

import './globals.css';
import ReactQueryProvider from '@/components/ReactQueryProvider';
import { Toaster } from '@/components/ui/sonner';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'MockAI',
  description: '',
  icons: {
    icon: [],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={roboto.className}>
        <NextTopLoader />
        <Toaster richColors />
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
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
