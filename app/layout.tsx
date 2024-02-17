import type { Metadata } from 'next';
import { DotGothic16 } from 'next/font/google';
import './globals.css';

const dots = DotGothic16({
  weight: '400',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Shiny Pokédex',
  description: 'Authered by 10-ui',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={dots.className}>{children}</body>
    </html>
  );
}
