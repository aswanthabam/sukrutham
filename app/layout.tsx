import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/layout/navbar";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Sukrutha - Transforming Kerala",
  description:
    "Join us in our mission to transform Kerala through community-driven initiatives and sustainable development",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="lg:h-full">
      <body className={`${poppins.variable} ${poppins.variable} antialiased`}>
        <Toaster position="top-right" />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
