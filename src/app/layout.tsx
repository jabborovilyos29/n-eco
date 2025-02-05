import "./globals.css";
import { ReactNode } from "react";
import Head from "next/head";
import Header from "../components/Header";
import StoreProvider from "./StoreProvider";

export const metadata = {
  title: "E-commerce Product Listing",
  description: "Browse our product catalog",
  keywords: "ecommerce, products, shop",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
      </Head>
      <body>
        <StoreProvider>
          <Header />
          <div className="pt-20">{children}</div>
        </StoreProvider>
      </body>
    </html>
  );
}
