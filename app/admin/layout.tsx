import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import { Suspense } from "react";
import Snackbar from "@/components/Snackbar";
import "./admin.css";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/admin");
  }

  return (
    <>
      <Script src="https://unpkg.com/@phosphor-icons/web" strategy="lazyOnload" />
      <div className="admin-layout">
        <aside className="admin-sidebar">
          <div className="admin-brand">
            <i className="ph-fill ph-code"></i>
            Admin 
          </div>
          <nav className="admin-nav">
            <Link href="/admin" className="admin-nav-link">
              <i className="ph ph-squares-four"></i> Dashboard
            </Link>
            <Link href="/admin/profile" className="admin-nav-link">
              <i className="ph ph-user"></i> Profile
            </Link>
            <Link href="/admin/skills" className="admin-nav-link">
              <i className="ph ph-code-block"></i> Skills
            </Link>
            <Link href="/admin/journey" className="admin-nav-link">
              <i className="ph ph-path"></i> Journey
            </Link>
            <Link href="/admin/projects" className="admin-nav-link">
              <i className="ph ph-folder-open"></i> Projects
            </Link>
          </nav>
          <div className="admin-nav-footer">
            <Link href="/" className="admin-nav-link" target="_blank">
              <i className="ph ph-arrow-square-out"></i> View Site
            </Link>
            <a href="/api/auth/signout" className="admin-nav-link" style={{color: 'var(--admin-danger)'}}>
              <i className="ph ph-sign-out"></i> Sign Out
            </a>
          </div>
        </aside>
        <main className="admin-content">
          {children}
        </main>
      </div>
      <Suspense>
        <Snackbar />
      </Suspense>
    </>
  );
}
