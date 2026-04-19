"use client";

import { Command } from "cmdk";
import { useEffect, useState } from "react";
import {
  Github,
  Instagram,
  Mail,
  MessageCircle,
  User,
  Folder,
  Compass,
  Rocket,
  Hammer,
  ExternalLink,
  Command as CommandIcon,
} from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { profile } from "@/content";

type Action = {
  id: string;
  label: string;
  hint?: string;
  icon: React.ReactNode;
  onSelect: () => void;
};

export function CommandPaletteTrigger() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (hash: string) => () => {
    setOpen(false);
    requestAnimationFrame(() => {
      const el = document.getElementById(hash.replace("#", ""));
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", hash);
    });
  };

  const openUrl = (href: string) => () => {
    setOpen(false);
    window.open(href, "_blank", "noopener,noreferrer");
  };

  const mailTo = () => {
    setOpen(false);
    window.location.href = `mailto:${profile.email}`;
  };

  const navActions: Action[] = [
    { id: "about", label: "About", icon: <User className="size-4" />, onSelect: go("#about") },
    { id: "projects", label: "Projects", icon: <Folder className="size-4" />, onSelect: go("#projects") },
    { id: "journey", label: "Journey", icon: <Compass className="size-4" />, onSelect: go("#journey") },
    { id: "skills", label: "Skills", icon: <Hammer className="size-4" />, onSelect: go("#skills") },
    { id: "contact", label: "Contact", icon: <Mail className="size-4" />, onSelect: go("#contact") },
  ];

  const socialActions: Action[] = [
    {
      id: "github",
      label: "GitHub",
      hint: `@${profile.socials.github.handle}`,
      icon: <Github className="size-4" />,
      onSelect: openUrl(profile.socials.github.url!),
    },
    {
      id: "instagram",
      label: "Instagram",
      hint: `@${profile.socials.instagram.handle}`,
      icon: <Instagram className="size-4" />,
      onSelect: openUrl(profile.socials.instagram.url!),
    },
    {
      id: "discord",
      label: "Discord",
      hint: `@${profile.socials.discord.handle}`,
      icon: <MessageCircle className="size-4" />,
      onSelect: () => {},
    },
    {
      id: "email",
      label: "Email",
      hint: profile.email,
      icon: <Mail className="size-4" />,
      onSelect: mailTo,
    },
  ];

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 h-9 rounded-md border border-border bg-surface px-2.5 text-xs text-fg-muted hover:text-fg hover:bg-surface-2 transition-colors"
        aria-label="Open command palette"
      >
        <CommandIcon className="size-3.5" />
        <span className="hidden sm:inline">Command</span>
        <kbd className="hidden sm:inline-flex items-center rounded border border-border bg-bg px-1.5 py-0.5 font-mono text-[10px] leading-none">
          ⌘ K
        </kbd>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-xl p-0 overflow-hidden top-[18%]" hideClose>
          <DialogTitle className="sr-only">Command palette</DialogTitle>
          <Command label="Command palette" className="bg-surface">
            <div className="border-b border-border px-3">
              <Command.Input
                placeholder="Type a command or search…"
                className="h-12 w-full bg-transparent text-sm text-fg placeholder:text-fg-subtle outline-none"
              />
            </div>
            <Command.List className="max-h-[360px] overflow-y-auto p-2">
              <Command.Empty className="py-8 text-center text-sm text-fg-muted">
                No matches.
              </Command.Empty>

              <Command.Group heading="Navigate" className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-fg-subtle">
                {navActions.map((a) => (
                  <PaletteItem key={a.id} action={a} />
                ))}
              </Command.Group>

              <Command.Group heading="Reach out" className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:mt-2 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-fg-subtle">
                {socialActions.map((a) => (
                  <PaletteItem key={a.id} action={a} trailing={<ExternalLink className="size-3.5" />} />
                ))}
              </Command.Group>
            </Command.List>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  );
}

function PaletteItem({ action, trailing }: { action: Action; trailing?: React.ReactNode }) {
  return (
    <Command.Item
      value={action.label}
      onSelect={action.onSelect}
      className="flex items-center gap-3 rounded-md px-2 py-2 text-sm text-fg aria-selected:bg-surface-2 aria-selected:text-fg cursor-pointer"
    >
      <span className="text-fg-muted">{action.icon}</span>
      <span className="flex-1">{action.label}</span>
      {action.hint && <span className="text-xs text-fg-subtle font-mono">{action.hint}</span>}
      {trailing && <span className="text-fg-subtle">{trailing}</span>}
    </Command.Item>
  );
}
