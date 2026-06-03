import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Controle Financeiro',
  description: 'App de controle financeiro pessoal com importação JSON',
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    title: 'Finanças',
    statusBarStyle: 'black-translucent',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <meta name="theme-color" content="#10b981" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
