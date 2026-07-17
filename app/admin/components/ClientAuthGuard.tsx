"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ClientAuthGuard() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/session");
        const session = await res.json();
        
        // If the session object is empty, the user is not authenticated
        if (!session || Object.keys(session).length === 0) {
          router.replace("/api/auth/signin?callbackUrl=/admin");
          router.refresh(); // Clear the router cache
        }
      } catch (error) {
        console.error("Auth check failed", error);
      }
    };

    // Check immediately on mount
    checkAuth();

    // Check when the page becomes visible again (e.g. Back button, tab switch)
    window.addEventListener("focus", checkAuth);
    window.addEventListener("pageshow", checkAuth);

    return () => {
      window.removeEventListener("focus", checkAuth);
      window.removeEventListener("pageshow", checkAuth);
    };
  }, [router]);

  return null; // This component doesn't render anything, it just guards the route
}
