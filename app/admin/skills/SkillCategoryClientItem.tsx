"use client";

import { useState } from "react";
import { EditModal } from "@/components/EditModal";
import type { AdminActionResult } from "@/lib/admin-action";

type Category = {
  id: string;
  title: string;
  icon: string;
};

export function SkillCategoryClientItem({
  category,
  editAction,
  deleteAction,
  children
}: {
  category: Category;
  editAction: (formData: FormData) => Promise<AdminActionResult>;
  deleteAction: (formData: FormData) => Promise<AdminActionResult>;
  children: React.ReactNode;
}) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="admin-card" style={{ marginBottom: '1rem' }}>
      <div className="admin-card-header" style={{ marginBottom: '1rem', borderBottom: '1px solid var(--admin-border)', paddingBottom: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <i className={`las ${category.icon}`}></i> {category.title}
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={() => setIsEditing(true)} className="admin-btn" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem', background: 'var(--admin-accent)' }}>
            <i className="ph-bold ph-pencil"></i>
          </button>
          <form action={deleteAction} style={{ display: 'inline' }}>
            <input type="hidden" name="id" value={category.id} />
            <button type="submit" className="admin-btn-danger" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }} title="Delete Category (And all skills inside it)">
              <i className="ph-bold ph-trash"></i>
            </button>
          </form>
        </div>
      </div>
      
      {children}

      <EditModal isOpen={isEditing} onClose={() => setIsEditing(false)} title="Edit Skill Category">
        <form action={async (formData) => {
          await editAction(formData);
          setIsEditing(false);
        }}>
          <input type="hidden" name="id" value={category.id} />
          <div className="admin-form-group">
            <label className="admin-label">Category Title</label>
            <input type="text" name="title" defaultValue={category.title} required className="admin-input" />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Line Awesome Icon Class</label>
            <input type="text" name="icon" defaultValue={category.icon} required className="admin-input" />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="admin-btn">Save Changes</button>
          </div>
        </form>
      </EditModal>
    </div>
  );
}
