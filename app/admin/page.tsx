import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/admin");
  }

  const messages = await prisma.message.findMany({
    orderBy: { createdAt: 'desc' }
  });
  
  const projectCount = await prisma.project.count();
  const skillCount = await prisma.skill.count();

  return (
    <div>
      <h1 className="admin-page-title">Dashboard</h1>
      <p className="admin-page-subtitle">Welcome back, <strong>{session.user?.email}</strong>. Here's what's happening.</p>
      
      <div className="admin-grid-3" style={{ marginBottom: '3rem' }}>
        <div className="admin-card">
          <div className="admin-card-header" style={{ color: 'var(--admin-text-muted)' }}>
            <i className="ph-fill ph-envelope-simple"></i> Total Messages
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--admin-accent)' }}>{messages.length}</div>
        </div>
        <div className="admin-card">
          <div className="admin-card-header" style={{ color: 'var(--admin-text-muted)' }}>
            <i className="ph-fill ph-folder-open"></i> Projects Active
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--admin-success)' }}>{projectCount}</div>
        </div>
        <div className="admin-card">
          <div className="admin-card-header" style={{ color: 'var(--admin-text-muted)' }}>
            <i className="ph-fill ph-code-block"></i> Skills Listed
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#f59e0b' }}>{skillCount}</div>
        </div>
      </div>

      <section>
        <div className="admin-card">
          <div className="admin-card-header">
            <i className="ph-fill ph-tray"></i> Recent Inquiries
          </div>
          
          <div className="admin-table-container">
            {messages.length === 0 ? <p style={{color: 'var(--admin-text-muted)'}}>No messages yet.</p> : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Message</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.map(msg => (
                    <tr key={msg.id}>
                      <td style={{fontWeight: 500}}>{msg.name}</td>
                      <td><a href={`mailto:${msg.email}`} style={{color: 'var(--admin-accent)', textDecoration: 'none'}}>{msg.email}</a></td>
                      <td><span style={{display: 'inline-block', maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}} title={msg.message}>{msg.message}</span></td>
                      <td style={{color: 'var(--admin-text-muted)'}}>{msg.createdAt.toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
