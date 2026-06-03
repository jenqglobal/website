import { useState, useEffect } from 'react';
import { Save, Eye, X, FileText, ExternalLink } from 'lucide-react';
import axios from 'axios';

interface Page {
  id: number;
  slug: string;
  title: string;
  content: any;
  meta_title: string;
  meta_description: string;
  updated_at: string;
}

const defaultPages = [
  { slug: 'home', title: 'Home', content: {} },
  { slug: 'about', title: 'About Us', content: {} },
  { slug: 'services', title: 'Services', content: {} },
  { slug: 'industries', title: 'Industries We Serve', content: {} },
  { slug: 'problems', title: 'Problems We Solve', content: {} },
  { slug: 'pricing', title: 'Pricing', content: {} },
  { slug: 'blog', title: 'Blog', content: {} },
  { slug: 'contact', title: 'Contact', content: {} }
];

const token = localStorage.getItem('token');

export default function PagesManager() {
  const [pages, setPages] = useState<Page[]>([]);
  const [editingPage, setEditingPage] = useState<Page | null>(null);
  const [formData, setFormData] = useState({ title: '', slug: '', content: '', meta_title: '', meta_description: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => { loadPages(); }, []);

  const loadPages = async () => {
    try {
      const res = await axios.get('/api/pages');
      setPages(res.data.length > 0 ? res.data : defaultPages.map(p => ({ ...p, content: {}, meta_title: '', meta_description: '', updated_at: '' })));
    } catch {
      setPages(defaultPages.map(p => ({ ...p, content: {}, meta_title: '', meta_description: '', updated_at: '' })));
    }
  };

  const handleEdit = (page: Page) => {
    setEditingPage(page);
    setFormData({ title: page.title, slug: page.slug, content: typeof page.content === 'string' ? page.content : JSON.stringify(page.content, null, 2), meta_title: page.meta_title || '', meta_description: page.meta_description || '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleCancel = () => { setEditingPage(null); setFormData({ title: '', slug: '', content: '', meta_title: '', meta_description: '' }); };

  const handleSave = async () => {
    setSaving(true);
    try {
      await axios.post('/api/pages', formData, { headers: { Authorization: `Bearer ${token}` } });
      await loadPages();
      setEditingPage(null);
    } catch (err) { console.error('Failed to save:', err); }
    finally { setSaving(false); }
  };

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'white', marginBottom: 6 }}>Pages</h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>Manage website pages and content</p>
      </div>

      {editingPage && (
        <div style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: 32, marginBottom: 32 }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'white', marginBottom: 24 }}>Edit Page: {editingPage.title}</h2>
          <div style={{ display: 'grid', gap: 20 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}>Page Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '12px 16px', color: 'white', fontSize: 14, outline: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}>URL Slug</label>
                <input type="text" name="slug" value={formData.slug} onChange={handleChange} disabled style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '12px 16px', color: 'rgba(255,255,255,0.5)', fontSize: 14, outline: 'none' }} />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}>Page Content (JSON)</label>
              <textarea name="content" value={formData.content} onChange={handleChange} style={{ width: '100%', minHeight: 300, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '12px 16px', color: 'white', fontSize: 13, fontFamily: 'monospace', outline: 'none', resize: 'vertical' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}>Meta Title (SEO)</label>
                <input type="text" name="meta_title" value={formData.meta_title} onChange={handleChange} placeholder="Page title for search engines" style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '12px 16px', color: 'white', fontSize: 14, outline: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}>Meta Description (SEO)</label>
                <input type="text" name="meta_description" value={formData.meta_description} onChange={handleChange} placeholder="Brief description for search results" style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '12px 16px', color: 'white', fontSize: 14, outline: 'none' }} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={handleSave} disabled={saving} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 8, fontWeight: 600, fontSize: 14, background: 'linear-gradient(135deg, #6366F1, #8B5CF6)', color: 'white', border: 'none', cursor: 'pointer' }}><Save size={16} />{saving ? 'Saving...' : 'Save Page'}</button>
              <button onClick={handleCancel} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 8, fontWeight: 600, fontSize: 14, background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer' }}><X size={16} />Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
        {pages.map((page) => (
          <div key={page.id || page.slug} style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(139,92,246,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FileText size={24} color="#A78BFA" />
              </div>
              <a href={`/${page.slug}`} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '6px 10px', borderRadius: 6, fontSize: 12, color: 'rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.05)', textDecoration: 'none' }}>
                <ExternalLink size={12} /> View
              </a>
            </div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'white', marginBottom: 6 }}>{page.title}</h3>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 16 }}>/{page.slug}</p>
            <button onClick={() => handleEdit(page)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '10px 16px', borderRadius: 8, fontWeight: 600, fontSize: 13, background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer' }}>
              <Eye size={16} /> Edit Page
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}