"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button 
      onClick={() => signOut({ callbackUrl: "/" })}
      className="admin-nav-link" 
      style={{ 
        color: "var(--admin-danger)", 
        background: "none", 
        border: "none", 
        padding: "1rem", 
        width: "100%", 
        textAlign: "left", 
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        fontFamily: "inherit",
        fontSize: "inherit"
      }}
    >
      <i className="ph ph-sign-out"></i> Sign Out
    </button>
  );
}
