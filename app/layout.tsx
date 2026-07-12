import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "EduTrio – Modern School ERP System",
  description:
    "EduTrio is a comprehensive school ERP platform that streamlines student management, academics, finance, communication, and more — all in one place.",
  keywords: [
    "school ERP",
    "student management",
    "academic management",
    "school software",
    "education platform",
  ],
  authors: [{ name: "EduTrio" }],
  openGraph: {
    title: "EduTrio – Modern School ERP System",
    description:
      "Streamline your school operations with EduTrio's all-in-one ERP platform.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
