"use client";

import { useState } from "react";
import { EditModal } from "@/components/EditModal";
import type { AdminActionResult } from "@/lib/admin-action";

type Project = {
  id: string;
  title: string;
  description: string;
  link: string | null;
};

export function ProjectClientItem({
  project,
  deleteAction,
  editAction,
}: {
  project: Project;
  deleteAction: (formData: FormData) => Promise<any>;
  editAction: (formData: FormData) => Promise<any>;
}) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="admin-card" style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', gap: '0.5rem' }}>
        <button onClick={() => setIsEditing(true)} className="admin-btn" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem', background: 'var(--admin-accent)' }}>
          <i className="ph-bold ph-pencil"></i>
        </button>
        <form action={deleteAction} style={{ display: 'inline' }}>
          <input type="hidden" name="id" value={project.id} />
          <button type="submit" className="admin-btn-danger" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }} title="Delete Project">
            <i className="ph-bold ph-trash"></i>
          </button>
        </form>
      </div>
      
      <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', paddingRight: '4rem' }}>{project.title}</h4>
      <p style={{ margin: '0 0 1.5rem 0', fontSize: '0.9rem', color: 'var(--admin-text-muted)', flex: 1 }}>{project.description}</p>
      
      {project.link ? (
        <a href={project.link} target="_blank" rel="noreferrer" style={{ color: 'var(--admin-accent)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
          <i className="ph-bold ph-link"></i> Visit Project
        </a>
      ) : (
        <span style={{ color: 'var(--admin-text-muted)', fontSize: '0.9rem' }}>No link provided</span>
      )}

      <EditModal isOpen={isEditing} onClose={() => setIsEditing(false)} title="Edit Project">
        <form action={async (formData) => {
          await editAction(formData);
          setIsEditing(false);
        }}>
          <input type="hidden" name="id" value={project.id} />
          <div className="admin-form-group">
            <label className="admin-label">Project Title</label>
            <input type="text" name="title" defaultValue={project.title} required className="admin-input" />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Project URL (Optional)</label>
            <input type="url" name="link" defaultValue={project.link || ''} className="admin-input" />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Short Description</label>
            <textarea name="description" rows={3} defaultValue={project.description} required className="admin-textarea"></textarea>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="admin-btn">Save Changes</button>
          </div>
        </form>
      </EditModal>
    </div>
  );
}
