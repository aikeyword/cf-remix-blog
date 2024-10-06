import invariant from "tiny-invariant";

export interface Post {
  slug: string;
  title: string;
  content: string;
  date: string;
  excerpt: string;
  tags: string[];
}

let posts: Post[] | null = null;

export async function getPosts(): Promise<Post[]> {
  if (posts) return posts;

  const response = await fetch("/posts.json");
  posts = await response.json();
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPost(slug: string): Promise<Post> {
  const posts = await getPosts();
  const post = posts.find((post) => post.slug === slug);
  invariant(post, `Post not found: ${slug}`);
  return post;
}

export async function getPostsByTag(tag: string): Promise<Post[]> {
  const posts = await getPosts();
  return posts.filter((post) => post.tags.includes(tag));
}