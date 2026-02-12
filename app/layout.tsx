import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GameX Portal",
  description:
    "Official portal for GameX featuring games, capabilities, and team opportunities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground antialiased">{children}</body>
    </html>
  );
}
