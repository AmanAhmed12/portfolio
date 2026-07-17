"use client";

import { useEffect, useRef } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export default function Snackbar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const message = searchParams.get("toast");
  const type = (searchParams.get("toastType") as "success" | "error") || "success";

  useEffect(() => {
    if (!message) return;

    // Auto-dismiss after 3.5 seconds
    timerRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("toast");
      params.delete("toastType");
      const newUrl = params.toString() ? `${pathname}?${params}` : pathname;
      router.replace(newUrl, { scroll: false });
    }, 3500);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [message, pathname, router, searchParams]);

  if (!message) return null;

  return (
    <div className={`admin-snackbar ${type}`} role="alert">
      <i className={`ph-fill ${type === "success" ? "ph-check-circle" : "ph-warning-circle"}`}></i>
      <span>{message}</span>
    </div>
  );
}
