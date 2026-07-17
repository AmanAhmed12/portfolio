import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { AdminActionForm } from "@/components/AdminActionForm";
import type { AdminActionResult } from "@/lib/admin-action";
import { SkillCategoryClientItem } from "./SkillCategoryClientItem";
import { SkillClientItem } from "./SkillClientItem";

export default async function SkillsAdminPage() {
  const categories = await prisma.skillCategory.findMany({ 
    include: { skills: { orderBy: { createdAt: 'desc' } } },
    orderBy: { createdAt: 'desc' }
  });

  async function addCategory(formData: FormData): Promise<AdminActionResult> {
    "use server";
    const session = await getServerSession(authOptions);
    if (!session) return { redirectTo: "/api/auth/signin?callbackUrl=/admin/skills" };

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

  async function editCategory(formData: FormData): Promise<AdminActionResult> {
    "use server";
    const session = await getServerSession(authOptions);
    if (!session) return { redirectTo: "/api/auth/signin?callbackUrl=/admin/skills" };

    const id = formData.get("id") as string;
    await prisma.skillCategory.update({
      where: { id },
      data: {
        title: formData.get("title") as string,
        icon: formData.get("icon") as string,
      }
    });
    revalidatePath("/admin/skills");
    revalidatePath("/");
    return { redirectTo: "/admin/skills?toast=Category+updated&toastType=success" };
  }

  async function deleteCategory(formData: FormData): Promise<AdminActionResult> {
    "use server";
    const session = await getServerSession(authOptions);
    if (!session) return { redirectTo: "/api/auth/signin?callbackUrl=/admin/skills" };

    const id = formData.get("id") as string;
    await prisma.skillCategory.delete({ where: { id } });
    revalidatePath("/admin/skills");
    revalidatePath("/");
    return { redirectTo: "/admin/skills?toast=Category+deleted&toastType=success" };
  }

  async function addSkill(formData: FormData): Promise<AdminActionResult> {
    "use server";
    const session = await getServerSession(authOptions);
    if (!session) return { redirectTo: "/api/auth/signin?callbackUrl=/admin/skills" };

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

  async function editSkill(formData: FormData): Promise<AdminActionResult> {
    "use server";
    const session = await getServerSession(authOptions);
    if (!session) return { redirectTo: "/api/auth/signin?callbackUrl=/admin/skills" };

    const id = formData.get("id") as string;
    await prisma.skill.update({
      where: { id },
      data: {
        name: formData.get("name") as string,
        categoryId: formData.get("categoryId") as string,
      }
    });
    revalidatePath("/admin/skills");
    revalidatePath("/");
    return { redirectTo: "/admin/skills?toast=Skill+updated&toastType=success" };
  }

  async function deleteSkill(formData: FormData): Promise<AdminActionResult> {
    "use server";
    const session = await getServerSession(authOptions);
    if (!session) return { redirectTo: "/api/auth/signin?callbackUrl=/admin/skills" };

    await prisma.skill.delete({ where: { id: formData.get("id") as string } });
    revalidatePath("/admin/skills");
    revalidatePath("/");
    return { redirectTo: "/admin/skills?toast=Skill+deleted&toastType=success" };
  }

  // Simplified array of categories for the dropdown in SkillClientItem
  const categoryOptions = categories.map(c => ({ id: c.id, title: c.title }));

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
              <SkillCategoryClientItem 
                key={cat.id} 
                category={cat} 
                editAction={editCategory} 
                deleteAction={deleteCategory}
              >
                {cat.skills.length === 0 ? (
                  <p style={{ color: 'var(--admin-text-muted)', fontSize: '0.9rem' }}>No skills in this category yet.</p>
                ) : (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {cat.skills.map(skill => (
                      <SkillClientItem 
                        key={skill.id} 
                        skill={skill} 
                        categories={categoryOptions}
                        editAction={editSkill} 
                        deleteAction={deleteSkill} 
                      />
                    ))}
                  </div>
                )}
              </SkillCategoryClientItem>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
