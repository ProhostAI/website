import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { format, parseISO } from 'date-fns';
import readingTime from 'reading-time';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  tags: string[];
  readingTime: string;
  content: string;
  coverImage?: string;
  published: boolean;
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const realSlug = slug.replace(/\.mdx$/, '');
    const fullPath = path.join(postsDirectory, `${realSlug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Only return published posts in production
    if (process.env.NODE_ENV === 'production' && !data.published) {
      return null;
    }

    const readTime = readingTime(content);

    return {
      slug: realSlug,
      title: data.title || 'Untitled',
      date: data.date ? format(parseISO(data.date), 'MMMM dd, yyyy') : '',
      author: data.author || 'Anonymous',
      excerpt: data.excerpt || '',
      tags: data.tags || [],
      readingTime: readTime.text,
      content,
      coverImage: data.coverImage,
      published: data.published !== false,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    // Create directory if it doesn't exist
    if (!fs.existsSync(postsDirectory)) {
      fs.mkdirSync(postsDirectory, { recursive: true });
      return [];
    }

    const files = fs.readdirSync(postsDirectory);
    const posts = await Promise.all(
      files
        .filter((file) => file.endsWith('.mdx'))
        .map((file) => getPostBySlug(file))
    );

    return posts
      .filter((post): post is BlogPost => post !== null)
      .sort((a, b) => {
        if (!a.date || !b.date) return 0;
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
  } catch (error) {
    console.error('Error getting all posts:', error);
    return [];
  }
}

export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter((post) =>
    post.tags.map(t => t.toLowerCase()).includes(tag.toLowerCase())
  );
}

export async function getAllTags(): Promise<string[]> {
  const allPosts = await getAllPosts();
  const tags = new Set<string>();

  allPosts.forEach(post => {
    post.tags.forEach(tag => tags.add(tag));
  });

  return Array.from(tags).sort();
}