import type { Metadata } from "next";
import "./globals.css";
import TopNav from "@/components/TopNav";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: {
    template: "%s / Farcaster Docs",
    default: "Farcaster Docs",
  },
  description:
    "A protocol for building sufficiently decentralized social networks.",
  icons: [{ rel: "icon", url: "/icon.png" }],
  openGraph: {
    type: "website",
    images: ["/og-image.png"],
    url: "https://docs.farcaster.xyz",
    description:
      "A protocol for building sufficiently decentralized social networks.",
  },
  twitter: {
    site: "@farcaster_xyz",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-DF7PJS3WBD"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-DF7PJS3WBD');`,
          }}
        />
      </head>
      <body>
        <TopNav />
        <div className="app-shell">
          <Sidebar />
          {children}
        </div>
      </body>
    </html>
  );
}
