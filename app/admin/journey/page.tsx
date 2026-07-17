import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { AdminActionForm } from "@/components/AdminActionForm";
import type { AdminActionResult } from "@/lib/admin-action";
import { JourneyClientItem } from "./JourneyClientItem";

export default async function JourneyAdminPage() {
  // Sort by latest records first according to createdAt
  const journeys = await prisma.journey.findMany({ orderBy: { createdAt: 'desc' } });

  async function addJourney(formData: FormData): Promise<AdminActionResult> {
    "use server";
    const session = await getServerSession(authOptions);
    if (!session) {
      return { redirectTo: "/api/auth/signin?callbackUrl=/admin/journey" };
    }

    await prisma.journey.create({
      data: {
        type: formData.get("type") as string,
        title: formData.get("title") as string,
        subtitle: formData.get("subtitle") as string,
        date: formData.get("date") as string,
        points: (formData.get("points") as string).split('\n').filter(p => p.trim() !== ''),
      }
    });
    revalidatePath("/admin/journey");
    revalidatePath("/");
    return { redirectTo: "/admin/journey?toast=Journey+entry+added+successfully&toastType=success" };
  }

  async function editJourney(formData: FormData): Promise<AdminActionResult> {
    "use server";
    const session = await getServerSession(authOptions);
    if (!session) {
      return { redirectTo: "/api/auth/signin?callbackUrl=/admin/journey" };
    }

    const id = formData.get("id") as string;
    await prisma.journey.update({
      where: { id },
      data: {
        type: formData.get("type") as string,
        title: formData.get("title") as string,
        subtitle: formData.get("subtitle") as string,
        date: formData.get("date") as string,
        points: (formData.get("points") as string).split('\n').filter(p => p.trim() !== ''),
      }
    });
    revalidatePath("/admin/journey");
    revalidatePath("/");
    return { redirectTo: "/admin/journey?toast=Entry+updated+successfully&toastType=success" };
  }

  async function deleteJourney(formData: FormData): Promise<AdminActionResult> {
    "use server";
    const session = await getServerSession(authOptions);
    if (!session) {
      return { redirectTo: "/api/auth/signin?callbackUrl=/admin/journey" };
    }

    await prisma.journey.delete({ where: { id: formData.get("id") as string } });
    revalidatePath("/admin/journey");
    revalidatePath("/");
    return { redirectTo: "/admin/journey?toast=Entry+deleted+successfully&toastType=success" };
  }

  return (
    <div>
      <h1 className="admin-page-title">Professional Journey</h1>
      <p className="admin-page-subtitle">Manage your Experience, Education, and Accolades timelines.</p>
      
      <div className="admin-grid-2">
        {/* Left Column: Form */}
        <div>
          <div className="admin-card">
            <div className="admin-card-header">
              <i className="ph-fill ph-plus-circle"></i> Add Timeline Entry
            </div>
            <AdminActionForm action={addJourney}>
              <div className="admin-form-group">
                <label className="admin-label">Entry Type</label>
                <select name="type" required className="admin-select">
                  <option value="EXPERIENCE">Experience</option>
                  <option value="EDUCATION">Education</option>
                  <option value="ACCOLADE">Accolade</option>
                </select>
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Title</label>
                <input type="text" name="title" placeholder="e.g. Associate Software Engineer" required className="admin-input" />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Subtitle / Organization</label>
                <input type="text" name="subtitle" placeholder="e.g. Techcess Business Solutions" required className="admin-input" />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Date Range</label>
                <input type="text" name="date" placeholder="e.g. 2024 - Present" className="admin-input" />
              </div>
              <div className="admin-form-group">
                <label className="admin-label">Bullet Points (One per line)</label>
                <textarea name="points" rows={4} placeholder="Engineered high-performance APIs...&#10;Optimized database queries..." className="admin-textarea"></textarea>
              </div>
              <button type="submit" className="admin-btn">Save Entry</button>
            </AdminActionForm>
          </div>
        </div>

        {/* Right Column: List */}
        <div>
          {['EXPERIENCE', 'EDUCATION', 'ACCOLADE'].map(type => {
            const filtered = journeys.filter(j => j.type === type);
            if (filtered.length === 0) return null;
            return (
              <div key={type} className="admin-card" style={{ marginBottom: '1.5rem' }}>
                <div className="admin-card-header" style={{ marginBottom: '1rem', borderBottom: '1px solid var(--admin-border)', paddingBottom: '0.5rem', color: 'var(--admin-accent)' }}>
                  {type}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {filtered.map(entry => (
                    <JourneyClientItem key={entry.id} entry={entry as any} deleteAction={deleteJourney} editAction={editJourney} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
