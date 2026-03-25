// All blog posts live here. Add new posts to the top of the array.
export const POSTS = [
  {
    slug: "how-i-built-survivordle",
    title: "How I Built Survivordle: A Daily Survivor Castaway Guessing Game",
    date: "2026-03-24",
    dateDisplay: "March 24, 2026",
    description: "How a Sunday night thought — 'is there a daily Survivor game?' — turned into a site with over 200,000 games played and visitors from over 100 countries.",
    readTime: "8 min read",
  },
];

export function getPost(slug) {
  return POSTS.find(p => p.slug === slug) || null;
}
