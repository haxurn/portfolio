"use client";

import { useActionState, useState, useEffect } from "react";
import { toast } from "sonner";
import { Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { sendContactEmail, type ContactResult } from "@/lib/actions/contact";

const initial: ContactResult | null = null;

export function ContactForm() {
  const [state, formAction, pending] = useActionState<ContactResult | null, FormData>(
    async (_prev, formData) => sendContactEmail(formData),
    initial,
  );
  const [lastToastKey, setLastToastKey] = useState("");

  useEffect(() => {
    if (!state) return;
    const key = JSON.stringify(state) + Date.now();
    if (key === lastToastKey) return;
    if (state.ok) {
      toast.success("Message sent. I'll get back within 24–48 hours.");
    } else {
      toast.error(state.error);
    }
    setLastToastKey(key);
  }, [state, lastToastKey]);

  const fieldErrors = state && !state.ok ? state.fieldErrors : undefined;

  return (
    <form action={formAction} className="space-y-5">
      <Field label="Name" name="name" error={fieldErrors?.name}>
        <Input name="name" required maxLength={80} placeholder="Your name" disabled={pending} />
      </Field>
      <Field label="Email" name="email" error={fieldErrors?.email}>
        <Input name="email" type="email" required placeholder="you@domain.com" disabled={pending} />
      </Field>
      <Field label="Message" name="message" error={fieldErrors?.message}>
        <Textarea
          name="message"
          required
          minLength={10}
          maxLength={4000}
          rows={6}
          placeholder="What's on your mind?"
          disabled={pending}
        />
      </Field>

      {state && state.ok && !pending && (
        <p className="text-sm text-accent">Thanks — your message is on its way.</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-11 items-center gap-2 rounded-md bg-accent px-5 text-sm font-medium text-accent-fg hover:opacity-90 disabled:opacity-60 transition-opacity"
      >
        {pending ? "Sending…" : "Send message"}
        {!pending && <Send className="size-4" />}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  error,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      {children}
      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  );
}
