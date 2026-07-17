"use client";

import { useState } from "react";
import { EditModal } from "@/components/EditModal";
import type { AdminActionResult } from "@/lib/admin-action";

type Skill = {
  id: string;
  name: string;
  categoryId: string;
};

export function SkillClientItem({
  skill,
  categories,
  deleteAction,
  editAction,
}: {
  skill: Skill;
  categories: { id: string; title: string }[];
  deleteAction: (formData: FormData) => Promise<AdminActionResult>;
  editAction: (formData: FormData) => Promise<AdminActionResult>;
}) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="admin-pill" style={{ position: 'relative' }}>
      <span style={{ cursor: 'pointer', paddingRight: '0.25rem' }} onClick={() => setIsEditing(true)}>
        {skill.name}
      </span>
      <form action={deleteAction} style={{ display: 'inline' }}>
        <input type="hidden" name="id" value={skill.id} />
        <button type="submit" style={{ background: 'none', border: 'none', color: 'var(--admin-danger)', cursor: 'pointer', padding: '0', marginLeft: '0.25rem', display: 'flex', alignItems: 'center' }}>
          <i className="ph-bold ph-x"></i>
        </button>
      </form>

      <EditModal isOpen={isEditing} onClose={() => setIsEditing(false)} title="Edit Skill">
        <form action={async (formData) => {
          await editAction(formData);
          setIsEditing(false);
        }}>
          <input type="hidden" name="id" value={skill.id} />
          <div className="admin-form-group">
            <label className="admin-label">Select Category</label>
            <select name="categoryId" required className="admin-select" defaultValue={skill.categoryId}>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.title}</option>
              ))}
            </select>
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Skill Name</label>
            <input type="text" name="name" defaultValue={skill.name} required className="admin-input" />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="admin-btn">Save Changes</button>
          </div>
        </form>
      </EditModal>
    </div>
  );
}
