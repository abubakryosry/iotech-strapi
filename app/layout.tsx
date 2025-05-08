import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/app/[locale]/components/navbar/Navbar";
import Footer from "@/app/[locale]/components/Footer";


export const metadata: Metadata = {
  title: "IO Tech Task",
  description: "Frontend Task",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        <Navbar locale={"locale"}/>
        {children}
        <Footer locale={"locale"}/>
      </body>
    </html>
  );
}
