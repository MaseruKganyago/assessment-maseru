import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { AppProvider } from './app-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Employee Directory',
  description: 'Maseru Assement: Employee Directory App',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const url = process?.env?.BACKEND_URL || 'https://localhost:44362';

  return (
    <html lang="en">
      <body className={inter.className}>
        <AntdRegistry>
          <AppProvider baseUrl={url}>{children}</AppProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
