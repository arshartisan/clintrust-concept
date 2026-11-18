"use client";

import { lazy, Suspense, useState, type FormEvent } from "react";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Select, SelectItem } from "@/components/base/select/select";
import { Textarea } from "@/components/base/textarea/textarea";
import { demo } from "@/content/landing";
import { contact } from "@/content/pages";
import { cx } from "@/utils/cx";
import { track } from "@/utils/track";
import { Confetti } from "./confetti";
import { demoFormClass } from "./demo-form-class";

// The toast system (and the animation library it depends on) is only needed
// once someone uses the form: the Toaster mounts on first focus inside the
// form, and `toast` is imported on submit from the same, by then cached, chunk.
const loadToast = () => import("@/components/base/toast/toast");
const LazyToaster = lazy(() => loadToast().then((module) => ({ default: module.Toaster })));


interface DemoFormProps {
  /** Where the form sits ("contact", "landing"); sent with the request and to analytics. */
  source?: string;
}

/** The contact / demo request form. Loaded on demand: see lazy-widgets.tsx. */
export function DemoForm({ source = "contact" }: DemoFormProps) {
  const [sending, setSending] = useState(false);
  const [toasterArmed, setToasterArmed] = useState(false);
  // Bumped on each successful send; re-keys the confetti so it fires again.
  const [sentCount, setSentCount] = useState(0);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setSending(true);
    setToasterArmed(true);
    const { toast } = await loadToast();

    try {
      const response = await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      if (!response.ok) throw new Error(`Request failed with ${response.status}`);

      track("demo_form_submit", { location: source });
      form.reset();
      setSentCount((count) => count + 1);
      toast.success("Message sent", {
        description: "We will reply to your work email.",
      });
    } catch {
      toast.error("Your message was not sent", {
        description: "Check your connection and send it again.",
      });
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      {toasterArmed ? (
        <Suspense fallback={null}>
          <LazyToaster />
        </Suspense>
      ) : null}

      <form
        onSubmit={onSubmit}
        onFocusCapture={() => setToasterArmed(true)}
        className={cx(demoFormClass, "relative grid content-start gap-5 sm:grid-cols-2")}
      >
        <Select
          name="subject"
          label="What is this about?"
          defaultSelectedKey={contact.subjects[0]}
          isRequired
          className="w-full sm:col-span-2"
        >
          {contact.subjects.map((subject) => (
            <SelectItem key={subject} id={subject} textValue={subject}>
              {subject}
            </SelectItem>
          ))}
        </Select>
        <Input name="firstName" label="First name" autoComplete="given-name" isRequired />
        <Input name="lastName" label="Last name" autoComplete="family-name" isRequired />
        <Input
          name="email"
          type="email"
          label="Work email"
          autoComplete="email"
          placeholder="name@company.com"
          isRequired
          className="sm:col-span-2"
        />
        <Input
          name="organization"
          label="Organization"
          autoComplete="organization"
          isRequired
          className="sm:col-span-2"
        />
        <Select name="role" label="Your role" placeholder="Select a role" isRequired className="w-full">
          {demo.roles.map((role) => (
            <SelectItem key={role} id={role} textValue={role}>
              {role}
            </SelectItem>
          ))}
        </Select>
        <Select name="volume" label="Annual trial payment volume" placeholder="Select a range" className="w-full">
          {demo.volumes.map((volume) => (
            <SelectItem key={volume} id={volume} textValue={volume}>
              {volume}
            </SelectItem>
          ))}
        </Select>
        <input type="hidden" name="source" value={source} />
        {/* Honeypot: hidden from people and assistive technology; bots fill it in. */}
        <div aria-hidden="true" className="absolute -start-[9999px] size-px overflow-hidden">
          <label>
            Website
            <input type="text" name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
        <Textarea name="message" label="Message" rows={4} maxLength={2000} className="sm:col-span-2" />

        <div className="flex flex-wrap items-center justify-between gap-4 sm:col-span-2">
          <p className="max-w-[40ch] text-body-2-regular text-text-secondary">
            We use these details only to reply to you.
          </p>
          {/* The brief's confetti moment: a small burst from the button on a successful send. */}
          <span className="relative inline-flex">
            <Button type="submit" disabled={sending}>
              {sending ? "Sending" : "Send message"}
            </Button>
            {sentCount > 0 ? <Confetti key={sentCount} /> : null}
          </span>
        </div>
      </form>
    </>
  );
}
