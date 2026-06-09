import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "BountyMatch",
  description: "Every bounty on the internet. Ranked for you.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`bg-[#0a0a0a] text-white min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
