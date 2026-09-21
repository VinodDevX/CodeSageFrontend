import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "@/app/redux/provider";

export const metadata: Metadata = {
  title: "CodeSage AI",
  description: "AI Powered Code Review",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
