import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <>
      <Header />

      <main className="pt-16 min-h-screen">
        <div className="bg-white py-24">
          <div className="max-width-container section-padding">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Blog
              </h1>
              <p className="mt-4 text-lg text-gray-600">
                Tips, insights, and best practices for short-term rental hosts
              </p>
            </div>

            {posts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">No blog posts yet. Check back soon!</p>
              </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <article
                    key={post.slug}
                    className="group flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-md transition-all"
                  >
                    {post.coverImage && (
                      <Link href={`/blog/${post.slug}`}>
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="aspect-video object-cover rounded-t-2xl"
                        />
                      </Link>
                    )}
                    <div className="flex-1 p-6">
                      <div className="flex items-center gap-x-4 text-xs text-gray-500">
                        <time dateTime={post.date}>{post.date}</time>
                        <span>{post.readingTime}</span>
                      </div>
                      <Link href={`/blog/${post.slug}`} className="block mt-3">
                        <h2 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                          {post.title}
                        </h2>
                        <p className="mt-3 text-gray-600 line-clamp-3">
                          {post.excerpt}
                        </p>
                      </Link>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="mt-6 flex items-center">
                        <p className="text-sm font-medium text-gray-900">{post.author}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}