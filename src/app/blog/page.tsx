'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ChevronRight, ChevronLeft, Heart, MessageCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import {
  fetchWebsiteBlogs,
  submitWebsiteBlogLike,
  type WebsiteBlogItem,
} from '@/services/blogs.service';

function getBlogCategory(blog: WebsiteBlogItem) {
  return blog.websites?.[0]?.name || blog.tags?.[0] || 'Blog';
}

function getBlogAuthor(blog: WebsiteBlogItem) {
  return blog.author?.fullName || 'CORE Media Team';
}

function getBlogImage(blog: WebsiteBlogItem) {
  return blog.featureImage || blog.seo?.ogImage || '/assets/blogs/blog-1.png';
}

function getBlogDescription(blog: WebsiteBlogItem) {
  return blog.excerpt || blog.seo?.metaDescription || '';
}

type AnimatedBlogCardProps = {
  blog: WebsiteBlogItem;
  index: number;
  variant?: string;
};

function AnimatedBlogCard({ blog, index, variant = 'animate-fade-in' }: AnimatedBlogCardProps) {
  const likesCount =
    typeof blog.engagement?.likes === 'number' && blog.engagement.likes > 0
      ? blog.engagement.likes
      : 0;

  const commentsCount =
    typeof blog.engagement?.commentsCount === 'number' ? blog.engagement.commentsCount : 0;

  const [localLikes, setLocalLikes] = useState<number>(likesCount);
  const [liked, setLiked] = useState<boolean>(false);

  const LIKED_KEY = 'likedBlogs';

  function readLikedSet(): Set<string> {
    try {
      const raw = typeof window !== 'undefined' ? window.localStorage.getItem(LIKED_KEY) : null;
      if (!raw) return new Set();

      const arr = JSON.parse(raw);
      if (!Array.isArray(arr)) return new Set();

      return new Set(arr.map(String));
    } catch {
      return new Set();
    }
  }

  function markBlogLiked(id: string | number) {
    try {
      const set = readLikedSet();
      set.add(String(id));
      window.localStorage.setItem(LIKED_KEY, JSON.stringify(Array.from(set)));
    } catch {
      // ignore
    }
  }

  function removeBlogLiked(id: string | number) {
    try {
      const set = readLikedSet();
      set.delete(String(id));
      window.localStorage.setItem(LIKED_KEY, JSON.stringify(Array.from(set)));
    } catch {
      // ignore
    }
  }

  function isBlogLiked(id?: string | number) {
    if (!id) return false;
    return readLikedSet().has(String(id));
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setLiked(isBlogLiked(blog.id));
    setLocalLikes(likesCount);
  }, [blog.id, likesCount]);

  async function handleLikeClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    e.preventDefault();

    const wasLiked = liked;

    if (wasLiked) {
      setLiked(false);
      setLocalLikes((n) => Math.max(0, n - 1));
      removeBlogLiked(blog.id);
      return;
    }

    setLiked(true);
    setLocalLikes((n) => n + 1);

    try {
      await submitWebsiteBlogLike(blog.id);
      markBlogLiked(blog.id);
    } catch {
      setLiked(false);
      setLocalLikes((n) => Math.max(0, n - 1));
      removeBlogLiked(blog.id);
    }
  }

  const initialTransform = variant.includes('left')
    ? 'translateX(-40px)'
    : variant.includes('right')
      ? 'translateX(40px)'
      : 'translateY(40px)';

  const ref = useScrollAnimation<HTMLDivElement>({
    animationClass: variant,
    initialTransform,
    threshold: 0.12,
    once: false,
  });

  return (
    <article ref={ref} className="blogpage-card" style={{ transitionDelay: `${index * 60}ms` }}>
      <div className="blogpage-image-wrap">
        <Image
          src={getBlogImage(blog)}
          alt={blog.title}
          width={420}
          height={260}
          className="blogpage-image"
          unoptimized
        />
      </div>

      <div className="blogpage-content">
        <div className="blogpage-meta">
          <span className="blogpage-category">{getBlogCategory(blog)}</span>
        </div>

        <h4 className="blogpage-heading blogpage-heading-fixed">{blog.title}</h4>

        <div className="blogpage-footer">
          <Link href={`/blog/${blog.slug}`} className="blogpage-readmore">
            Read More
            <span className="blogpage-arrow">
              <ArrowUpRight size={12} />
            </span>
          </Link>

          <span className="blogpage-engagement" aria-label="Blog engagement">
            <button
              type="button"
              className={`blogpage-engagement-item ${liked ? 'liked' : ''}`}
              aria-label={`${localLikes} likes`}
              onClick={handleLikeClick}
            >
              <Heart size={14} fill={liked ? 'currentColor' : 'none'} />
              <span>{localLikes}</span>
            </button>

            <span className="blogpage-engagement-item" aria-label={`${commentsCount} comments`}>
              <MessageCircle size={14} />
              <span>{commentsCount}</span>
            </span>
          </span>
        </div>
      </div>
    </article>
  );
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<WebsiteBlogItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const CLIENT_PAGINATION_THRESHOLD = 200;
  const [totalPages, setTotalPages] = useState<number>(1);

  const heroMediaRef = useScrollAnimation<HTMLDivElement>({
    animationClass: 'animate-fade-in-right',
    initialTransform: 'translateX(40px)',
    threshold: 0.12,
    once: false,
  });

  const heroContentRef = useScrollAnimation<HTMLDivElement>({
    animationClass: 'animate-fade-in-left',
    initialTransform: 'translateX(-40px)',
    threshold: 0.12,
    once: false,
  });

  const filteredCards = blogs.filter((blog) => {
    const searchValue = searchTerm.trim().toLowerCase();

    if (!searchValue) return true;

    return [blog.title, getBlogCategory(blog), getBlogAuthor(blog), getBlogDescription(blog)]
      .join(' ')
      .toLowerCase()
      .includes(searchValue);
  });

  useEffect(() => {
    let isMounted = true;

    async function loadBlogs() {
      setIsLoading(true);
      setError(null);

      try {
        const firstResp = await fetchWebsiteBlogs(1, Math.max(10, limit), searchTerm);

        if (!isMounted) return;

        const total = firstResp.data?.meta?.total ?? firstResp.data?.data?.length ?? 0;

        if (total > 0 && total <= CLIENT_PAGINATION_THRESHOLD) {
          const allResp = await fetchWebsiteBlogs(1, total, searchTerm);
          const allItems = allResp.data?.data ?? [];

          const pages = total <= 9 ? 1 : 1 + Math.ceil((total - 9) / 10);
          setTotalPages(pages);

          const pageItems = (() => {
            if (page === 1) return allItems.slice(0, 9);
            const start = 9 + (page - 2) * 10;
            return allItems.slice(start, start + 10);
          })();

          setBlogs(pageItems);
        } else {
          const resp = await fetchWebsiteBlogs(page, limit, searchTerm);
          const items = resp.data?.data ?? [];

          setBlogs(items);

          const meta = resp.data?.meta;
          setTotalPages(
            meta?.totalPages ?? Math.max(1, Math.ceil((meta?.total ?? items.length) / limit)),
          );
        }
      } catch (fetchError) {
        if (isMounted) {
          setBlogs([]);
          setError(fetchError instanceof Error ? fetchError.message : 'Failed to load blogs');
          setStatusMessage('Backend connection failed. Check token/domain/CORS.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadBlogs();

    return () => {
      isMounted = false;
    };
  }, [page, limit, searchTerm]);

  return (
    <>
      <section className="blog-hero">
        <div className="blog-hero-media" ref={heroMediaRef}>
          <Image
            src="/assets/blogs/blog-1.webp"
            alt="Read Blog"
            fill
            priority
            className="blog-hero-image"
          />
        </div>

        <div className="blog-hero-overlay"></div>

        <div className="blog-hero-content" ref={heroContentRef}>
          <h1>Explore Insights</h1>

          <div className="blog-breadcrumb">
            <Link href="/" className="blog-breadcrumb-home">
              <Image
                src="/assets/home/home.png" // Replace with your image path
                alt="Home"
                width={38}
                height={48}
                className="blog-home-icon"
              />
              <span>Home</span>
            </Link>

            <span>&gt;</span>

            <p>Blog</p>
          </div>
        </div>
      </section>

      <br />

      <section className="blogpage-section">
        <div className="blogpage-container">
          <form className="blogpage-searchbar" onSubmit={(event) => event.preventDefault()}>
            <input
              type="text"
              placeholder="Search blog here"
              value={searchTerm}
              onChange={(event) => {
                setSearchTerm(event.target.value);
                setPage(1);
              }}
            />

            <button type="submit" aria-label="Search blog">
              Search
            </button>
          </form>

          <br />
          <br />

          {isLoading ? <p>Loading blogs...</p> : null}

          {!isLoading && error ? <p>{error}</p> : null}

          {!isLoading && !error && statusMessage ? (
            <p style={{ marginBottom: '16px', opacity: 0.75 }}>{statusMessage}</p>
          ) : null}

          <div className="blogpage-grid">
            {!isLoading && !error && filteredCards.length === 0 ? (
              <div className="blogpage-card" style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
                <p>No blogs found.</p>
              </div>
            ) : null}

            {filteredCards.map((blog, index) => {
              const variant =
                index % 3 === 0
                  ? 'animate-fade-in-left'
                  : index % 3 === 1
                    ? 'animate-fade-in'
                    : 'animate-fade-in-right';

              return <AnimatedBlogCard key={blog.id} blog={blog} index={index} variant={variant} />;
            })}
          </div>

          <div className="blogpage-pagination" aria-label="Blog pagination">
            <button
              className="blogpage-page"
              type="button"
              aria-label="Previous page"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={isLoading || page <= 1}
            >
              <ChevronLeft size={14} />
            </button>

            <button className="blogpage-page blogpage-page-active" type="button" disabled>
              {String(page).padStart(2, '0')}
            </button>

            <button
              className="blogpage-page blogpage-page-arrow"
              type="button"
              aria-label="Next page"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={isLoading || page >= totalPages}
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
