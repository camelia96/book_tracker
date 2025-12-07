import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { CircleCheckIcon, InfoIcon, Loader2Icon, OctagonXIcon, TriangleAlertIcon } from "lucide-react";
import Providers from "./providers";
import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

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

/**
 * Helper function to get the session on the server without having to import the authOptions object every single time
 * @returns The session object or null
 */
const getSession = () => getServerSession(authOptions);

const session = await getSession();

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
        <Providers session={session}>
          {children}
        </Providers>
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
