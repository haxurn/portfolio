import type { Metadata, Viewport } from "next";
import Head from "next/head";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { SiteHeader } from "@/components/site-header";
import { SiteBackground } from "@/components/background";
import { profile } from "@/content";
import "./globals.css";

const siteUrl = "https://haxurn.dev";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0f1a" },
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  other: {
    "theme-color": "#0a0f1a",
  },
  title: {
    default: `${profile.name} (${profile.alias}) — ${profile.role}`,
    template: `%s · ${profile.alias}`,
  },
  description: profile.tagline,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title: `${profile.name} — ${profile.alias}`,
    description: profile.tagline,
    siteName: `${profile.alias} — portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.alias}`,
    description: profile.tagline,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&f[]=syne@500,600,700,800&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen antialiased">
        <ThemeProvider>
          <SiteBackground />

          <a
            href="#home"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-accent focus:px-3 focus:py-2 focus:text-sm focus:text-accent-fg"
          >
            Skip to content
          </a>

          <SiteHeader />

          <main className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            {children}
          </main>

          <SiteFooter />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

async function SiteFooter() {
  "use cache";
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-border/60">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-10 text-xs text-fg-subtle sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="font-mono">
          <span className="text-fg-muted">{profile.alias}</span>
          <span className="text-border"> / </span>
          © {year} {profile.name}
          <span className="text-border"> · </span>
          Next.js 16 · Tailwind v4
        </div>
        <div className="flex items-center gap-4 font-mono">
          <a
            href={profile.socials.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-fg transition-colors"
          >
            github
          </a>
          <a
            href={profile.socials.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-fg transition-colors"
          >
            instagram
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="hover:text-fg transition-colors"
          >
            email
          </a>
        </div>
      </div>
    </footer>
  );
}
