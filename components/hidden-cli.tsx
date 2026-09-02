"use client";

import { useEffect, useRef, useState, useEffectEvent } from "react";
import { profile } from "@/content";

type Line = {
  id: number;
  kind: "prompt" | "out" | "err" | "note";
  text: string;
};

const SECTIONS = [
  "home",
  "about",
  "projects",
  "craft",
  "journey",
  "credentials",
  "skills",
  "github",
  "contact",
] as const;

const BANNER = [
  "haxurn.cli · v0.1 · interactive shell",
  "type `help` to list commands · `exit` to close",
];

export function HiddenCLI() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<Line[]>([]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState<number>(-1);
  const counter = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const bufferRef = useRef<HTMLDivElement>(null);

  const push = (line: Omit<Line, "id">) => {
    counter.current += 1;
    setHistory((h) => [...h, { id: counter.current, ...line }]);
  };

  const openShell = () => {
    setOpen(true);
    if (history.length === 0) {
      BANNER.forEach((t) => push({ kind: "note", text: t }));
    }
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const onOpenShortcut = useEffectEvent(() => openShell());

  useEffect(() => {
    const isEditable = (t: EventTarget | null) => {
      if (!(t instanceof HTMLElement)) return false;
      const tag = t.tagName.toLowerCase();
      return tag === "input" || tag === "textarea" || t.isContentEditable;
    };

    const onKey = (e: KeyboardEvent) => {
      if (isEditable(e.target)) return;
      if (e.key === "/" && !open) {
        e.preventDefault();
        onOpenShortcut();
      } else if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (bufferRef.current) {
      bufferRef.current.scrollTop = bufferRef.current.scrollHeight;
    }
  }, [history]);

  const runCommand = (raw: string) => {
    const line = raw.trim();
    push({ kind: "prompt", text: line });
    if (line.length === 0) return;

    setCmdHistory((h) => [...h, line]);
    setCursor(-1);

    const [cmd, ...rest] = line.split(/\s+/);
    const arg = rest.join(" ");

    switch (cmd) {
      case "help": {
        push({ kind: "out", text: "commands:" });
        push({ kind: "out", text: "  help              show this list" });
        push({ kind: "out", text: "  whoami            print identity" });
        push({ kind: "out", text: "  ls                list sections" });
        push({ kind: "out", text: "  cd <section>      jump to section" });
        push({ kind: "out", text: "  open <target>     github · ig · email · discord" });
        push({ kind: "out", text: "  sudo <anything>   permission denied (always)" });
        push({ kind: "out", text: "  clear             clear buffer" });
        push({ kind: "out", text: "  exit              close shell" });
        break;
      }
      case "whoami": {
        push({ kind: "out", text: `${profile.name} — aka ${profile.alias}` });
        push({ kind: "out", text: `role : ${profile.role}` });
        push({ kind: "out", text: `base : ${profile.location}` });
        push({ kind: "out", text: `focus: ${profile.focus}` });
        break;
      }
      case "ls": {
        push({
          kind: "out",
          text: SECTIONS.map((s) => s.padEnd(12)).join(""),
        });
        break;
      }
      case "cd": {
        if (!arg) {
          push({ kind: "err", text: "cd: missing section name" });
          break;
        }
        const target = SECTIONS.find((s) => s === arg.toLowerCase());
        if (!target) {
          push({ kind: "err", text: `cd: no such section '${arg}'` });
          break;
        }
        const el = document.getElementById(target);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          history.length && push({ kind: "out", text: `▸ navigating to §${target}` });
          history.length && window.setTimeout(() => setOpen(false), 450);
        }
        break;
      }
      case "open": {
        const target = arg.toLowerCase();
        const map: Record<string, () => void> = {
          github: () => window.open(profile.socials.github.url, "_blank", "noopener,noreferrer"),
          gh: () => window.open(profile.socials.github.url, "_blank", "noopener,noreferrer"),
          instagram: () => window.open(profile.socials.instagram.url, "_blank", "noopener,noreferrer"),
          ig: () => window.open(profile.socials.instagram.url, "_blank", "noopener,noreferrer"),
          email: () => { window.location.href = `mailto:${profile.email}`; },
          mail: () => { window.location.href = `mailto:${profile.email}`; },
          discord: () => push({ kind: "out", text: `dm @${profile.socials.discord.handle}` }),
        };
        const fn = map[target];
        if (!fn) {
          push({ kind: "err", text: `open: unknown target '${arg || "∅"}'` });
          break;
        }
        push({ kind: "out", text: `▸ opening ${target}…` });
        fn();
        break;
      }
      case "sudo": {
        push({
          kind: "err",
          text: `haxurn is not in the sudoers file. this incident will be reported.`,
        });
        break;
      }
      case "clear": {
        setHistory([]);
        break;
      }
      case "exit":
      case "quit": {
        setOpen(false);
        break;
      }
      case "echo": {
        push({ kind: "out", text: arg });
        break;
      }
      default: {
        push({ kind: "err", text: `zsh: command not found: ${cmd}` });
      }
    }
  };

  const onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      runCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      if (cmdHistory.length === 0) return;
      e.preventDefault();
      const next = cursor === -1 ? cmdHistory.length - 1 : Math.max(0, cursor - 1);
      setCursor(next);
      setInput(cmdHistory[next]);
    } else if (e.key === "ArrowDown") {
      if (cursor === -1) return;
      e.preventDefault();
      const next = cursor + 1;
      if (next >= cmdHistory.length) {
        setCursor(-1);
        setInput("");
      } else {
        setCursor(next);
        setInput(cmdHistory[next]);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Hidden command shell"
      className="fixed inset-x-0 bottom-0 z-50 animate-[cli-up_0.2s_ease-out] px-4 pb-4"
    >
      <div className="mx-auto max-w-3xl overflow-hidden rounded-t-xl border border-b-0 border-border bg-surface shadow-card">
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-border/60 bg-surface-2/60 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-fg-subtle">
          <span className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-[#ff5f56]" />
            <span className="size-1.5 rounded-full bg-[#ffbd2e]" />
            <span className="size-1.5 rounded-full bg-accent" />
            <span className="ml-3">haxurn@cli — /tmp/shell</span>
          </span>
          <span>press esc to exit</span>
        </div>

        {/* Buffer */}
        <div
          ref={bufferRef}
          className="max-h-[40vh] overflow-y-auto px-4 py-3 font-mono text-[12.5px] leading-relaxed"
        >
          {history.map((line) => (
            <div key={line.id}>
              {line.kind === "prompt" && (
                <div className="text-fg">
                  <span className="text-accent">operator@haxurn</span>
                  <span className="text-fg-subtle">:~$ </span>
                  <span>{line.text}</span>
                </div>
              )}
              {line.kind === "out" && (
                <div className="whitespace-pre-wrap text-fg-muted">{line.text}</div>
              )}
              {line.kind === "err" && (
                <div className="text-danger">{line.text}</div>
              )}
              {line.kind === "note" && (
                <div className="text-fg-subtle">{`// ${line.text}`}</div>
              )}
            </div>
          ))}
        </div>

        {/* Input row */}
        <div className="flex items-center gap-2 border-t border-border/60 bg-bg/40 px-4 py-2.5 font-mono text-[13px]">
          <span className="text-accent">operator@haxurn</span>
          <span className="text-fg-subtle">:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onInputKey}
            spellCheck={false}
            autoCapitalize="off"
            autoCorrect="off"
            className="flex-1 bg-transparent text-fg outline-none placeholder:text-fg-subtle caret-accent"
            placeholder="type a command and press enter…"
          />
        </div>
      </div>

      <style>{`
        @keyframes cli-up {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          [role="dialog"][aria-label="Hidden command shell"] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
