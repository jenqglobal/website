import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Search, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface BlogPost { id: number; title: string; slug: string; excerpt: string; featured_image: string; category: string; author: string; published: number; created_at: string; }

const categories = ['All', 'Technology', 'Growth', 'Security', 'Case Studies'];
const defaultPosts: BlogPost[] = [
  { id: 1, title: 'Why Monthly Tech Support Beats Project-Based Work', slug: 'monthly-tech-support', excerpt: 'Discover why businesses are switching to ongoing partnership models.', featured_image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=400&fit=crop', category: 'Technology', author: 'Jonathan Chen', published: 1, created_at: '2024-01-15' },
  { id: 2, title: '5 Signs Your Business Needs Professional Tech Support', slug: '5-signs-tech-support', excerpt: 'Is your business struggling with technology issues?', featured_image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop', category: 'Growth', author: 'Qiang Patel', published: 1, created_at: '2024-01-10' },
  { id: 3, title: 'Protecting Your Business: Essential Security Measures', slug: 'business-security', excerpt: 'Learn the critical security steps every business should take.', featured_image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=400&fit=crop', category: 'Security', author: 'Qiang Patel', published: 1, created_at: '2024-01-05' },
  { id: 4, title: 'How Automation Saves 10+ Hours Every Week', slug: 'automation-saves-hours', excerpt: 'A real case study on how we helped a local business automate workflows.', featured_image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop', category: 'Case Studies', author: 'Jonathan Chen', published: 1, created_at: '2024-01-01' }
];

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>(defaultPosts);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => { loadPosts(); }, []);
  const loadPosts = async () => { try { const res = await axios.get('/api/blog'); if (res.data.length > 0) setPosts(res.data); } catch (err) { console.log('Using default posts'); } };

  const filteredPosts = posts.filter(post => { const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory; const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()); return matchesCategory && matchesSearch && post.published; });
  const featuredPost = filteredPosts[0];
  const recentPosts = filteredPosts.slice(1);
  const formatDate = (date: string) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const getReadTime = (content: string) => Math.max(1, Math.ceil((content?.split(' ').length || 500) / 200));

  return (
    <div className="min-h-screen bg-animated">
      <Header />

      <section style={{ paddingTop: 140, paddingBottom: 60, position: 'relative' }}>
        <div className="gradient-orb orb-purple" style={{ width: 400, height: 400, top: 0, left: 0 }}></div>
        <div className="container-main">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto' }}>
            <div className="badge" style={{ margin: '0 auto 32px', width: 'fit-content' }}><Sparkles size={14} /> Insights & Updates</div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, color: 'white', marginBottom: 24, lineHeight: 1.1 }}>Practical <span className="text-gradient">Wisdom</span></h1>
            <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>Insights for growing your business through better technology.</p>
          </motion.div>
        </div>
      </section>

      <section style={{ paddingBottom: 40 }}>
        <div className="container-main">
          <div style={{ display: 'flex', flexDirection: 'column', md: { flexDirection: 'row' }, gap: 16, alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
              {categories.map((cat) => <button key={cat} onClick={() => setSelectedCategory(cat)} className="category-pill" style={selectedCategory === cat ? { background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)', color: 'white' } : {}}>{cat}</button>)}
            </div>
            <div style={{ position: 'relative', width: '100%', maxWidth: 280 }}>
              <Search style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)' }} size={18} />
              <input type="text" placeholder="Search articles..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="input-glass" style={{ paddingLeft: 48 }} />
            </div>
          </div>
        </div>
      </section>

      {featuredPost && (
        <section style={{ paddingBottom: 60 }}>
          <div className="container-main">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card" style={{ padding: 8 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', lg: { gridTemplateColumns: '1fr 1fr' }, gap: 0 }}>
                <img src={featuredPost.featured_image || 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=400&fit=crop'} alt={featuredPost.title} style={{ width: '100%', height: '100%', maxHeight: 400, objectFit: 'cover', borderRadius: 16 }} />
                <div style={{ padding: 32, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <span style={{ display: 'inline-block', padding: '6px 12px', background: 'rgba(59,130,246,0.2)', color: '#60A5FA', fontSize: 12, fontWeight: 600, borderRadius: 100, width: 'fit-content', marginBottom: 16 }}>{featuredPost.category}</span>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white', marginBottom: 16, lineHeight: 1.3 }}>{featuredPost.title}</h2>
                  <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 20, lineHeight: 1.6 }}>{featuredPost.excerpt}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 24 }}><span>{formatDate(featuredPost.created_at)}</span><span>•</span><span>{getReadTime(featuredPost.excerpt)} min read</span></div>
                  <a href={`/blog/${featuredPost.slug}`} className="btn-primary" style={{ width: 'fit-content' }}>Read More <ArrowRight size={18} /></a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      <section style={{ padding: '60px 0 140px', background: 'rgba(0,0,0,0.3)' }}>
        <div className="container-main">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 48 }}><h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'white' }}>Recent Articles</h2></motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
            {recentPosts.map((post, index) => (
              <motion.div key={post.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} viewport={{ once: true }} className="glass-card" style={{ overflow: 'hidden', padding: 0 }}>
                <div style={{ height: 200, overflow: 'hidden' }}><img src={post.featured_image || 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=400&fit=crop'} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} /></div>
                <div style={{ padding: 24 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: '#60A5FA', padding: '4px 10px', borderRadius: 100, background: 'rgba(59,130,246,0.1)' }}>{post.category}</span>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'white', margin: '12px 0 8px', lineHeight: 1.3 }}>{post.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, marginBottom: 16, lineHeight: 1.5 }} className="line-clamp-2">{post.excerpt}</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12, color: 'rgba(255,255,255,0.4)' }}><span>{formatDate(post.created_at)}</span><span>{getReadTime(post.excerpt)} min</span></div>
                </div>
              </motion.div>
            ))}
          </div>
          {filteredPosts.length === 0 && <div style={{ textAlign: 'center', padding: 60, color: 'rgba(255,255,255,0.4)' }}>No articles found. Check back soon!</div>}
        </div>
      </section>

      <Footer />
    </div>
  );
}