import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import "./globals.css";
import { StyledRoot } from "@/utils/StyledRoot";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Product Listing",
  description: "Product Listing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppRouterCacheProvider>
          <StyledRoot>
            {children}
          </StyledRoot>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
