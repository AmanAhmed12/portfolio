import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { AdminActionForm } from "@/components/AdminActionForm";
import type { AdminActionResult } from "@/lib/admin-action";

export default async function ProjectsAdminPage() {
  const projects = await prisma.project.findMany();

  async function addProject(formData: FormData): Promise<AdminActionResult> {
    "use server";
    const session = await getServerSession(authOptions);
    if (!session) {
      return { redirectTo: "/api/auth/signin?callbackUrl=/admin/projects" };
    }

    await prisma.project.create({
      data: {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        link: formData.get("link") as string,
      }
    });
    revalidatePath("/admin/projects");
    revalidatePath("/");
    return { refresh: true };
  }

  async function deleteProject(formData: FormData): Promise<AdminActionResult> {
    "use server";
    const session = await getServerSession(authOptions);
    if (!session) {
      return { redirectTo: "/api/auth/signin?callbackUrl=/admin/projects" };
    }

    await prisma.project.delete({ where: { id: formData.get("id") as string } });
    revalidatePath("/admin/projects");
    revalidatePath("/");
    return { refresh: true };
  }

  return (
    <div>
      <h1 className="admin-page-title">Selected Projects</h1>
      <p className="admin-page-subtitle">Showcase your best work and portfolio projects.</p>
      
      <div className="admin-card" style={{ marginBottom: '3rem' }}>
        <div className="admin-card-header">
          <i className="ph-fill ph-folder-plus"></i> Add New Project
        </div>
        <AdminActionForm action={addProject} className="admin-grid-3" style={{ alignItems: 'flex-end' }}>
          <div className="admin-form-group" style={{ marginBottom: 0 }}>
            <label className="admin-label">Project Title</label>
            <input type="text" name="title" placeholder="e.g. E-Commerce Platform" required className="admin-input" />
          </div>
          <div className="admin-form-group" style={{ marginBottom: 0 }}>
            <label className="admin-label">Project URL (Optional)</label>
            <input type="url" name="link" placeholder="https://..." className="admin-input" />
          </div>
          <div className="admin-form-group" style={{ marginBottom: 0 }}>
            <button type="submit" className="admin-btn" style={{ width: '100%' }}>Add Project</button>
          </div>
          <div className="admin-form-group" style={{ gridColumn: 'span 3', marginBottom: 0, marginTop: '1rem' }}>
            <label className="admin-label">Short Description</label>
            <textarea name="description" rows={2} placeholder="Built with Next.js and PostgreSQL..." required className="admin-textarea"></textarea>
          </div>
        </AdminActionForm>
      </div>

      <div className="admin-grid-3">
        {projects.length === 0 ? (
          <p style={{ color: 'var(--admin-text-muted)' }}>No projects added yet.</p>
        ) : (
          projects.map(project => (
            <div key={project.id} className="admin-card" style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
              <AdminActionForm action={deleteProject} style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
                <input type="hidden" name="id" value={project.id} />
                <button type="submit" className="admin-btn-danger" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }} title="Delete Project">
                  <i className="ph-bold ph-trash"></i>
                </button>
              </AdminActionForm>
              
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', paddingRight: '2rem' }}>{project.title}</h4>
              <p style={{ margin: '0 0 1.5rem 0', fontSize: '0.9rem', color: 'var(--admin-text-muted)', flex: 1 }}>{project.description}</p>
              
              {project.link ? (
                <a href={project.link} target="_blank" rel="noreferrer" style={{ color: 'var(--admin-accent)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                  <i className="ph-bold ph-link"></i> Visit Project
                </a>
              ) : (
                <span style={{ color: 'var(--admin-text-muted)', fontSize: '0.9rem' }}>No link provided</span>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
