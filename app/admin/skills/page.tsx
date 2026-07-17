import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { AdminActionForm } from "@/components/AdminActionForm";
import type { AdminActionResult } from "@/lib/admin-action";

export default async function SkillsAdminPage() {
  const categories = await prisma.skillCategory.findMany({ include: { skills: true } });

  async function addCategory(formData: FormData): Promise<AdminActionResult> {
    "use server";
    const session = await getServerSession(authOptions);
    if (!session) {
      return { redirectTo: "/api/auth/signin?callbackUrl=/admin/skills" };
    }

    await prisma.skillCategory.create({
      data: {
        title: formData.get("title") as string,
        icon: formData.get("icon") as string,
      }
    });
    revalidatePath("/admin/skills");
    revalidatePath("/");
    return { redirectTo: "/admin/skills?toast=Category+added+successfully&toastType=success" };
  }

  async function addSkill(formData: FormData): Promise<AdminActionResult> {
    "use server";
    const session = await getServerSession(authOptions);
    if (!session) {
      return { redirectTo: "/api/auth/signin?callbackUrl=/admin/skills" };
    }

    await prisma.skill.create({
      data: {
        name: formData.get("name") as string,
        categoryId: formData.get("categoryId") as string,
      }
    });
    revalidatePath("/admin/skills");
    revalidatePath("/");
    return { redirectTo: "/admin/skills?toast=Skill+added+successfully&toastType=success" };
  }

  async function deleteSkill(formData: FormData): Promise<AdminActionResult> {
    "use server";
    const session = await getServerSession(authOptions);
    if (!session) {
      return { redirectTo: "/api/auth/signin?callbackUrl=/admin/skills" };
    }

    await prisma.skill.delete({ where: { id: formData.get("id") as string } });
    revalidatePath("/admin/skills");
    revalidatePath("/");
    return { redirectTo: "/admin/skills?toast=Skill+deleted&toastType=success" };
  }

  return (
    <div>
      <h1 className="admin-page-title">Technical Skills</h1>
      <p className="admin-page-subtitle">Manage your skill categories and individual skills displayed in the bento grid.</p>
      
      <div className="admin-grid-2">
        {/* Left Column: Forms */}
        <div>
          <div className="admin-card" style={{ marginBottom: '2rem' }}>
            <div className="admin-card-header">
              <i className="ph-fill ph-plus-circle"></i> Add Skill Category
            </div>
            <AdminActionForm action={addCategory}>
              <div className="admin-form-group">
                <label className="admin-label">Category Title</label>
                <input type="text" name="title" placeholder="e.g. Backend Development" required className="admin-input" />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Line Awesome Icon Class</label>
                <input type="text" name="icon" placeholder="e.g. la-server" required className="admin-input" />
              </div>
              <button type="submit" className="admin-btn">Add Category</button>
            </AdminActionForm>
          </div>

          <div className="admin-card">
            <div className="admin-card-header">
              <i className="ph-fill ph-plus-square"></i> Add Specific Skill
            </div>
            <AdminActionForm action={addSkill}>
              <div className="admin-form-group">
                <label className="admin-label">Select Category</label>
                <select name="categoryId" required className="admin-select">
                  <option value="">-- Choose Category --</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.title}</option>
                  ))}
                </select>
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Skill Name</label>
                <input type="text" name="name" placeholder="e.g. Java Spring Boot" required className="admin-input" />
              </div>
              <button type="submit" className="admin-btn">Add Skill</button>
            </AdminActionForm>
          </div>
        </div>

        {/* Right Column: List */}
        <div>
          {categories.length === 0 ? (
            <div className="admin-card text-center" style={{ color: 'var(--admin-text-muted)' }}>
              No categories added yet. Start by creating one!
            </div>
          ) : (
            categories.map(cat => (
              <div key={cat.id} className="admin-card" style={{ marginBottom: '1rem' }}>
                <div className="admin-card-header" style={{ marginBottom: '1rem', borderBottom: '1px solid var(--admin-border)', paddingBottom: '0.5rem' }}>
                   <i className={`las ${cat.icon}`}></i> {cat.title}
                </div>
                
                {cat.skills.length === 0 ? (
                  <p style={{ color: 'var(--admin-text-muted)', fontSize: '0.9rem' }}>No skills in this category yet.</p>
                ) : (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {cat.skills.map(skill => (
                      <div key={skill.id} className="admin-pill">
                        {skill.name}
                        <AdminActionForm action={deleteSkill} style={{ display: 'inline' }}>
                          <input type="hidden" name="id" value={skill.id} />
                          <button type="submit" style={{ background: 'none', border: 'none', color: 'var(--admin-danger)', cursor: 'pointer', padding: '0', marginLeft: '0.25rem', display: 'flex', alignItems: 'center' }}>
                            <i className="ph-bold ph-x"></i>
                          </button>
                        </AdminActionForm>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
