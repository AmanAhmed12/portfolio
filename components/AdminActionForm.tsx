"use client";

import { useRouter } from "next/navigation";
import { useTransition, type FormHTMLAttributes, type ReactNode } from "react";

type ActionResult = {
  redirectTo?: string;
  refresh?: boolean;
};

type AdminActionFormProps = Omit<FormHTMLAttributes<HTMLFormElement>, "action" | "onSubmit"> & {
  action: (formData: FormData) => Promise<ActionResult | void>;
  children: ReactNode;
};

export function AdminActionForm({ action, children, ...props }: AdminActionFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    startTransition(async () => {
      const result = await action(formData);

      if (result?.redirectTo) {
        router.push(result.redirectTo);
        return;
      }

      if (result?.refresh) {
        router.refresh();
        return;
      }

      router.refresh();
    });
  };

  return (
    <form {...props} onSubmit={handleSubmit}>
      {children}
      {isPending ? <span style={{ display: "inline-block", marginTop: "0.75rem", color: "var(--admin-text-muted)" }}>Saving…</span> : null}
    </form>
  );
}
