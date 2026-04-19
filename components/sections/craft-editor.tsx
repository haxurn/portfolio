import { Code2 } from "lucide-react";

type Tok =
  | { k: "kw"; t: string }
  | { k: "id"; t: string }
  | { k: "fn"; t: string }
  | { k: "str"; t: string }
  | { k: "num"; t: string }
  | { k: "op"; t: string }
  | { k: "pn"; t: string }
  | { k: "co"; t: string }
  | { k: "ty"; t: string }
  | { k: "pl"; t: string };

type CodeLine = Tok[];

const code: readonly CodeLine[] = [
  [
    { k: "co", t: "// lib/middleware/session.ts" },
  ],
  [
    { k: "kw", t: "import" },
    { k: "pl", t: " { " },
    { k: "id", t: "cache" },
    { k: "pl", t: " } " },
    { k: "kw", t: "from" },
    { k: "pl", t: " " },
    { k: "str", t: '"react"' },
    { k: "pn", t: ";" },
  ],
  [
    { k: "kw", t: "import" },
    { k: "pl", t: " { " },
    { k: "id", t: "auth" },
    { k: "pl", t: " } " },
    { k: "kw", t: "from" },
    { k: "pl", t: " " },
    { k: "str", t: '"@/lib/auth"' },
    { k: "pn", t: ";" },
  ],
  [],
  [
    { k: "kw", t: "export const" },
    { k: "pl", t: " " },
    { k: "id", t: "getSession" },
    { k: "op", t: " = " },
    { k: "fn", t: "cache" },
    { k: "pn", t: "(" },
    { k: "kw", t: "async" },
    { k: "pl", t: " " },
    { k: "pn", t: "() => {" },
  ],
  [
    { k: "pl", t: "  " },
    { k: "kw", t: "const" },
    { k: "pl", t: " " },
    { k: "id", t: "session" },
    { k: "op", t: " = " },
    { k: "kw", t: "await" },
    { k: "pl", t: " " },
    { k: "id", t: "auth" },
    { k: "pn", t: "." },
    { k: "id", t: "api" },
    { k: "pn", t: "." },
    { k: "fn", t: "getSession" },
    { k: "pn", t: "({" },
  ],
  [
    { k: "pl", t: "    " },
    { k: "id", t: "headers" },
    { k: "pn", t: ": " },
    { k: "fn", t: "headers" },
    { k: "pn", t: "()," },
  ],
  [
    { k: "pl", t: "  " },
    { k: "pn", t: "});" },
  ],
  [],
  [
    { k: "pl", t: "  " },
    { k: "kw", t: "if" },
    { k: "pl", t: " " },
    { k: "pn", t: "(!" },
    { k: "id", t: "session" },
    { k: "pn", t: ") " },
    { k: "kw", t: "return null" },
    { k: "pn", t: ";" },
  ],
  [
    { k: "pl", t: "  " },
    { k: "kw", t: "return" },
    { k: "pl", t: " " },
    { k: "id", t: "session" },
    { k: "pn", t: " " },
    { k: "kw", t: "as" },
    { k: "pl", t: " " },
    { k: "ty", t: "Session" },
    { k: "pn", t: ";" },
  ],
  [{ k: "pn", t: "});" }],
];

const tokenClass: Record<Tok["k"], string> = {
  kw: "text-[oklch(0.74_0.17_305)]",
  id: "text-fg",
  fn: "text-[oklch(0.80_0.16_85)]",
  str: "text-accent",
  num: "text-[oklch(0.78_0.16_35)]",
  op: "text-fg-muted",
  pn: "text-fg-subtle",
  co: "text-fg-subtle italic",
  ty: "text-[oklch(0.76_0.14_200)]",
  pl: "text-fg-muted",
};

export function CraftEditor() {
  return (
    <article
      aria-label="TypeScript code preview"
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-card"
    >
      <header className="flex items-center justify-between gap-3 border-b border-border bg-surface-2/40 px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-[oklch(0.65_0.22_25)]/70" />
          <span className="size-2.5 rounded-full bg-amber-400/70" />
          <span className="size-2.5 rounded-full bg-accent/70" />
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px] text-fg-subtle">
          <Code2 className="size-3" />
          <span>better-middleware</span>
          <span className="text-border">/</span>
          <span className="text-fg-muted">session.ts</span>
        </div>
        <div className="size-4" />
      </header>

      <div className="relative flex-1 overflow-hidden font-mono text-[12.5px] leading-[1.85] p-5">
        <pre className="m-0 grid grid-cols-[2ch_1fr] gap-x-4 text-fg">
          {code.map((line, i) => (
            <Line key={i} num={i + 1} line={line} />
          ))}
        </pre>
      </div>

      <footer className="flex items-center justify-between gap-3 border-t border-border bg-surface-2/40 px-4 py-2 font-mono text-[10px] uppercase tracking-wider text-fg-subtle">
        <span className="inline-flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-accent" />
          typescript · strict
        </span>
        <span>utf-8 · lf</span>
      </footer>
    </article>
  );
}

function Line({ num, line }: { num: number; line: CodeLine }) {
  return (
    <>
      <span className="select-none text-right text-fg-subtle/60 tabular-nums">
        {num}
      </span>
      <span className="whitespace-pre">
        {line.length === 0 ? (
          <span>&nbsp;</span>
        ) : (
          line.map((tok, j) => (
            <span key={j} className={tokenClass[tok.k]}>
              {tok.t}
            </span>
          ))
        )}
      </span>
    </>
  );
}
