import type { Metadata, Viewport } from "next";
import Head from "next/head";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { SiteHeader } from "@/components/site-header";
import { SiteBackground } from "@/components/background";
import { TelemetryChip } from "@/components/telemetry-chip";
import { ShortcutsOverlay } from "@/components/shortcuts-overlay";
import { HiddenCLI } from "@/components/hidden-cli";
import { Konami } from "@/components/konami";
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
          <TelemetryChip />
          <ShortcutsOverlay />
          <HiddenCLI />
          <Konami />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

async function SiteFooter() {
  "use cache";
  const year = new Date().getFullYear();
  const buildTime = new Date().toISOString().slice(0, 16).replace("T", " ");
  const sha = (process.env.VERCEL_GIT_COMMIT_SHA ?? "local-dev").slice(0, 7);

  return (
    <footer className="mt-24 border-t border-border/60">
      <div className="mx-auto w-full max-w-6xl px-4 pt-10 pb-6 sm:px-6 lg:px-8">
        {/* Editorial sign-off */}
        <div className="mb-8 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-fg-subtle">
              sign off · end of file
            </div>
            <div className="mt-3 font-display text-4xl font-semibold tracking-tight text-fg md:text-6xl">
              haxurn<span className="text-accent">.</span>
            </div>
          </div>
          <nav className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.2em] text-fg-muted">
            <a href="#home" className="hover:text-accent transition-colors">home</a>
            <a href="#about" className="hover:text-accent transition-colors">about</a>
            <a href="#projects" className="hover:text-accent transition-colors">projects</a>
            <a href="#journey" className="hover:text-accent transition-colors">journey</a>
            <a href="#contact" className="hover:text-accent transition-colors">contact</a>
          </nav>
        </div>

        {/* Console status bar */}
        <div className="rounded-md border border-border bg-surface-2/40 font-mono text-[10px] uppercase tracking-[0.22em]">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 px-4 py-2.5 text-fg-subtle">
            <span className="flex items-center gap-1.5 text-accent">
              <span className="size-1.5 rounded-full bg-accent animate-pulse" />
              online
            </span>
            <Cell k="build" v={sha} />
            <Cell k="deployed" v={buildTime} />
            <Cell k="region" v="iad1" />
            <Cell k="stack" v="next 16 · tw v4" />
            <Cell k="theme" v="dark · amber-green" />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/60 bg-bg/40 px-4 py-2 text-fg-subtle">
            <span>© {year} {profile.name} — all rights, quietly reserved</span>
            <span className="flex items-center gap-3">
              <a href={profile.socials.github.url} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">gh</a>
              <span className="text-border">·</span>
              <a href={profile.socials.instagram.url} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">ig</a>
              <span className="text-border">·</span>
              <a href={`mailto:${profile.email}`} className="hover:text-accent transition-colors">mail</a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Cell({ k, v }: { k: string; v: string }) {
  return (
    <span className="flex items-baseline gap-1.5">
      <span className="text-fg-subtle/70">{k}</span>
      <span className="text-fg">{v}</span>
    </span>
  );
}
