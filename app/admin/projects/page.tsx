import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { AdminActionForm } from "@/components/AdminActionForm";
import type { AdminActionResult } from "@/lib/admin-action";
import { ProjectClientItem } from "./ProjectClientItem";

export default async function ProjectsAdminPage() {
  const projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } });

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
    return { refresh: true, redirectTo: "/admin/projects?toast=Project+added+successfully&toastType=success" };
  }

  async function editProject(formData: FormData): Promise<AdminActionResult> {
    "use server";
    const session = await getServerSession(authOptions);
    if (!session) {
      return { redirectTo: "/api/auth/signin?callbackUrl=/admin/projects" };
    }

    const id = formData.get("id") as string;
    await prisma.project.update({
      where: { id },
      data: {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        link: formData.get("link") as string,
      }
    });
    revalidatePath("/admin/projects");
    revalidatePath("/");
    return { refresh: true, redirectTo: "/admin/projects?toast=Project+updated+successfully&toastType=success" };
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
    return { refresh: true, redirectTo: "/admin/projects?toast=Project+deleted+successfully&toastType=success" };
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
            <ProjectClientItem 
              key={project.id} 
              project={project as any} 
              deleteAction={deleteProject} 
              editAction={editProject} 
            />
          ))
        )}
      </div>
    </div>
  );
}
