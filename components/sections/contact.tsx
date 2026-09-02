import Link from "next/link";
import { Github, Instagram, Mail, MessageCircle, ArrowUpRight, Radio } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeader } from "./section-header";
import { ContactForm } from "./contact-form";
import { profile } from "@/content";

export function Contact() {
  const socials = [
    {
      icon: Mail,
      callsign: "PRIMARY",
      label: "Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
      latency: "24-48h",
    },
    {
      icon: Github,
      callsign: "GIT",
      label: "GitHub",
      value: `@${profile.socials.github.handle}`,
      href: profile.socials.github.url,
      latency: "code",
    },
    {
      icon: Instagram,
      callsign: "VISUAL",
      label: "Instagram",
      value: `@${profile.socials.instagram.handle}`,
      href: profile.socials.instagram.url,
      latency: "rare",
    },
    {
      icon: MessageCircle,
      callsign: "DIRECT",
      label: "Discord",
      value: `@${profile.socials.discord.handle}`,
      href: undefined,
      latency: "invite",
    },
  ] as const;

  return (
    <section id="contact" className="py-24 md:py-32">
      <Reveal preset="header">
        <SectionHeader
          id="contact"
          title="Get in touch. I read every message."
          sub="Email is the fastest route; I usually reply within 24 to 48 hours. GitHub and Instagram are open as well."
        />
      </Reveal>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-10">
        {/* Telemetry roster */}
        <Reveal>
          <div className="relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-card">
            <div className="flex items-center justify-between border-b border-border/60 bg-surface-2/40 px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.24em] text-fg-subtle">
              <span className="flex items-center gap-2">
                <Radio className="size-3 text-accent" />
                transmission · channels
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-accent animate-pulse" />
                online
              </span>
            </div>

            <ul className="divide-y divide-border/60">
              {socials.map((s) => {
                const content = (
                  <>
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-md border border-border bg-surface-2/60 text-fg-muted transition-colors group-hover:border-accent/40 group-hover:text-accent">
                      <s.icon className="size-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.24em] text-fg-subtle">
                        <span className="rounded-sm border border-accent/30 bg-accent/10 px-1 py-px text-accent">
                          {s.callsign}
                        </span>
                        <span>latency · {s.latency}</span>
                      </div>
                      <div className="mt-1 truncate text-sm text-fg">
                        {s.value}
                      </div>
                    </div>
                    {s.href && (
                      <ArrowUpRight className="size-4 shrink-0 text-fg-subtle transition-colors group-hover:text-accent" />
                    )}
                  </>
                );
                return (
                  <li key={s.label}>
                    {s.href ? (
                      <Link
                        href={s.href}
                        target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                        rel={
                          s.href.startsWith("mailto:")
                            ? undefined
                            : "noopener noreferrer"
                        }
                        className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-surface-2/40"
                      >
                        {content}
                      </Link>
                    ) : (
                      <div className="group flex items-center gap-4 px-5 py-4 opacity-70">
                        {content}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>

            {/* Roster footer */}
            <div className="mt-auto flex items-center justify-between border-t border-border/60 bg-surface-2/30 px-5 py-2 font-mono text-[9px] uppercase tracking-[0.28em] text-fg-subtle">
              <span>◉ roster · 4 nodes</span>
              <span>priority · email</span>
            </div>
          </div>
        </Reveal>

        {/* Console form */}
        <Reveal delay={0.08}>
          <div className="relative overflow-hidden rounded-xl border border-border bg-surface shadow-card">
            {/* Console top bar */}
            <div className="flex items-center justify-between border-b border-border/60 bg-surface-2/40 px-5 py-2.5">
              <div className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-[#ff5f56]" />
                <span className="size-1.5 rounded-full bg-[#ffbd2e]" />
                <span className="size-1.5 rounded-full bg-accent" />
                <span className="ml-3 font-mono text-[10px] uppercase tracking-[0.22em] text-fg-subtle">
                  transmit.exe — compose message
                </span>
              </div>
              <span className="font-mono text-[10px] text-accent/70">● rec</span>
            </div>

            {/* Breadcrumb prompt */}
            <div className="border-b border-border/60 px-5 py-2 font-mono text-[11px] text-fg-subtle">
              <span className="text-accent">▸</span>{" "}
              <span>operator@haxurn:~/inbox$</span>{" "}
              <span className="text-fg">compose --to=haxurn --priority=high</span>
            </div>

            <div className="p-6 md:p-8">
              <ContactForm />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
