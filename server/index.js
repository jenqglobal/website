const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

// PayPal SDK
const paypal = require('@paypal/checkout-server-sdk');

// Razorpay
const razorpay = require('razorpay');

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'jenq-global-secret-key-2024';

// Data directory - use RENDER_DISK_PATH if available (persistent disk), otherwise local
const dataDir = process.env.RENDER_DISK_PATH || __dirname;
const dbPath = path.join(dataDir, 'jenq.db');
const uploadsDir = path.join(dataDir, 'public/uploads');

// Ensure directories exist
if (!fs.existsSync(path.join(dataDir, 'public'))) {
  fs.mkdirSync(path.join(dataDir, 'public'), { recursive: true });
}
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Middleware
app.use(cors());
app.use(express.json());
app.set('trust proxy', true);
app.use('/uploads', express.static(uploadsDir));

// Serve frontend static files (go up one level from server/ to root)
const clientDistPath = path.join(__dirname, '../client/dist');
if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
}

// Database setup
const db = new Database(dbPath);

// Initialize database tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT NOT NULL,
    role TEXT DEFAULT 'admin',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    key TEXT UNIQUE NOT NULL,
    value TEXT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS pages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    content TEXT,
    meta_title TEXT,
    meta_description TEXT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS blog_posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT,
    excerpt TEXT,
    featured_image TEXT,
    category TEXT,
    author TEXT,
    published INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS inquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company TEXT,
    message TEXT,
    preferred_contact TEXT,
    status TEXT DEFAULT 'new',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS subscriptions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_email TEXT NOT NULL,
    stripe_customer_id TEXT,
    stripe_subscription_id TEXT,
    plan TEXT NOT NULL,
    status TEXT DEFAULT 'active',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS payments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    subscription_id INTEGER,
    amount INTEGER,
    currency TEXT DEFAULT 'usd',
    status TEXT DEFAULT 'succeeded',
    payment_method TEXT,
    payment_id TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (subscription_id) REFERENCES subscriptions(id)
  );

  CREATE TABLE IF NOT EXISTS chat_conversations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    visitor_name TEXT,
    visitor_email TEXT,
    visitor_phone TEXT,
    status TEXT DEFAULT 'open',
    assigned_to INTEGER,
    last_message TEXT,
    last_message_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS chat_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    conversation_id INTEGER NOT NULL,
    sender_type TEXT DEFAULT 'visitor',
    sender_id INTEGER,
    message TEXT NOT NULL,
    is_read INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (conversation_id) REFERENCES chat_conversations(id)
  );

  CREATE TABLE IF NOT EXISTS services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    features TEXT,
    icon TEXT,
    category TEXT,
    price INTEGER,
    featured INTEGER DEFAULT 0,
    order_index INTEGER DEFAULT 0,
    active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_number TEXT UNIQUE NOT NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    preferred_contact TEXT NOT NULL,
    plan TEXT NOT NULL,
    plan_price INTEGER NOT NULL,
    plan_tier TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    payment_method TEXT,
    payment_id TEXT,
    payment_status TEXT DEFAULT 'pending',
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS audit_reports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company TEXT,
    website TEXT NOT NULL,
    results TEXT,
    overall_score INTEGER,
    is_paid INTEGER DEFAULT 0,
    payment_id TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS page_visits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id TEXT,
    page_url TEXT NOT NULL,
    page_title TEXT,
    referrer TEXT,
    user_agent TEXT,
    ip_address TEXT,
    country TEXT,
    country_code TEXT,
    region TEXT,
    city TEXT,
    isp TEXT,
    latitude REAL,
    longitude REAL,
    device_type TEXT,
    browser TEXT,
    os TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// PayPal Environment setup
let paypalEnvironment = new paypal.core.SandboxEnvironment('', '');
let paypalClient = new paypal.core.PayPalHttpClient(paypalEnvironment);

// Razorpay instance
let razorpayClient = null;

// Default settings
const defaultSettings = [
  ['site_name', 'JenQ Global Solutions'],
  ['primary_color', '#3B82F6'],
  ['secondary_color', '#10B981'],
  ['accent_color', '#8B5CF6'],
  ['logo', ''],
  ['favicon', ''],
  ['contact_email', 'hello@jenqglobal.com'],
  ['contact_phone', '+1 (555) 123-4567'],
  ['contact_whatsapp', ''],
  ['address', '123 Business Ave, Suite 100, City, State 12345'],
  ['business_hours', 'Mon-Fri: 9AM-6PM EST'],
  ['facebook_url', 'https://facebook.com/jenqglobal'],
  ['linkedin_url', 'https://linkedin.com/company/jenqglobal'],
  ['twitter_url', 'https://twitter.com/jenqglobal'],
  ['stripe_public_key', ''],
  ['stripe_secret_key', ''],
  ['paypal_client_id', ''],
  ['paypal_client_secret', ''],
  ['paypal_mode', 'sandbox'],
  ['razorpay_key_id', ''],
  ['razorpay_key_secret', ''],
  ['smtp_host', ''],
  ['smtp_port', '587'],
  ['smtp_secure', 'false'],
  ['smtp_user', ''],
  ['smtp_password', ''],
  ['smtp_from_email', ''],
  ['smtp_from_name', 'JenQ Global Solutions'],
  ['notification_email', 'hello@jenqglobal.com'],
  ['enable_popup', 'true'],
  ['hero_title', 'Your Ongoing Tech & Growth Partner'],
  ['hero_subtitle', 'We maintain, improve, and guide your systems every month.'],
  ['cta_text', 'Book Free Audit'],
  ['cta_link', '/contact']
];

const insertSetting = db.prepare('INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)');
defaultSettings.forEach(([key, value]) => insertSetting.run(key, value));

// Email helper function
function getSmtpSettings() {
  const settings = {};
  const rows = db.prepare('SELECT key, value FROM settings').all();
  rows.forEach(row => settings[row.key] = row.value);
  return settings;
}

async function sendEmail({ to, subject, html }) {
  const settings = getSmtpSettings();
  
  if (!settings.smtp_host || !settings.smtp_user || !settings.smtp_password) {
    console.log('Email not sent: SMTP not configured');
    return false;
  }

  const transporter = nodemailer.createTransport({
    host: settings.smtp_host,
    port: parseInt(settings.smtp_port) || 587,
    secure: settings.smtp_secure === 'true',
    auth: {
      user: settings.smtp_user,
      pass: settings.smtp_password
    }
  });

  try {
    await transporter.sendMail({
      from: `"${settings.smtp_from_name || 'JenQ Global'}" <${settings.smtp_from_email || settings.smtp_user}>`,
      to,
      subject,
      html
    });
    console.log(`Email sent to ${to}`);
    return true;
  } catch (err) {
    console.error('Email error:', err);
    return false;
  }
}

// Create default admin from environment variables if provided
const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;
const adminName = process.env.ADMIN_NAME || 'Admin';

if (adminEmail && adminPassword) {
  const adminExists = db.prepare('SELECT id FROM users WHERE email = ?').get(adminEmail);
  if (!adminExists) {
    const passwordHash = bcrypt.hashSync(adminPassword, 10);
    db.prepare('INSERT INTO users (email, password_hash, name, role) VALUES (?, ?, ?, ?)').run(
      adminEmail, passwordHash, adminName, 'admin'
    );
    console.log('Admin user created from environment variables');
  }
}

// Default Services
const defaultServices = [
  { slug: 'website-maintenance', title: 'Website Maintenance & Management', description: 'Ongoing website updates, content changes, plugin management, and technical maintenance to keep your site running smoothly.', features: JSON.stringify(['Content Updates', 'Plugin Management', 'Performance Monitoring', 'Security Updates', 'Backup Management']), icon: 'Globe', category: 'maintenance', price: 299, featured: 1, order_index: 1 },
  { slug: 'mobile-app-support', title: 'Mobile App Maintenance & Support', description: 'Comprehensive mobile app support including updates, bug fixes, and performance optimization for iOS and Android platforms.', features: JSON.stringify(['App Store Updates', 'Bug Fixes', 'Performance Optimization', 'OS Compatibility', 'User Feedback Implementation']), icon: 'Smartphone', category: 'maintenance', price: 499, featured: 1, order_index: 2 },
  { slug: 'software-maintenance', title: 'Custom Software Maintenance', description: 'Keep your custom software running at peak performance with regular updates, enhancements, and technical support.', features: JSON.stringify(['Code Reviews', 'Performance Optimization', 'Feature Enhancements', 'Bug Fixes', 'Documentation Updates']), icon: 'Code', category: 'maintenance', price: 399, featured: 0, order_index: 3 },
  { slug: 'performance-monitoring', title: 'Performance Monitoring', description: 'Real-time monitoring and optimization to ensure your systems run at peak performance at all times.', features: JSON.stringify(['Real-time Monitoring', 'Speed Optimization', 'Load Testing', 'Resource Analysis', 'Performance Reports']), icon: 'Activity', category: 'monitoring', price: 199, featured: 0, order_index: 4 },
  { slug: 'security-monitoring', title: 'Security Monitoring', description: '24/7 security monitoring, threat detection, and patch management to protect your systems from vulnerabilities.', features: JSON.stringify(['Threat Detection', 'Security Patches', 'Vulnerability Scanning', 'Firewall Management', 'Security Audits']), icon: 'Shield', category: 'security', price: 299, featured: 1, order_index: 5 },
  { slug: 'bug-fixes', title: 'Bug Fixes & Stability', description: 'Rapid bug identification and resolution to maintain system stability and user satisfaction.', features: JSON.stringify(['Bug Identification', 'Quick Fixes', 'Regression Testing', 'Stability Monitoring', 'Issue Documentation']), icon: 'Bug', category: 'maintenance', price: 199, featured: 0, order_index: 6 },
  { slug: 'feature-enhancements', title: 'Feature Enhancements', description: 'Small feature additions and improvements to enhance your existing systems and user experience.', features: JSON.stringify(['Feature Development', 'UI Improvements', 'UX Enhancements', 'User Feedback Implementation', 'Rapid Deployment']), icon: 'Zap', category: 'development', price: 249, featured: 0, order_index: 7 },
  { slug: 'system-health', title: 'System Health Monitoring', description: 'Comprehensive health monitoring with detailed reporting on system status and performance metrics.', features: JSON.stringify(['Health Checks', 'Status Reporting', 'Alert Systems', 'Trend Analysis', 'Dashboard Access']), icon: 'Heart', category: 'monitoring', price: 149, featured: 0, order_index: 8 },
  { slug: 'technical-support', title: 'Technical Support', description: 'Dedicated technical support team available to help with any technology-related issues or questions.', features: JSON.stringify(['Priority Support', 'Expert Team', 'Multiple Channels', 'Quick Response', 'Technical Consulting']), icon: 'Headphones', category: 'support', price: 199, featured: 0, order_index: 9 },
  { slug: 'operations-dashboard', title: 'Operations Dashboard', description: 'Access to a centralized dashboard for tracking all your systems, tasks, and performance metrics in one place.', features: JSON.stringify(['Real-time Dashboard', 'Task Tracking', 'System Status', 'Performance Metrics', 'Activity Logs']), icon: 'LayoutDashboard', category: 'management', price: 149, featured: 0, order_index: 10 },
  { slug: 'task-tracking', title: 'Task Request & Tracking', description: 'Easy task submission and tracking system to manage all your ongoing work and requests efficiently.', features: JSON.stringify(['Easy Submission', 'Progress Tracking', 'Priority Management', 'Deadline Tracking', 'Communication Hub']), icon: 'CheckSquare', category: 'management', price: 99, featured: 0, order_index: 11 },
  { slug: 'performance-reports', title: 'Performance Reports', description: 'Monthly performance reports with detailed insights into system health, improvements, and recommendations.', features: JSON.stringify(['Monthly Reports', 'Performance Analysis', 'Recommendations', 'Trend Reports', 'Executive Summaries']), icon: 'FileText', category: 'reporting', price: 99, featured: 0, order_index: 12 },
  { slug: 'documentation', title: 'Documentation & Communication', description: 'Centralized documentation and communication tools for seamless collaboration and knowledge sharing.', features: JSON.stringify(['Knowledge Base', 'Document Management', 'Communication Hub', 'Version Control', 'Search Functionality']), icon: 'Book', category: 'management', price: 99, featured: 0, order_index: 13 },
  { slug: 'website-optimization', title: 'Website Optimization', description: 'Continuous website performance optimization to improve load times, user experience, and conversion rates.', features: JSON.stringify(['Speed Optimization', 'Image Optimization', 'Code Optimization', 'Core Web Vitals', 'User Experience']), icon: 'Gauge', category: 'optimization', price: 199, featured: 0, order_index: 14 },
  { slug: 'conversion-optimization', title: 'Conversion & UX Improvements', description: 'Data-driven improvements to increase conversions and enhance user experience across your platforms.', features: JSON.stringify(['A/B Testing', 'UX Analysis', 'Conversion Optimization', 'Heatmaps & Analytics', 'User Journey Mapping']), icon: 'TrendingUp', category: 'optimization', price: 249, featured: 0, order_index: 15 },
  { slug: 'analytics-setup', title: 'Analytics Setup & Review', description: 'Comprehensive analytics setup and regular reviews to track performance and make data-driven decisions.', features: JSON.stringify(['Analytics Setup', 'Goal Tracking', 'Regular Reviews', 'Custom Reports', 'Data Visualization']), icon: 'BarChart', category: 'analytics', price: 149, featured: 0, order_index: 16 },
  { slug: 'marketing-automation', title: 'Marketing Integration & Automation', description: 'Integration of marketing tools and automation to streamline your marketing workflows.', features: JSON.stringify(['Tool Integration', 'Workflow Automation', 'Email Automation', 'CRM Integration', 'Campaign Setup']), icon: 'Target', category: 'marketing', price: 299, featured: 0, order_index: 17 },
  { slug: 'campaign-monitoring', title: 'Campaign Monitoring', description: 'Ongoing monitoring and optimization of your marketing campaigns for maximum ROI.', features: JSON.stringify(['Campaign Tracking', 'ROI Analysis', 'Performance Optimization', 'A/B Testing', 'Weekly Reports']), icon: 'PieChart', category: 'marketing', price: 199, featured: 0, order_index: 18 },
  { slug: 'technical-advisory', title: 'Technical Advisory', description: 'Expert technical guidance and consulting to help you make informed technology decisions.', features: JSON.stringify(['Technology Consulting', 'Best Practices', 'Architecture Review', 'Risk Assessment', 'Strategic Planning']), icon: 'Lightbulb', category: 'advisory', price: 199, featured: 0, order_index: 19 },
  { slug: 'product-improvement', title: 'Product Improvement', description: 'Ongoing recommendations and implementation support for product improvements and innovations.', features: JSON.stringify(['Product Analysis', 'User Research', 'Improvement Roadmap', 'Implementation Support', 'Competitive Analysis']), icon: 'Package', category: 'advisory', price: 249, featured: 0, order_index: 20 },
  { slug: 'roadmap-guidance', title: 'Roadmap & Priority Guidance', description: 'Strategic planning support to help you prioritize features and plan your product roadmap effectively.', features: JSON.stringify(['Roadmap Planning', 'Priority Matrix', 'Resource Planning', 'Timeline Development', 'Milestone Tracking']), icon: 'Map', category: 'advisory', price: 199, featured: 0, order_index: 21 },
  { slug: 'tech-stack-review', title: 'Technology Stack Review', description: 'Regular reviews of your technology stack to ensure you are using the best tools for your needs.', features: JSON.stringify(['Tech Audit', 'Best Fit Analysis', 'Cost Optimization', 'Scalability Review', 'Modernization Plan']), icon: 'Layers', category: 'advisory', price: 149, featured: 0, order_index: 22 },
  { slug: 'strategy-reviews', title: 'Quarterly Strategy Reviews', description: 'Quarterly business and technology strategy reviews to align your tech investments with business goals.', features: JSON.stringify(['Quarterly Meetings', 'Business Alignment', 'Goal Review', 'Strategy Updates', 'Executive Reports']), icon: 'Calendar', category: 'advisory', price: 399, featured: 1, order_index: 23 }
];

const insertService = db.prepare('INSERT OR IGNORE INTO services (slug, title, description, features, icon, category, price, featured, order_index) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
defaultServices.forEach(s => insertService.run(s.slug, s.title, s.description, s.features, s.icon, s.category, s.price, s.featured, s.order_index));

// Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, 'public/uploads')),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Auth middleware
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// Routes

// Auth routes
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (!user || !bcrypt.compareSync(password, user.password_hash)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
});

// Settings routes
app.get('/api/settings', (req, res) => {
  const settings = db.prepare('SELECT key, value FROM settings').all();
  const result = {};
  settings.forEach(s => result[s.key] = s.value);
  res.json(result);
});

app.put('/api/settings', auth, (req, res) => {
  const updates = req.body;
  const stmt = db.prepare('INSERT OR REPLACE INTO settings (key, value, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP)');
  Object.entries(updates).forEach(([key, value]) => stmt.run(key, value));
  res.json({ success: true });
});

app.post('/api/settings/upload', auth, upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  const url = `/uploads/${req.file.filename}`;
  res.json({ url, filename: req.file.filename });
});

// Favicon upload route
app.post('/api/settings/favicon', auth, upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  const url = `/uploads/${req.file.filename}`;
  db.prepare('INSERT OR REPLACE INTO settings (key, value, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP)').run('favicon', url);
  res.json({ url });
});

// Pages routes
app.get('/api/pages', (req, res) => {
  const pages = db.prepare('SELECT * FROM pages').all();
  res.json(pages);
});

app.get('/api/pages/:slug', (req, res) => {
  const page = db.prepare('SELECT * FROM pages WHERE slug = ?').get(req.params.slug);
  if (!page) {
    return res.status(404).json({ error: 'Page not found' });
  }
  res.json(page);
});

app.post('/api/pages', auth, (req, res) => {
  const { slug, title, content, meta_title, meta_description } = req.body;
  db.prepare(`
    INSERT INTO pages (slug, title, content, meta_title, meta_description)
    VALUES (?, ?, ?, ?, ?)
    ON CONFLICT(slug) DO UPDATE SET
      title = excluded.title,
      content = excluded.content,
      meta_title = excluded.meta_title,
      meta_description = excluded.meta_description,
      updated_at = CURRENT_TIMESTAMP
  `).run(slug, title, JSON.stringify(content), meta_title, meta_description);
  res.json({ success: true });
});

// Blog routes
app.get('/api/blog', (req, res) => {
  const posts = db.prepare('SELECT * FROM blog_posts ORDER BY created_at DESC').all();
  res.json(posts);
});

app.get('/api/blog/:slug', (req, res) => {
  const post = db.prepare('SELECT * FROM blog_posts WHERE slug = ?').get(req.params.slug);
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }
  res.json(post);
});

app.post('/api/blog', auth, (req, res) => {
  const { title, slug, content, excerpt, featured_image, category, author, published } = req.body;
  db.prepare(`
    INSERT INTO blog_posts (title, slug, content, excerpt, featured_image, category, author, published)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(slug) DO UPDATE SET
      title = excluded.title,
      content = excluded.content,
      excerpt = excluded.excerpt,
      featured_image = excluded.featured_image,
      category = excluded.category,
      author = excluded.author,
      published = excluded.published,
      updated_at = CURRENT_TIMESTAMP
  `).run(title, slug, content, excerpt, featured_image, category, author, published ? 1 : 0);
  res.json({ success: true });
});

app.delete('/api/blog/:id', auth, (req, res) => {
  db.prepare('DELETE FROM blog_posts WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

// Inquiries routes
app.get('/api/inquiries', (req, res) => {
  const inquiries = db.prepare('SELECT * FROM inquiries ORDER BY created_at DESC').all();
  res.json(inquiries);
});

app.post('/api/inquiries', async (req, res) => {
  const { name, email, phone, company, message, preferred_contact } = req.body;
  db.prepare(`
    INSERT INTO inquiries (name, email, phone, company, message, preferred_contact)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(name, email, phone, company, message, preferred_contact);

  // Send email notification to admin
  const settings = getSmtpSettings();
  const notificationEmail = settings.notification_email || settings.contact_email;
  
  if (notificationEmail) {
    await sendEmail({
      to: notificationEmail,
      subject: `New Inquiry from ${name}`,
      html: `
        <h2>New Inquiry Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Company:</strong> ${company || 'Not provided'}</p>
        <p><strong>Preferred Contact:</strong> ${preferred_contact}</p>
        <h3>Message:</h3>
        <p>${message}</p>
      `
    });
  }

  res.json({ success: true });
});

app.put('/api/inquiries/:id', auth, (req, res) => {
  const { status } = req.body;
  db.prepare('UPDATE inquiries SET status = ? WHERE id = ?').run(status, req.params.id);
  res.json({ success: true });
});

app.delete('/api/inquiries/:id', auth, (req, res) => {
  db.prepare('DELETE FROM inquiries WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

// Subscriptions routes
app.get('/api/subscriptions', (req, res) => {
  const subscriptions = db.prepare('SELECT * FROM subscriptions ORDER BY created_at DESC').all();
  res.json(subscriptions);
});

// Legacy Stripe subscription route (deprecated)
app.post('/api/subscriptions', async (req, res) => {
  const { email, plan } = req.body;
  res.status(400).json({ error: 'Please use the new payment endpoints (/api/payments/razorpay or /api/payments/paypal)' });
});

// Stats for dashboard
app.get('/api/stats', auth, (req, res) => {
  const totalInquiries = db.prepare('SELECT COUNT(*) as count FROM inquiries').get().count;
  const newInquiries = db.prepare("SELECT COUNT(*) as count FROM inquiries WHERE status = 'new'").get().count;
  const totalSubscriptions = db.prepare('SELECT COUNT(*) as count FROM subscriptions').get().count;
  const activeSubscriptions = db.prepare("SELECT COUNT(*) as count FROM subscriptions WHERE status = 'active'").get().count;

  res.json({
    totalInquiries,
    newInquiries,
    totalSubscriptions,
    activeSubscriptions
  });
});

// ==================== VISITOR ANALYTICS API ====================

// Get visitor stats summary
app.get('/api/visitors/stats', auth, (req, res) => {
  try {
    const totalVisits = db.prepare('SELECT COUNT(*) as count FROM page_visits').get().count;
    const uniqueVisitors = db.prepare('SELECT COUNT(DISTINCT session_id) as count FROM page_visits').get().count;
    const todayVisits = db.prepare("SELECT COUNT(*) as count FROM page_visits WHERE DATE(created_at) = DATE('now')").get().count;
    const todayUnique = db.prepare("SELECT COUNT(DISTINCT session_id) as count FROM page_visits WHERE DATE(created_at) = DATE('now')").get().count;

    const thisWeek = db.prepare("SELECT COUNT(*) as count FROM page_visits WHERE created_at >= DATE('now', '-7 days')").get().count;
    const thisMonth = db.prepare("SELECT COUNT(*) as count FROM page_visits WHERE created_at >= DATE('now', '-30 days')").get().count;

    res.json({
      totalVisits,
      uniqueVisitors,
      todayVisits,
      todayUnique,
      thisWeek,
      thisMonth
    });
  } catch (error) {
    console.error('Visitor stats error:', error);
    res.status(500).json({ error: 'Failed to get visitor stats' });
  }
});

// Visitor tracking endpoint (used by frontend React app)
app.post('/api/track/pageview', async (req, res) => {
  try {
    const { pageUrl, pageTitle, sessionId, geoData } = req.body;

    const visitorSessionId = sessionId || crypto.randomUUID();
    const referrer = req.headers.referer || '';
    const userAgent = req.headers['user-agent'] || '';
    let clientIp = req.ip || req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.connection?.remoteAddress || '';

    let deviceType = 'desktop';
    if (/mobile|android|iphone/i.test(userAgent)) deviceType = 'mobile';
    else if (/tablet|ipad/i.test(userAgent)) deviceType = 'tablet';

    let browser = 'Unknown';
    if (/chrome/i.test(userAgent) && !/edge/i.test(userAgent)) browser = 'Chrome';
    else if (/firefox/i.test(userAgent)) browser = 'Firefox';
    else if (/safari/i.test(userAgent) && !/chrome/i.test(userAgent)) browser = 'Safari';
    else if (/edge/i.test(userAgent)) browser = 'Edge';

    let os = 'Unknown';
    if (/windows/i.test(userAgent)) os = 'Windows';
    else if (/mac/i.test(userAgent)) os = 'macOS';
    else if (/linux/i.test(userAgent)) os = 'Linux';
    else if (/android/i.test(userAgent)) os = 'Android';
    else if (/ios|iphone|ipad/i.test(userAgent)) os = 'iOS';

    let country = 'Unknown';
    let countryCode = 'XX';
    let region = '';
    let city = '';
    let latitude = null;
    let longitude = null;

    // Use browser geolocation if provided (more accurate)
    if (geoData && geoData.latitude && geoData.longitude) {
      latitude = geoData.latitude;
      longitude = geoData.longitude;
      city = geoData.city || '';
      region = geoData.region || '';
      country = geoData.country || 'Unknown';
      countryCode = geoData.countryCode || 'XX';
    } else {
      // Try to get location from IP
      const cleanIp = clientIp.replace(/^::ffff:/, '').trim();
      const isPrivateIp = cleanIp && (
        cleanIp === '127.0.0.1' ||
        cleanIp === '::1' ||
        cleanIp.startsWith('192.168.') ||
        cleanIp.startsWith('10.') ||
        cleanIp.startsWith('172.') ||
        cleanIp.startsWith('localhost')
      );

      if (cleanIp && !isPrivateIp) {
        try {
          const geoResponse = await fetch(`https://ipapi.co/${cleanIp}/json/`);
          if (geoResponse.ok) {
            const geoData = await geoResponse.json();
            if (!geoData.error) {
              country = geoData.country_name || geoData.country || 'Unknown';
              countryCode = geoData.country_code || 'XX';
              region = geoData.region || '';
              city = geoData.city || '';
              latitude = geoData.latitude || null;
              longitude = geoData.longitude || null;
            }
          }
        } catch (geoError) {
          console.log('GeoIP lookup failed:', geoError.message);
        }
      } else {
        console.log('Skipping GeoIP - private IP or empty:', cleanIp);
      }
    }

    db.prepare(`
      INSERT INTO page_visits (session_id, page_url, page_title, referrer, user_agent, ip_address, country, country_code, region, city, latitude, longitude, device_type, browser, os)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      visitorSessionId,
      pageUrl || req.path,
      pageTitle || '',
      referrer,
      userAgent,
      clientIp,
      country,
      countryCode,
      region,
      city,
      latitude,
      longitude,
      deviceType,
      browser,
      os
    );

    res.json({ success: true, sessionId: visitorSessionId });
  } catch (error) {
    console.error('Pageview tracking error:', error);
    res.status(500).json({ error: 'Failed to track pageview' });
  }
});

// Get visitor data by location
app.get('/api/visitors/locations', auth, (req, res) => {
  try {
    const locations = db.prepare(`
      SELECT
        country,
        country_code,
        COUNT(*) as visits,
        COUNT(DISTINCT session_id) as unique_visitors
      FROM page_visits
      GROUP BY COALESCE(country, 'Unknown')
      ORDER BY visits DESC
      LIMIT 50
    `).all();

    res.json(locations);
  } catch (error) {
    console.error('Visitor locations error:', error);
    res.status(500).json({ error: 'Failed to get visitor locations' });
  }
});

// Get visitor data by page
app.get('/api/visitors/pages', auth, (req, res) => {
  try {
    const pages = db.prepare(`
      SELECT
        page_url,
        page_title,
        COUNT(*) as views,
        COUNT(DISTINCT session_id) as unique_views
      FROM page_visits
      GROUP BY page_url
      ORDER BY views DESC
      LIMIT 50
    `).all();

    res.json(pages);
  } catch (error) {
    console.error('Visitor pages error:', error);
    res.status(500).json({ error: 'Failed to get visitor pages' });
  }
});

// Get visitor data by device/browser
app.get('/api/visitors/devices', auth, (req, res) => {
  try {
    const devices = db.prepare(`
      SELECT
        device_type,
        browser,
        os,
        COUNT(*) as visits,
        COUNT(DISTINCT session_id) as unique_visitors
      FROM page_visits
      GROUP BY device_type, browser, os
      ORDER BY visits DESC
    `).all();

    res.json(devices);
  } catch (error) {
    console.error('Visitor devices error:', error);
    res.status(500).json({ error: 'Failed to get visitor devices' });
  }
});

// Get visitor trends (daily data for last 30 days)
app.get('/api/visitors/trends', auth, (req, res) => {
  try {
    const trends = db.prepare(`
      SELECT
        DATE(created_at) as date,
        COUNT(*) as visits,
        COUNT(DISTINCT session_id) as unique_visitors
      FROM page_visits
      WHERE created_at >= DATE('now', '-30 days')
      GROUP BY DATE(created_at)
      ORDER BY date ASC
    `).all();

    res.json(trends);
  } catch (error) {
    console.error('Visitor trends error:', error);
    res.status(500).json({ error: 'Failed to get visitor trends' });
  }
});

// Get recent visitors list
app.get('/api/visitors/recent', auth, (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const recent = db.prepare(`
      SELECT
        id,
        session_id,
        page_url,
        page_title,
        country,
        country_code,
        city,
        device_type,
        browser,
        os,
        referrer,
        created_at
      FROM page_visits
      ORDER BY created_at DESC
      LIMIT ?
    `).all(limit);

    res.json(recent);
  } catch (error) {
    console.error('Recent visitors error:', error);
    res.status(500).json({ error: 'Failed to get recent visitors' });
  }
});

// Get referrers
app.get('/api/visitors/referrers', auth, (req, res) => {
  try {
    const referrers = db.prepare(`
      SELECT
        referrer,
        COUNT(*) as visits,
        COUNT(DISTINCT session_id) as unique_visitors
      FROM page_visits
      WHERE referrer IS NOT NULL AND referrer != ''
      GROUP BY referrer
      ORDER BY visits DESC
      LIMIT 20
    `).all();

    res.json(referrers);
  } catch (error) {
    console.error('Visitor referrers error:', error);
    res.status(500).json({ error: 'Failed to get visitor referrers' });
  }
});

// Stripe webhook (deprecated - kept for reference)
// Use Razorpay or PayPal webhooks instead
app.post('/api/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  res.status(410).json({ error: 'This endpoint is deprecated. Please use PayPal or Razorpay webhooks.' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Services Routes
app.get('/api/services', (req, res) => {
  const services = db.prepare('SELECT * FROM services WHERE active = 1 ORDER BY order_index ASC').all();
  const result = services.map(s => ({ ...s, features: JSON.parse(s.features || '[]') }));
  res.json(result);
});

app.get('/api/services/:slug', (req, res) => {
  const service = db.prepare('SELECT * FROM services WHERE slug = ? AND active = 1').get(req.params.slug);
  if (!service) return res.status(404).json({ error: 'Service not found' });
  res.json({ ...service, features: JSON.parse(service.features || '[]') });
});

app.put('/api/services/:id', auth, (req, res) => {
  const { title, description, features, icon, category, price, featured, order_index, active } = req.body;
  db.prepare(`
    UPDATE services SET title = ?, description = ?, features = ?, icon = ?, category = ?, price = ?, featured = ?, order_index = ?, active = ?
    WHERE id = ?
  `).run(title, description, JSON.stringify(features), icon, category, price, featured || 0, order_index || 0, active !== undefined ? active : 1, req.params.id);
  res.json({ success: true });
});

// Payment Routes - Razorpay
app.post('/api/payments/razorpay/order', async (req, res) => {
  const { serviceId, customerEmail, customerName } = req.body;
  
  const razorpayKeyId = db.prepare('SELECT value FROM settings WHERE key = ?').get('razorpay_key_id')?.value;
  const razorpayKeySecret = db.prepare('SELECT value FROM settings WHERE key = ?').get('razorpay_key_secret')?.value;
  
  if (!razorpayKeyId || !razorpayKeySecret) {
    return res.status(400).json({ error: 'Razorpay not configured' });
  }
  
  try {
    const service = db.prepare('SELECT * FROM services WHERE id = ?').get(serviceId);
    if (!service) return res.status(404).json({ error: 'Service not found' });
    
    const Razorpay = require('razorpay');
    const razorpay = new Razorpay({
      key_id: razorpayKeyId,
      key_secret: razorpayKeySecret
    });
    
    const options = {
      amount: service.price * 100,
      currency: 'USD',
      receipt: 'order_' + Date.now(),
      notes: {
        serviceId: serviceId,
        customerEmail: customerEmail,
        customerName: customerName
      }
    };
    
    const order = await razorpay.orders.create(options);
    
    res.json({
      orderId: order.id,
      keyId: razorpayKeyId,
      amount: order.amount,
      currency: order.currency,
      service: { id: service.id, title: service.title, price: service.price }
    });
  } catch (error) {
    console.error('Razorpay error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/payments/razorpay/verify', async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, serviceId, customerEmail } = req.body;
  
  const razorpayKeySecret = db.prepare('SELECT value FROM settings WHERE key = ?').get('razorpay_key_secret')?.value;
  
  if (!razorpayKeySecret) {
    return res.status(400).json({ error: 'Razorpay not configured' });
  }
  
  const crypto = require('crypto');
  const generated_signature = crypto.createHmac('sha256', razorpayKeySecret).update(razorpay_order_id + '|' + razorpay_payment_id).digest('hex');
  
  if (generated_signature === razorpay_signature) {
    const service = db.prepare('SELECT * FROM services WHERE id = ?').get(serviceId);
    
    db.prepare(`
      INSERT INTO subscriptions (customer_email, plan, status)
      VALUES (?, ?, 'active')
    `).run(customerEmail, service?.title || 'service');
    
    db.prepare(`
      INSERT INTO payments (amount, currency, status, payment_method, payment_id)
      VALUES (?, 'usd', 'succeeded', 'razorpay', ?)
    `).run(service?.price || 0, razorpay_payment_id);
    
    // Send email notification to admin
    const settings = getSmtpSettings();
    const notificationEmail = settings.notification_email || settings.contact_email;
    
    if (notificationEmail) {
      await sendEmail({
        to: notificationEmail,
        subject: `New Payment Received - ${service?.title || 'Service'}`,
        html: `
          <h2>New Payment Successful</h2>
          <p><strong>Service:</strong> ${service?.title || 'Service'}</p>
          <p><strong>Amount:</strong> $${service?.price || 0}</p>
          <p><strong>Customer Email:</strong> ${customerEmail}</p>
          <p><strong>Payment Method:</strong> Razorpay</p>
          <p><strong>Payment ID:</strong> ${razorpay_payment_id}</p>
        `
      });
    }
    
    res.json({ success: true });
  } else {
    res.status(400).json({ error: 'Payment verification failed' });
  }
});

// Payment Routes - PayPal
app.post('/api/payments/paypal/create-order', async (req, res) => {
  const { serviceId, customerEmail } = req.body;
  
  const paypalClientId = db.prepare('SELECT value FROM settings WHERE key = ?').get('paypal_client_id')?.value;
  const paypalClientSecret = db.prepare('SELECT value FROM settings WHERE key = ?').get('paypal_client_secret')?.value;
  const paypalMode = db.prepare('SELECT value FROM settings WHERE key = ?').get('paypal_mode')?.value || 'sandbox';
  
  if (!paypalClientId || !paypalClientSecret) {
    return res.status(400).json({ error: 'PayPal not configured' });
  }
  
  try {
    const service = db.prepare('SELECT * FROM services WHERE id = ?').get(serviceId);
    if (!service) return res.status(404).json({ error: 'Service not found' });
    
    const paypalEnvironment = paypalMode === 'live' 
      ? new paypal.core.LiveEnvironment(paypalClientId, paypalClientSecret)
      : new paypal.core.SandboxEnvironment(paypalClientId, paypalClientSecret);
    const paypalClient = new paypal.core.PayPalHttpClient(paypalEnvironment);
    
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer('return=representation');
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: 'USD',
          value: service.price.toString()
        },
        description: service.title,
        custom_id: JSON.stringify({ serviceId, customerEmail })
      }]
    });
    
    const order = await paypalClient.execute(request);
    
    const paypalBaseUrl = paypalMode === 'live'
      ? 'https://www.paypal.com'
      : 'https://www.sandbox.paypal.com';

    res.json({
      orderId: order.result.id,
      paypalUrl: `${paypalBaseUrl}/checkoutnow?token=${order.result.id}`,
      amount: service.price,
      service: { id: service.id, title: service.title, price: service.price }
    });
  } catch (error) {
    console.error('PayPal error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/payments/paypal/capture-order', async (req, res) => {
  const { orderId, customerEmail } = req.body;
  
  const paypalClientId = db.prepare('SELECT value FROM settings WHERE key = ?').get('paypal_client_id')?.value;
  const paypalClientSecret = db.prepare('SELECT value FROM settings WHERE key = ?').get('paypal_client_secret')?.value;
  const paypalMode = db.prepare('SELECT value FROM settings WHERE key = ?').get('paypal_mode')?.value || 'sandbox';
  
  if (!paypalClientId || !paypalClientSecret) {
    return res.status(400).json({ error: 'PayPal not configured' });
  }
  
  try {
    const paypalEnvironment = paypalMode === 'live'
      ? new paypal.core.LiveEnvironment(paypalClientId, paypalClientSecret)
      : new paypal.core.SandboxEnvironment(paypalClientId, paypalClientSecret);
    const paypalClient = new paypal.core.PayPalHttpClient(paypalEnvironment);
    
    const request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.prefer('return=representation');
    request.requestBody({});
    
    const capture = await paypalClient.execute(request);
    
    let serviceId = 0;
    let serviceTitle = 'service';
    let servicePrice = 0;
    try {
      const customData = JSON.parse(capture.result.purchase_units[0].description);
      serviceId = customData.serviceId;
      const service = db.prepare('SELECT * FROM services WHERE id = ?').get(serviceId);
      if (service) {
        serviceTitle = service.title;
        servicePrice = service.price;
        db.prepare(`
          INSERT INTO subscriptions (customer_email, plan, status)
          VALUES (?, ?, 'active')
        `).run(customerEmail || customData.customerEmail, serviceTitle);
        
        db.prepare(`
          INSERT INTO payments (amount, currency, status, payment_method, payment_id)
          VALUES (?, 'usd', 'succeeded', 'paypal', ?)
        `).run(service.price, orderId);
        
        // Send email notification to admin
        const settings = getSmtpSettings();
        const notificationEmail = settings.notification_email || settings.contact_email;
        
        if (notificationEmail) {
          await sendEmail({
            to: notificationEmail,
            subject: `New Payment Received - ${serviceTitle}`,
            html: `
              <h2>New Payment Successful</h2>
              <p><strong>Service:</strong> ${serviceTitle}</p>
              <p><strong>Amount:</strong> $${servicePrice}</p>
              <p><strong>Customer Email:</strong> ${customerEmail || customData.customerEmail}</p>
              <p><strong>Payment Method:</strong> PayPal</p>
              <p><strong>Order ID:</strong> ${orderId}</p>
            `
          });
        }
      }
    } catch (e) {
      console.error('Error processing PayPal capture:', e);
    }
    
    res.json({ success: true, capture: capture.result });
  } catch (error) {
    console.error('PayPal capture error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get payment config for frontend
app.get('/api/payments/config', (req, res) => {
  const razorpayKeyId = db.prepare('SELECT value FROM settings WHERE key = ?').get('razorpay_key_id')?.value;
  const paypalClientId = db.prepare('SELECT value FROM settings WHERE key = ?').get('paypal_client_id')?.value;
  
  res.json({
    razorpay: razorpayKeyId ? { keyId: razorpayKeyId } : null,
    paypal: paypalClientId ? { clientId: paypalClientId } : null
  });
});

// ==================== CHECKOUT/ORDERS API ====================

// Get all orders (admin)
app.get('/api/orders', auth, (req, res) => {
  const orders = db.prepare('SELECT * FROM orders ORDER BY created_at DESC').all();
  res.json(orders);
});

// Get single order
app.get('/api/orders/:id', auth, (req, res) => {
  const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(req.params.id);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.json(order);
});

// Create new order (checkout step 1 - user details)
app.post('/api/orders', (req, res) => {
  const { customer_name, customer_email, customer_phone, preferred_contact, plan, plan_price, plan_tier, notes } = req.body;
  
  if (!customer_name || !customer_email || !customer_phone || !preferred_contact || !plan) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  
  const orderNumber = 'JENQ-' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 6).toUpperCase();
  
  try {
    const result = db.prepare(`
      INSERT INTO orders (order_number, customer_name, customer_email, customer_phone, preferred_contact, plan, plan_price, plan_tier, notes, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
    `).run(orderNumber, customer_name, customer_email, customer_phone, preferred_contact, plan, plan_price, plan_tier, notes || '');
    
    res.json({ 
      success: true, 
      orderId: result.lastInsertRowid,
      orderNumber,
      order: {
        id: result.lastInsertRowid,
        order_number: orderNumber,
        customer_name,
        customer_email,
        customer_phone,
        preferred_contact,
        plan,
        plan_price,
        plan_tier,
        status: 'pending'
      }
    });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Update order payment status (after successful payment)
app.put('/api/orders/:id/payment', (req, res) => {
  const { payment_method, payment_id, payment_status, status } = req.body;
  
  try {
    db.prepare(`
      UPDATE orders 
      SET payment_method = ?, payment_id = ?, payment_status = ?, status = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(payment_method, payment_id, payment_status || 'completed', status || 'completed', req.params.id);
    
    res.json({ success: true });
  } catch (error) {
    console.error('Payment update error:', error);
    res.status(500).json({ error: 'Failed to update payment' });
  }
});

// Update order status (admin)
app.put('/api/orders/:id/status', auth, (req, res) => {
  const { status } = req.body;
  db.prepare('UPDATE orders SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(status, req.params.id);
  res.json({ success: true });
});

// Delete order (admin)
app.delete('/api/orders/:id', auth, (req, res) => {
  db.prepare('DELETE FROM orders WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

// ==================== SUBSCRIPTION CHECKOUT WITH RAZORPAY ====================

app.post('/api/checkout/razorpay/create-order', async (req, res) => {
  const { orderId, customerName, customerEmail, customerPhone, preferredContact, plan, planPrice, planTier } = req.body;
  
  const razorpayKeyId = db.prepare('SELECT value FROM settings WHERE key = ?').get('razorpay_key_id')?.value;
  const razorpayKeySecret = db.prepare('SELECT value FROM settings WHERE key = ?').get('razorpay_key_secret')?.value;
  
  if (!razorpayKeyId || !razorpayKeySecret) {
    return res.status(400).json({ error: 'Razorpay not configured. Please configure payment settings in admin.' });
  }
  
  try {
    const Razorpay = require('razorpay');
    const razorpay = new Razorpay({
      key_id: razorpayKeyId,
      key_secret: razorpayKeySecret
    });
    
    const options = {
      amount: planPrice * 100,
      currency: 'USD',
      receipt: 'order_' + Date.now(),
      notes: {
        orderId: orderId,
        plan: plan,
        planTier: planTier,
        customerName: customerName,
        customerEmail: customerEmail,
        customerPhone: customerPhone,
        preferredContact: preferredContact
      }
    };
    
    const order = await razorpay.orders.create(options);
    
    res.json({
      orderId: order.id,
      keyId: razorpayKeyId,
      amount: order.amount,
      currency: order.currency
    });
  } catch (error) {
    console.error('Razorpay checkout error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/checkout/razorpay/verify', async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;
  
  const razorpayKeySecret = db.prepare('SELECT value FROM settings WHERE key = ?').get('razorpay_key_secret')?.value;
  
  if (!razorpayKeySecret) {
    return res.status(400).json({ error: 'Razorpay not configured' });
  }
  
  const generated_signature = crypto.createHmac('sha256', razorpayKeySecret).update(razorpay_order_id + '|' + razorpay_payment_id).digest('hex');
  
  if (generated_signature === razorpay_signature) {
    const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(orderId);
    
    if (order) {
      db.prepare(`
        UPDATE orders 
        SET payment_method = 'razorpay', payment_id = ?, payment_status = 'completed', status = 'completed', updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `).run(razorpay_payment_id, orderId);
      
      db.prepare(`
        INSERT INTO subscriptions (customer_email, plan, status)
        VALUES (?, ?, 'active')
      `).run(order.customer_email, order.plan);
      
      db.prepare(`
        INSERT INTO payments (subscription_id, amount, currency, status, payment_method, payment_id)
        VALUES ((SELECT id FROM subscriptions ORDER BY id DESC LIMIT 1), ?, 'usd', 'succeeded', 'razorpay', ?)
      `).run(order.plan_price, razorpay_payment_id);
      
      const settings = getSmtpSettings();
      const notificationEmail = settings.notification_email || settings.contact_email;
      
      if (notificationEmail) {
        await sendEmail({
          to: notificationEmail,
          subject: `New Subscription Order - ${order.plan} (${order.plan_tier})`,
          html: `
            <h2>New Subscription Order Completed</h2>
            <h3>Order Details</h3>
            <p><strong>Order Number:</strong> ${order.order_number}</p>
            <p><strong>Plan:</strong> ${order.plan} (${order.plan_tier})</p>
            <p><strong>Amount:</strong> $${order.plan_price}/month</p>
            <p><strong>Payment Status:</strong> Completed</p>
            <p><strong>Payment Method:</strong> Razorpay</p>
            
            <h3>Customer Details</h3>
            <p><strong>Name:</strong> ${order.customer_name}</p>
            <p><strong>Email:</strong> ${order.customer_email}</p>
            <p><strong>Phone:</strong> ${order.customer_phone}</p>
            <p><strong>Preferred Contact:</strong> ${order.preferred_contact}</p>
            ${order.notes ? `<p><strong>Notes:</strong> ${order.notes}</p>` : ''}
          `
        });
      }
      
      res.json({ success: true, orderNumber: order.order_number });
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } else {
    res.status(400).json({ error: 'Payment verification failed' });
  }
});

// ==================== SUBSCRIPTION CHECKOUT WITH PAYPAL ====================

app.post('/api/checkout/paypal/create-order', async (req, res) => {
  const { orderId, customerName, customerEmail, customerPhone, preferredContact, plan, planPrice, planTier } = req.body;
  
  const paypalClientId = db.prepare('SELECT value FROM settings WHERE key = ?').get('paypal_client_id')?.value;
  const paypalClientSecret = db.prepare('SELECT value FROM settings WHERE key = ?').get('paypal_client_secret')?.value;
  const paypalMode = db.prepare('SELECT value FROM settings WHERE key = ?').get('paypal_mode')?.value || 'sandbox';
  
  if (!paypalClientId || !paypalClientSecret) {
    return res.status(400).json({ error: 'PayPal not configured. Please configure payment settings in admin.' });
  }
  
  try {
    const paypalEnvironment = paypalMode === 'live'
      ? new paypal.core.LiveEnvironment(paypalClientId, paypalClientSecret)
      : new paypal.core.SandboxEnvironment(paypalClientId, paypalClientSecret);
    const paypalClient = new paypal.core.PayPalHttpClient(paypalEnvironment);
    
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer('return=representation');
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: 'USD',
          value: planPrice.toString()
        },
        description: `${plan} (${planTier}) - Monthly Subscription`,
        custom_id: JSON.stringify({ orderId, plan, planTier, customerName, customerEmail, customerPhone, preferredContact })
      }]
    });
    
    const paypalOrder = await paypalClient.execute(request);
    
    const paypalBaseUrl = paypalMode === 'live'
      ? 'https://www.paypal.com'
      : 'https://www.sandbox.paypal.com';

    res.json({
      orderId: paypalOrder.result.id,
      paypalUrl: `${paypalBaseUrl}/checkoutnow?token=${paypalOrder.result.id}`,
      amount: planPrice
    });
  } catch (error) {
    console.error('PayPal checkout error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/checkout/paypal/capture-order', async (req, res) => {
  const { paypalOrderId, orderId } = req.body;
  
  const paypalClientId = db.prepare('SELECT value FROM settings WHERE key = ?').get('paypal_client_id')?.value;
  const paypalClientSecret = db.prepare('SELECT value FROM settings WHERE key = ?').get('paypal_client_secret')?.value;
  const paypalMode = db.prepare('SELECT value FROM settings WHERE key = ?').get('paypal_mode')?.value || 'sandbox';
  
  if (!paypalClientId || !paypalClientSecret) {
    return res.status(400).json({ error: 'PayPal not configured' });
  }
  
  try {
    const paypalEnvironment = paypalMode === 'live'
      ? new paypal.core.LiveEnvironment(paypalClientId, paypalClientSecret)
      : new paypal.core.SandboxEnvironment(paypalClientId, paypalClientSecret);
    const paypalClient = new paypal.core.PayPalHttpClient(paypalEnvironment);
    
    const request = new paypal.orders.OrdersCaptureRequest(paypalOrderId);
    request.prefer('return=representation');
    request.requestBody({});
    
    const capture = await paypalClient.execute(request);
    
    const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(orderId);
    
    if (order) {
      db.prepare(`
        UPDATE orders 
        SET payment_method = 'paypal', payment_id = ?, payment_status = 'completed', status = 'completed', updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `).run(paypalOrderId, orderId);
      
      db.prepare(`
        INSERT INTO subscriptions (customer_email, plan, status)
        VALUES (?, ?, 'active')
      `).run(order.customer_email, order.plan);
      
      db.prepare(`
        INSERT INTO payments (subscription_id, amount, currency, status, payment_method, payment_id)
        VALUES ((SELECT id FROM subscriptions ORDER BY id DESC LIMIT 1), ?, 'usd', 'succeeded', 'paypal', ?)
      `).run(order.plan_price, paypalOrderId);
      
      const settings = getSmtpSettings();
      const notificationEmail = settings.notification_email || settings.contact_email;
      
      if (notificationEmail) {
        await sendEmail({
          to: notificationEmail,
          subject: `New Subscription Order - ${order.plan} (${order.plan_tier})`,
          html: `
            <h2>New Subscription Order Completed</h2>
            <h3>Order Details</h3>
            <p><strong>Order Number:</strong> ${order.order_number}</p>
            <p><strong>Plan:</strong> ${order.plan} (${order.plan_tier})</p>
            <p><strong>Amount:</strong> $${order.plan_price}/month</p>
            <p><strong>Payment Status:</strong> Completed</p>
            <p><strong>Payment Method:</strong> PayPal</p>
            
            <h3>Customer Details</h3>
            <p><strong>Name:</strong> ${order.customer_name}</p>
            <p><strong>Email:</strong> ${order.customer_email}</p>
            <p><strong>Phone:</strong> ${order.customer_phone}</p>
            <p><strong>Preferred Contact:</strong> ${order.preferred_contact}</p>
            ${order.notes ? `<p><strong>Notes:</strong> ${order.notes}</p>` : ''}
          `
        });
      }
      
      res.json({ success: true, orderNumber: order.order_number });
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    console.error('PayPal capture error:', error);
    res.status(500).json({ error: error.message });
  }
});

// ==================== CHAT WIDGET API ====================

app.post('/api/chat/start', (req, res) => {
  const { name, email, phone, message } = req.body;
  
  try {
    const result = db.prepare(`
      INSERT INTO chat_conversations (visitor_name, visitor_email, visitor_phone, last_message, last_message_at, status)
      VALUES (?, ?, ?, ?, datetime('now'), 'open')
    `).run(name, email, phone, message);

    const conversationId = result.lastInsertRowid;

    if (message) {
      db.prepare(`
        INSERT INTO chat_messages (conversation_id, sender_type, message)
        VALUES (?, 'visitor', ?)
      `).run(conversationId, message);
    }

    res.json({ 
      success: true, 
      conversationId,
      message: 'Conversation started'
    });
  } catch (error) {
    console.error('Chat start error:', error);
    res.status(500).json({ error: 'Failed to start conversation' });
  }
});

app.post('/api/chat/message', (req, res) => {
  const { conversationId, message, senderType = 'visitor', senderId } = req.body;
  
  try {
    db.prepare(`
      INSERT INTO chat_messages (conversation_id, sender_type, sender_id, message)
      VALUES (?, ?, ?, ?)
    `).run(conversationId, senderType, senderId, message);

    db.prepare(`
      UPDATE chat_conversations 
      SET last_message = ?, last_message_at = datetime('now')
      WHERE id = ?
    `).run(message, conversationId);

    res.json({ success: true });
  } catch (error) {
    console.error('Chat message error:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

app.get('/api/chat/messages/:conversationId', (req, res) => {
  const { conversationId } = req.params;
  
  try {
    const messages = db.prepare(`
      SELECT * FROM chat_messages 
      WHERE conversation_id = ?
      ORDER BY created_at ASC
    `).all(conversationId);

    db.prepare(`UPDATE chat_messages SET is_read = 1 WHERE conversation_id = ?`).run(conversationId);

    res.json(messages);
  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({ error: 'Failed to get messages' });
  }
});

app.get('/api/chat/conversations', (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const conversations = db.prepare(`
      SELECT * FROM chat_conversations 
      ORDER BY last_message_at DESC
    `).all();

    res.json(conversations);
  } catch (error) {
    console.error('Get conversations error:', error);
    res.status(500).json({ error: 'Failed to get conversations' });
  }
});

app.put('/api/chat/conversations/:id', (req, res) => {
  const { id } = req.params;
  const { status, assignedTo } = req.body;
  
  try {
    if (status) {
      db.prepare(`UPDATE chat_conversations SET status = ? WHERE id = ?`).run(status, id);
    }
    if (assignedTo !== undefined) {
      db.prepare(`UPDATE chat_conversations SET assigned_to = ? WHERE id = ?`).run(assignedTo, id);
    }
    
    res.json({ success: true });
  } catch (error) {
    console.error('Update conversation error:', error);
    res.status(500).json({ error: 'Failed to update conversation' });
  }
});

app.get('/api/chat/unread-count', (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const result = db.prepare(`
      SELECT COUNT(*) as count FROM chat_messages 
      WHERE is_read = 0 AND sender_type = 'visitor'
    `).get();

    res.json({ count: result.count });
  } catch (error) {
    console.error('Unread count error:', error);
    res.status(500).json({ error: 'Failed to get unread count' });
  }
});

// ==================== AUDIT REPORTS API ====================

// Create new audit report (with user info before audit)
app.post('/api/audit-reports', (req, res) => {
  const { name, email, phone, company, website, results, overall_score } = req.body;
  
  try {
    const result = db.prepare(`
      INSERT INTO audit_reports (name, email, phone, company, website, results, overall_score, is_paid)
      VALUES (?, ?, ?, ?, ?, ?, ?, 0)
    `).run(name, email, phone || '', company || '', website, JSON.stringify(results), overall_score);
    
    res.json({ success: true, reportId: result.lastInsertRowid });
  } catch (error) {
    console.error('Audit report creation error:', error);
    res.status(500).json({ error: 'Failed to create audit report' });
  }
});

// Update payment status for audit report
app.put('/api/audit-reports/:id/payment', (req, res) => {
  const { payment_id } = req.body;
  
  try {
    db.prepare(`
      UPDATE audit_reports SET is_paid = 1, payment_id = ? WHERE id = ?
    `).run(payment_id, req.params.id);
    
    res.json({ success: true });
  } catch (error) {
    console.error('Payment update error:', error);
    res.status(500).json({ error: 'Failed to update payment' });
  }
});

// Get audit report by ID (public)
app.get('/api/audit-reports/:id', (req, res) => {
  try {
    const report = db.prepare('SELECT * FROM audit_reports WHERE id = ?').get(req.params.id);
    if (!report) {
      return res.status(404).json({ error: 'Report not found' });
    }
    report.results = JSON.parse(report.results || '[]');
    res.json(report);
  } catch (error) {
    console.error('Get report error:', error);
    res.status(500).json({ error: 'Failed to get report' });
  }
});

// Get all audit reports (admin only)
app.get('/api/audit-reports', auth, (req, res) => {
  try {
    const reports = db.prepare('SELECT id, name, email, phone, company, website, overall_score, is_paid, created_at FROM audit_reports ORDER BY created_at DESC').all();
    res.json(reports);
  } catch (error) {
    console.error('Get all reports error:', error);
    res.status(500).json({ error: 'Failed to get reports' });
  }
});

// ==================== AUDIT REPORT PAYMENT (PAYPAL) ====================

app.post('/api/audit-reports/payment/create-order', async (req, res) => {
  const { reportId } = req.body;
  
  const paypalClientId = db.prepare('SELECT value FROM settings WHERE key = ?').get('paypal_client_id')?.value;
  const paypalClientSecret = db.prepare('SELECT value FROM settings WHERE key = ?').get('paypal_client_secret')?.value;
  const paypalMode = db.prepare('SELECT value FROM settings WHERE key = ?').get('paypal_mode')?.value || 'sandbox';
  
  if (!paypalClientId || !paypalClientSecret) {
    return res.status(400).json({ error: 'PayPal not configured. Please configure payment settings in admin.' });
  }
  
  try {
    console.log('PayPal mode:', paypalMode);
    console.log('PayPal client ID exists:', !!paypalClientId);
    
    const paypalEnvironment = paypalMode === 'live'
      ? new paypal.core.LiveEnvironment(paypalClientId, paypalClientSecret)
      : new paypal.core.SandboxEnvironment(paypalClientId, paypalClientSecret);
    const paypalClient = new paypal.core.PayPalHttpClient(paypalEnvironment);
    
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer('return=representation');
    request.requestBody({
      intent: 'CAPTURE',
      application_context: {
        brand_name: 'JenQ Global Solutions',
        landing_page: 'BILLING',
        user_action: 'PAY_NOW',
        return_url: `${req.protocol}://${req.get('host')}/payment-result`,
        cancel_url: `${req.protocol}://${req.get('host')}/free-audit`
      },
      purchase_units: [{
        amount: {
          currency_code: 'USD',
          value: '2.00'
        },
        description: 'Website Audit Report - Full Access',
        custom_id: JSON.stringify({ reportId })
      }]
    });
    
    console.log('Creating PayPal order...');
    const order = await paypalClient.execute(request);
    console.log('PayPal order created:', order.result.id);
    
    // Return the correct PayPal URL based on mode
    const paypalBaseUrl = paypalMode === 'live' 
      ? 'https://www.paypal.com' 
      : 'https://www.sandbox.paypal.com';
    
    res.json({
      orderId: order.result.id,
      clientId: paypalClientId,
      amount: 2,
      paypalUrl: `${paypalBaseUrl}/checkoutnow?token=${order.result.id}`,
      mode: paypalMode
    });
  } catch (error) {
    console.error('PayPal order error:', error);
    console.error('Error details:', error.response?.data || error.stack);
    res.status(500).json({ error: 'PayPal payment initialization failed. Please check your PayPal settings and try again.' });
  }
});

app.post('/api/audit-reports/payment/verify', async (req, res) => {
  const { paypalOrderId, reportId } = req.body;
  
  const paypalClientId = db.prepare('SELECT value FROM settings WHERE key = ?').get('paypal_client_id')?.value;
  const paypalClientSecret = db.prepare('SELECT value FROM settings WHERE key = ?').get('paypal_client_secret')?.value;
  const paypalMode = db.prepare('SELECT value FROM settings WHERE key = ?').get('paypal_mode')?.value || 'sandbox';
  
  if (!paypalClientId || !paypalClientSecret) {
    return res.status(400).json({ error: 'PayPal not configured' });
  }
  
  try {
    const paypalEnvironment = paypalMode === 'live'
      ? new paypal.core.LiveEnvironment(paypalClientId, paypalClientSecret)
      : new paypal.core.SandboxEnvironment(paypalClientId, paypalClientSecret);
    const paypalClient = new paypal.core.PayPalHttpClient(paypalEnvironment);
    
    const request = new paypal.orders.OrdersCaptureRequest(paypalOrderId);
    request.prefer('return=representation');
    request.requestBody({});
    
    await paypalClient.execute(request);
    
    db.prepare(`
      UPDATE audit_reports SET is_paid = 1, payment_id = ? WHERE id = ?
    `).run(paypalOrderId, reportId);
    
    res.json({ success: true });
  } catch (error) {
    console.error('PayPal capture error:', error);
    res.status(500).json({ error: 'Payment verification failed' });
  }
});

// Serve frontend for all other routes (React Router)
const clientIndexPath = path.join(__dirname, '../client/dist/index.html');
if (fs.existsSync(clientIndexPath)) {
  app.get('*', (req, res) => {
    res.sendFile(clientIndexPath);
  });
}