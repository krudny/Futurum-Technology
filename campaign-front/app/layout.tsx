"use client";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { CampaignProvider } from "@/app/utils/ApplicationContext";
import { DialogProvider } from "@/app/utils/DialogContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="hashtag.ico" />
        <title>Campaign Manager - Futurum Technology</title>
      </head>
      <body className={`antialiased`}>
        <DialogProvider>
          <CampaignProvider>
            <Toaster position="top-center" reverseOrder={false} />
            {children}
          </CampaignProvider>
        </DialogProvider>
      </body>
    </html>
  );
}
