import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, FileText, CheckCircle, XCircle } from 'lucide-react';
import axios from 'axios';

interface BlogPost { id: number; title: string; slug: string; content: string; excerpt: string; featured_image: string; category: string; author: string; published: number; created_at: string; }

const categories = ['Technology', 'Growth', 'Security', 'Case Studies'];
const token = localStorage.getItem('token');

export default function BlogManager() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({ title: '', slug: '', content: '', excerpt: '', featured_image: '', category: 'Technology', author: 'JenQ Team', published: false });
  const [saving, setSaving] = useState(false);

  useEffect(() => { loadPosts(); }, []);

  const loadPosts = async () => {
    try {
      const res = await axios.get('/api/blog');
      setPosts(res.data);
    } catch (err) { console.error('Failed to load posts:', err); }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData({ ...formData, [name]: val });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await axios.post('/api/blog', formData, { headers: { Authorization: `Bearer ${token}` } });
      await loadPosts();
      setIsCreating(false);
      setFormData({ title: '', slug: '', content: '', excerpt: '', featured_image: '', category: 'Technology', author: 'JenQ Team', published: false });
    } catch (err) { console.error('Failed to save:', err); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this post?')) return;
    try {
      await axios.delete(`/api/blog/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      await loadPosts();
    } catch (err) { console.error('Failed to delete:', err); }
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'white', marginBottom: 6 }}>Blog Posts</h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>Manage your blog content</p>
        </div>
        {!isCreating && <button onClick={() => setIsCreating(true)} style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)', color: 'white', padding: '12px 24px', borderRadius: 12, fontWeight: 600, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}><Plus size={18} /> New Post</button>}
      </div>

      {isCreating && (
        <div style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'white', marginBottom: 20 }}>Create New Post</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            <div><label style={{ display: 'block', fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>Title</label><input type="text" name="title" value={formData.title} onChange={handleChange} style={{ width: '100%', padding: '14px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: 'white', fontSize: 14 }} /></div>
            <div><label style={{ display: 'block', fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>Slug</label><input type="text" name="slug" value={formData.slug} onChange={handleChange} style={{ width: '100%', padding: '14px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: 'white', fontSize: 14 }} /></div>
            <div><label style={{ display: 'block', fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>Category</label><select name="category" value={formData.category} onChange={handleChange} style={{ width: '100%', padding: '14px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: 'white', fontSize: 14 }}>{categories.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
            <div><label style={{ display: 'block', fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>Featured Image URL</label><input type="url" name="featured_image" value={formData.featured_image} onChange={handleChange} style={{ width: '100%', padding: '14px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: 'white', fontSize: 14 }} /></div>
          </div>
          <div style={{ marginTop: 20 }}><label style={{ display: 'block', fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>Excerpt</label><textarea name="excerpt" value={formData.excerpt} onChange={handleChange} rows={2} style={{ width: '100%', padding: '14px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: 'white', fontSize: 14, resize: 'none' }} /></div>
          <div style={{ marginTop: 20 }}><label style={{ display: 'block', fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>Content</label><textarea name="content" value={formData.content} onChange={handleChange} rows={6} style={{ width: '100%', padding: '14px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: 'white', fontSize: 14, resize: 'none' }} /></div>
          <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 16 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}><input type="checkbox" name="published" checked={formData.published} onChange={handleChange} style={{ width: 18, height: 18, accentColor: '#3B82F6' }} /><span style={{ color: 'white', fontSize: 14 }}>Publish immediately</span></label>
          </div>
          <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
            <button onClick={handleSave} disabled={saving} style={{ background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)', color: 'white', padding: '12px 24px', borderRadius: 12, fontWeight: 600, border: 'none', cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1 }}>{saving ? 'Saving...' : 'Save Post'}</button>
            <button onClick={() => setIsCreating(false)} style={{ background: 'rgba(255,255,255,0.05)', color: 'white', padding: '12px 24px', borderRadius: 12, fontWeight: 600, border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer' }}>Cancel</button>
          </div>
        </div>
      )}

      <div style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>Title</th>
              <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>Category</th>
              <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>Status</th>
              <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>Date</th>
              <th style={{ padding: '16px 20px', textAlign: 'right', fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <td style={{ padding: '16px 20px' }}><div style={{ fontWeight: 600, color: 'white' }}>{post.title}</div><div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{post.slug}</div></td>
                <td style={{ padding: '16px 20px' }}><span style={{ padding: '4px 12px', borderRadius: 20, fontSize: 12, background: 'rgba(59,130,246,0.15)', color: '#60A5FA' }}>{post.category}</span></td>
                <td style={{ padding: '16px 20px' }}>{post.published ? <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#10B981', fontSize: 13 }}><CheckCircle size={16} /> Published</span> : <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.4)', fontSize: 13 }}><XCircle size={16} /> Draft</span>}</td>
                <td style={{ padding: '16px 20px', color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>{new Date(post.created_at).toLocaleDateString()}</td>
                <td style={{ padding: '16px 20px', textAlign: 'right' }}><button onClick={() => handleDelete(post.id)} style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#EF4444', padding: '8px 12px', borderRadius: 8, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13 }}><Trash2 size={14} /> Delete</button></td>
              </tr>
            ))}
            {posts.length === 0 && <tr><td colSpan={5} style={{ padding: 48, textAlign: 'center', color: 'rgba(255,255,255,0.4)' }}>No blog posts yet</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}