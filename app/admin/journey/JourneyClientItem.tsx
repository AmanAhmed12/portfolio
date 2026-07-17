"use client";

import { useState } from "react";
import { EditModal } from "@/components/EditModal";
import type { AdminActionResult } from "@/lib/admin-action";

type Journey = {
  id: string;
  type: string;
  title: string;
  subtitle: string;
  date: string | null;
  points: string[];
};

export function JourneyClientItem({
  entry,
  deleteAction,
  editAction,
}: {
  entry: Journey;
  deleteAction: (formData: FormData) => Promise<AdminActionResult>;
  editAction: (formData: FormData) => Promise<AdminActionResult>;
}) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '8px', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', gap: '0.5rem' }}>
        <button onClick={() => setIsEditing(true)} className="admin-btn" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem', background: 'var(--admin-accent)' }}>
          <i className="ph-bold ph-pencil"></i>
        </button>
        <form action={deleteAction} style={{ display: 'inline' }}>
          <input type="hidden" name="id" value={entry.id} />
          <button type="submit" className="admin-btn-danger" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}>
            <i className="ph-bold ph-trash"></i>
          </button>
        </form>
      </div>
      <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1rem' }}>{entry.title}</h4>
      <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: 'var(--admin-text-muted)' }}>{entry.subtitle} &bull; {entry.date}</p>
      {entry.points.length > 0 && (
        <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.85rem', color: 'var(--admin-text-muted)' }}>
          {entry.points.map((p, i) => <li key={i}>{p}</li>)}
        </ul>
      )}

      <EditModal isOpen={isEditing} onClose={() => setIsEditing(false)} title="Edit Journey Entry">
        <form action={async (formData) => {
          await editAction(formData);
          setIsEditing(false);
        }} className="admin-grid-2">
          <input type="hidden" name="id" value={entry.id} />
          <div className="admin-form-group">
            <label className="admin-label">Entry Type</label>
            <select name="type" required className="admin-select" defaultValue={entry.type}>
              <option value="EXPERIENCE">Experience</option>
              <option value="EDUCATION">Education</option>
              <option value="ACCOLADE">Accolade</option>
            </select>
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Title</label>
            <input type="text" name="title" defaultValue={entry.title} required className="admin-input" />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Subtitle / Organization</label>
            <input type="text" name="subtitle" defaultValue={entry.subtitle} required className="admin-input" />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Date Range</label>
            <input type="text" name="date" defaultValue={entry.date || ''} className="admin-input" />
          </div>
          <div className="admin-form-group" style={{ gridColumn: 'span 2' }}>
            <label className="admin-label">Bullet Points (One per line)</label>
            <textarea name="points" rows={4} defaultValue={entry.points.join('\n')} className="admin-textarea"></textarea>
          </div>
          <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="admin-btn">Save Changes</button>
          </div>
        </form>
      </EditModal>
    </div>
  );
}
