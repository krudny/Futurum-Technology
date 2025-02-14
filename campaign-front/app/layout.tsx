"use client";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { CampaignProvider } from "@/app/utils/ApplicationContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <CampaignProvider>
          <Toaster position="top-center" reverseOrder={false} />
          {children}
        </CampaignProvider>
      </body>
    </html>
  );
}
