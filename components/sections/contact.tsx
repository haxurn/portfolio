import Link from "next/link";
import { Github, Instagram, Mail, MessageCircle, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeader } from "./section-header";
import { ContactForm } from "./contact-form";
import { profile } from "@/content";

export function Contact() {
  const socials = [
    { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { icon: Github, label: "GitHub", value: `@${profile.socials.github.handle}`, href: profile.socials.github.url },
    { icon: Instagram, label: "Instagram", value: `@${profile.socials.instagram.handle}`, href: profile.socials.instagram.url },
    { icon: MessageCircle, label: "Discord", value: `@${profile.socials.discord.handle}`, href: undefined },
  ] as const;

  return (
    <section id="contact" className="py-24 md:py-32">
      <Reveal>
        <SectionHeader
          number="07"
          label="Contact"
          title="Say hi. I read everything."
          sub="Fastest way is email — I usually reply within 24–48 hours. GitHub and Instagram are open too."
        />
      </Reveal>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <Reveal>
          <ul className="space-y-3">
            {socials.map((s) => (
              <li key={s.label}>
                {s.href ? (
                  <Link
                    href={s.href}
                    target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={s.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                    className="group flex items-center gap-3 rounded-md border border-border bg-surface px-4 py-3 transition-colors hover:border-fg-subtle"
                  >
                    <s.icon className="size-4 text-fg-muted" />
                    <span className="flex-1">
                      <span className="block font-mono text-[10px] uppercase tracking-wider text-fg-subtle">
                        {s.label}
                      </span>
                      <span className="block text-sm text-fg">{s.value}</span>
                    </span>
                    <ArrowUpRight className="size-4 text-fg-subtle transition-colors group-hover:text-accent" />
                  </Link>
                ) : (
                  <div className="flex items-center gap-3 rounded-md border border-border bg-surface px-4 py-3">
                    <s.icon className="size-4 text-fg-muted" />
                    <span className="flex-1">
                      <span className="block font-mono text-[10px] uppercase tracking-wider text-fg-subtle">
                        {s.label}
                      </span>
                      <span className="block text-sm text-fg">{s.value}</span>
                    </span>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="rounded-xl border border-border bg-surface p-8 shadow-card">
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
