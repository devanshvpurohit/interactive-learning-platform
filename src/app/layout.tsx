import type { Metadata } from "next";
import "./globals.css";
import AppLayout from "@/components/layout/AppLayout";

export const metadata: Metadata = {
  title: "AI-Powered Interactive Learning & Exam Preparation Platform",
  description: "Comprehensive university learning platform for Language Modelling and Ethical Hacking & Cyber Defence with interactive flowcharts, 3D visualizations, and Gemini AI study tutor.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-[#090d16] text-slate-100">
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
