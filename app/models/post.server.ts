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
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

async function fetchPosts(): Promise<Post[]> {
    const response = await fetch("https://raw.githubusercontent.com/aigem/cf-remix-blog/refs/heads/master/public/posts.json", {
        signal: AbortSignal.timeout(10000) // 10 seconds timeout
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const text = await response.text();
    const decodedText = decodeURIComponent(escape(text));
    return JSON.parse(decodedText);
}

export async function getPosts(): Promise<Post[]> {
    const now = Date.now();
    if (!posts || now - lastFetchTime > CACHE_DURATION) {
        try {
            const fetchedPosts = await fetchPosts();
            posts = fetchedPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            lastFetchTime = now;
        } catch (error) {
            console.error("Error fetching posts:", error);
            if (!posts) throw error;
        }
    }
    return posts;
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