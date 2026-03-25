import { Link } from "react-router-dom";
import { POSTS } from "./posts";
import useSEO from "../shared/useSEO";

const BLOG_CSS = `
.blog-page {
  max-width: 680px;
  margin: 0 auto;
  padding: 32px 0 64px;
}

.blog-hero {
  margin-bottom: 36px;
}

.blog-hero h1 {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(28px, 5vw, 40px);
  letter-spacing: 3px;
  color: #e8742a;
  margin: 0 0 8px;
}

.blog-hero p {
  font-size: 14px;
  color: var(--text3);
  line-height: 1.6;
}

.blog-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.blog-card {
  display: block;
  text-decoration: none;
  background: var(--bg2);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 22px 24px;
  transition: border-color 0.2s, background 0.2s;
}

.blog-card:hover {
  border-color: #e8742a;
  background: var(--bg3);
}

.blog-card-meta {
  font-size: 11px;
  color: var(--text4);
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.blog-card-meta span {
  margin: 0 6px;
  opacity: 0.5;
}

.blog-card-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--text);
  line-height: 1.4;
  margin-bottom: 10px;
}

.blog-card:hover .blog-card-title {
  color: #e8742a;
}

.blog-card-desc {
  font-size: 14px;
  color: var(--text3);
  line-height: 1.65;
}

.blog-card-read {
  display: inline-block;
  margin-top: 14px;
  font-size: 12px;
  font-weight: 600;
  color: #e8742a;
  letter-spacing: 0.5px;
}
`;

export default function Blog() {
  useSEO({
    title: "Blog — Survivordle",
    description: "Articles from the creator of Survivordle — behind the scenes, Survivor data, and updates on the game.",
    canonical: "https://survivordle.com/blog",
  });

  return (
    <>
      <style>{BLOG_CSS}</style>
      <header className="header">
        <div className="logo">
          <span className="logo-surv">SURV</span>
          <span className="logo-torch">
            <span className="logo-torch-flame">🔥</span>
            <span className="logo-torch-stem" />
          </span>
          <span className="logo-vor">VOR</span>
          <span className="logo-dle">DLE</span>
        </div>
        <div className="torch-row">
          <div className="torch-line" />
          <div className="torch-line r" />
        </div>
        <div className="tagline">Blog</div>
      </header>

      <div className="blog-page">
        <div className="blog-hero">
          <h1>From the Creator</h1>
          <p>Behind the scenes, Survivor data, and updates on where the game is headed.</p>
        </div>

        <div className="blog-list">
          {POSTS.map(post => (
            <Link key={post.slug} to={`/blog/${post.slug}`} className="blog-card">
              <div className="blog-card-meta">
                {post.dateDisplay}<span>·</span>{post.readTime}
              </div>
              <div className="blog-card-title">{post.title}</div>
              <div className="blog-card-desc">{post.description}</div>
              <span className="blog-card-read">Read article →</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
