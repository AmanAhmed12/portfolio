import prisma from "@/lib/prisma";
import { updateProfile } from "../actions";
import { AdminActionForm } from "@/components/AdminActionForm";

export default async function ProfileAdminPage() {
  const profile = await prisma.profile.findFirst() || {
    id: "", name: "", title: "", company: "", bio: "", gpa: "", gpaDesc: "", cloudTitle: "", cloudDesc: ""
  };

  return (
    <div>
      <h1 className="admin-page-title">Profile Settings</h1>
      <p className="admin-page-subtitle">Update your personal information, bio, and highlight metrics.</p>
      
      <div className="admin-card">
        <div className="admin-card-header">
          <i className="ph-fill ph-user-circle"></i> General Information
        </div>
        
        <AdminActionForm action={updateProfile}>
          <input type="hidden" name="id" value={profile.id} />
          
          <div className="admin-grid-2">
            <div className="admin-form-group">
              <label className="admin-label">Full Name</label>
              <input type="text" name="name" defaultValue={profile.name} required className="admin-input" placeholder="e.g. M.H. Amaan Ahmed" />
            </div>
            
            <div className="admin-form-group">
              <label className="admin-label">Professional Title</label>
              <input type="text" name="title" defaultValue={profile.title} required className="admin-input" placeholder="e.g. Associate Software Engineer" />
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Current Company / Organization</label>
            <input type="text" name="company" defaultValue={profile.company} required className="admin-input" placeholder="e.g. Techcess Business Solutions" />
          </div>
          
          <div className="admin-form-group">
            <label className="admin-label">Bio (Brief Summary)</label>
            <textarea name="bio" defaultValue={profile.bio} required rows={4} className="admin-textarea" placeholder="Write a short summary about your experience and goals..."></textarea>
          </div>
          
          <hr style={{ borderColor: 'var(--admin-border)', margin: '2rem 0' }} />
          
          <div className="admin-card-header">
            <i className="ph-fill ph-medal"></i> Highlight Metrics (Bento Cards)
          </div>

          <div className="admin-grid-2">
            <div className="admin-form-group">
              <label className="admin-label">Metric 1: Title (e.g., 4.0 GPA)</label>
              <input type="text" name="gpa" defaultValue={profile.gpa} required className="admin-input" />
            </div>
            
            <div className="admin-form-group">
              <label className="admin-label">Metric 1: Description</label>
              <input type="text" name="gpaDesc" defaultValue={profile.gpaDesc} required className="admin-input" />
            </div>
          </div>
          
          <div className="admin-grid-2">
            <div className="admin-form-group">
              <label className="admin-label">Metric 2: Title (e.g., AWS Cloud)</label>
              <input type="text" name="cloudTitle" defaultValue={profile.cloudTitle} required className="admin-input" />
            </div>
            
            <div className="admin-form-group">
              <label className="admin-label">Metric 2: Description</label>
              <input type="text" name="cloudDesc" defaultValue={profile.cloudDesc} required className="admin-input" />
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="admin-btn">
              <i className="ph-bold ph-floppy-disk"></i> Save Profile Settings
            </button>
          </div>
        </AdminActionForm>
      </div>
    </div>
  );
}
