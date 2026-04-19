import { ShieldCheck } from "lucide-react";

type Line = {
  kind: "prompt" | "info" | "ok" | "warn" | "bad" | "note" | "done";
  text: string;
  tag?: string;
};

const lines: readonly Line[] = [
  { kind: "prompt", text: "./recon --target acme.corp" },
  { kind: "info", text: "starting asset discovery…" },
  { kind: "ok", text: "22/tcp   OpenSSH 9.6       ", tag: "hardened" },
  { kind: "ok", text: "443/tcp  nginx/1.25 (TLS)  ", tag: "healthy" },
  { kind: "warn", text: "8080/tcp debug endpoint   ", tag: "exposed" },
  { kind: "ok", text: "3000/tcp api gateway       ", tag: "rate-limited" },
  { kind: "bad", text: "dep: CVE-2024-3094 in xz-utils", tag: "critical" },
  { kind: "info", text: "4 services / 1 critical finding" },
  { kind: "note", text: "# report: /tmp/recon-2026-04-19.json" },
  { kind: "done", text: "done in 2.1s" },
];

const dotClass: Record<Line["kind"], string> = {
  prompt: "bg-accent",
  info: "bg-fg-subtle",
  ok: "bg-accent",
  warn: "bg-amber-400",
  bad: "bg-[oklch(0.65_0.22_25)]",
  note: "bg-fg-subtle",
  done: "bg-accent",
};

const tagClass: Record<Line["kind"], string> = {
  prompt: "",
  info: "",
  ok: "text-accent border-accent/40",
  warn: "text-amber-400 border-amber-400/40",
  bad: "text-[oklch(0.70_0.20_25)] border-[oklch(0.70_0.20_25)]/40",
  note: "",
  done: "",
};

export function CraftTerminal() {
  return (
    <article
      aria-label="Security reconnaissance terminal output"
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-card"
    >
      <header className="flex items-center justify-between gap-3 border-b border-border bg-surface-2/40 px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-[oklch(0.65_0.22_25)]/70" />
          <span className="size-2.5 rounded-full bg-amber-400/70" />
          <span className="size-2.5 rounded-full bg-accent/70" />
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[11px] text-fg-subtle">
          <ShieldCheck className="size-3" />
          haxurn@tech — zsh
        </div>
        <div className="size-4" />
      </header>

      <div
        className="relative flex-1 overflow-hidden font-mono text-[12.5px] leading-[1.85] p-5"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, oklch(1 0 0 / 0.03) 1px, transparent 0)",
          backgroundSize: "18px 18px",
        }}
      >
        <pre className="m-0 whitespace-pre-wrap text-fg">
          {lines.map((l, i) => (
            <div key={i} className="flex items-start gap-2">
              <span
                aria-hidden
                className={`mt-[0.55em] inline-block size-1.5 shrink-0 rounded-full ${dotClass[l.kind]}`}
              />
              {l.kind === "prompt" ? (
                <span>
                  <span className="text-accent">❯</span>{" "}
                  <span className="text-fg-muted">{l.text}</span>
                </span>
              ) : l.kind === "note" ? (
                <span className="text-fg-subtle italic">{l.text}</span>
              ) : l.kind === "done" ? (
                <span className="text-fg-muted">
                  {"  "}✓ {l.text}
                </span>
              ) : l.kind === "info" ? (
                <span className="text-fg-subtle">{l.text}</span>
              ) : (
                <span className="flex-1 text-fg-muted">
                  {l.text}
                  {l.tag && (
                    <span
                      className={`ml-1 inline-flex items-center rounded border px-1.5 py-0 text-[10px] uppercase tracking-wider ${tagClass[l.kind]}`}
                    >
                      {l.tag}
                    </span>
                  )}
                </span>
              )}
            </div>
          ))}
          <div className="mt-2 flex items-center gap-2">
            <span className="text-accent">❯</span>
            <span
              aria-hidden
              className="inline-block size-[0.65em] translate-y-[1px] bg-accent animate-pulse"
              style={{ width: "0.55ch", height: "1em" }}
            />
          </div>
        </pre>
      </div>

      <footer className="flex items-center justify-between gap-3 border-t border-border bg-surface-2/40 px-4 py-2 font-mono text-[10px] uppercase tracking-wider text-fg-subtle">
        <span>cybersecurity</span>
        <span className="inline-flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-accent" />
          1 crit / 1 warn / 3 ok
        </span>
      </footer>
    </article>
  );
}
