import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { CircleCheckIcon, Github, InfoIcon, Loader2Icon, OctagonXIcon, TriangleAlertIcon } from "lucide-react";
import Providers from "./providers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { Analytics } from "@vercel/analytics/next"
import Link from "next/link";

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


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getSession();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Analytics />
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
        <Link href={"https://github.com/camelia96/book_tracker"} className="flex items-center justify-center py-4 bg-primary-foreground transition duration-150 hover:text-gray-500">
        <Github strokeWidth={1} size={22} className=""/> <span className="text-[1em]">GitHub Repository</span> 
        </Link>
      </body>
    </html>
  );
}
