import type { Metadata } from "next";
import "./scss/globals.scss";
import Header from "@/src/components/default/header/Header";

export const metadata: Metadata = {
  title: "tripusers.com",
  description: "Generated by create next app",
  viewport: {
    width: "device-width",
    initialScale: 1,
    minimumScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
