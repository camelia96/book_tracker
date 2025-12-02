import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { CircleCheckIcon, InfoIcon, Loader2Icon, OctagonXIcon, TriangleAlertIcon } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Book tracker",
  description: "A web app to track your book selection, read or not. Enjoy!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster 
        position="bottom-center"
        duration={5000}
        icons={{
          success: <CircleCheckIcon color="green" className="size-4" />,
          info: <InfoIcon color="gray" className="size-4" />,
          warning: <TriangleAlertIcon color="#e89005" className="size-4" />,
          error: <OctagonXIcon color="red" className="size-4" />,
          loading: <Loader2Icon className="size-4 animate-spin" />,
        }}
      />
      </body>
    </html>
  );
}
