"use client";

import { lazy, Suspense, useState, type FormEvent } from "react";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Select, SelectItem } from "@/components/base/select/select";
import { Textarea } from "@/components/base/textarea/textarea";
import { demo } from "@/content/landing";
import { contact } from "@/content/pages";

// The toast system (and the animation library it depends on) is only needed
// once someone uses the form: the Toaster mounts on first focus inside the
// form, and `toast` is imported on submit from the same, by then cached, chunk.
const loadToast = () => import("@/components/base/toast/toast");
const LazyToaster = lazy(() => loadToast().then((module) => ({ default: module.Toaster })));

/** Shared by the form and its loading placeholder so both are one size. */
export const demoFormClass =
  "min-h-[860px] rounded-3xl border border-border-button-default bg-background-primary-default p-6 shadow-lg sm:min-h-[646px] sm:p-8";

/** The contact / demo request form. Loaded on demand: see lazy-widgets.tsx. */
export function DemoForm() {
  const [sending, setSending] = useState(false);
  const [toasterArmed, setToasterArmed] = useState(false);

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

      form.reset();
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
        className={`${demoFormClass} grid content-start gap-5 sm:grid-cols-2`}
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
        <Textarea name="message" label="Message" rows={4} maxLength={2000} className="sm:col-span-2" />

        <div className="flex flex-wrap items-center justify-between gap-4 sm:col-span-2">
          <p className="max-w-[40ch] text-body-2-regular text-text-secondary">
            We use these details only to reply to you.
          </p>
          <Button type="submit" disabled={sending}>
            {sending ? "Sending" : "Send message"}
          </Button>
        </div>
      </form>
    </>
  );
}
