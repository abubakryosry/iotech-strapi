import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/app/[locale]/components/navbar/Navbar";
import Footer from "@/app/[locale]/components/Footer";
import ReduxProvider from "@/app/redux/provider";

export const metadata: Metadata = {
  title: "IO Tech Task",
  description: "Frontend Task",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <Navbar/>
          {children}
          <Footer/>
        </ReduxProvider>
      </body>
    </html>
  );
}
