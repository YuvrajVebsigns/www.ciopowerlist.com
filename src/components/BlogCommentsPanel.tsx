// 'use client';

// import { useEffect, useState } from 'react';
// import {
//   fetchWebsiteBlogComments,
//   submitWebsiteBlogComment,
//   type WebsiteBlogComment,
// } from '@/services/blogs.service';

// type BlogCommentsPanelProps = {
//   blogId: string;
// };

// function getCommentAuthor(comment: WebsiteBlogComment) {
//   return comment.authorName || comment.name || 'Guest';
// }

// function getCommentContent(comment: WebsiteBlogComment) {
//   return comment.content || comment.message || '';
// }

// export default function BlogCommentsPanel({ blogId }: BlogCommentsPanelProps) {
//   const [comments, setComments] = useState<WebsiteBlogComment[]>([]);
//   const [loadingComments, setLoadingComments] = useState(false);
//   const [authorName, setAuthorName] = useState('');
//   const [authorEmail, setAuthorEmail] = useState('');
//   const [content, setContent] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');

//   async function loadComments() {
//     if (!blogId) return;

//     setLoadingComments(true);
//     setErrorMessage('');

//     try {
//       const response = await fetchWebsiteBlogComments(blogId);
//       const approved = (response.data ?? []).filter((comment) => comment.isApproved !== false);
//       setComments(approved);
//     } catch (error) {
//       setErrorMessage(error instanceof Error ? error.message : 'Failed to load comments.');
//     } finally {
//       setLoadingComments(false);
//     }
//   }

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     e.stopPropagation();

//     const trimmedName = authorName.trim();
//     const trimmedEmail = authorEmail.trim();
//     const trimmedContent = content.trim();

//     if (!trimmedName || !trimmedEmail || !trimmedContent) {
//       setErrorMessage('Name, email, and comment are required.');
//       return;
//     }

//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
//       setErrorMessage('Enter a valid email address.');
//       return;
//     }

//     setIsSubmitting(true);
//     setErrorMessage('');
//     setSuccessMessage('');

//     try {
//       const response = await submitWebsiteBlogComment(blogId, {
//         authorName: trimmedName,
//         authorEmail: trimmedEmail,
//         content: trimmedContent,
//       });

//       if (!response.success) {
//         setErrorMessage(response.message || 'Failed to submit comment.');
//         return;
//       }

//       setSuccessMessage(
//         response.message || 'Comment submitted. It will appear after admin approval.',
//       );
//       setAuthorName('');
//       setAuthorEmail('');
//       setContent('');
//       await loadComments();
//     } catch (error) {
//       setErrorMessage(error instanceof Error ? error.message : 'Failed to submit comment.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   }

//   useEffect(() => {
//     void loadComments();
//     // eslint-disable-next-line react-hooks/exhaustive-deps -- reload when blog changes
//   }, [blogId]);

//   return (
//     <div className="blog-comments-panel">
//       {loadingComments ? <p className="blog-comments-panel-status">Loading comments...</p> : null}

//       {!loadingComments && comments.length === 0 ? (
//         <p className="blog-comments-panel-status">
//           No approved comments yet. Be the first to comment.
//         </p>
//       ) : null}

//       <div className="blog-comments-panel-list">
//         {comments.map((comment, index) => (
//           <div
//             key={comment.id ?? `comment-${blogId}-${index}`}
//             className="blog-comments-panel-item"
//           >
//             <strong>{getCommentAuthor(comment)}</strong>
//             <p>{getCommentContent(comment)}</p>
//           </div>
//         ))}
//       </div>

//       <form className="blog-comments-panel-form" onSubmit={handleSubmit}>
//         <p className="blog-comments-panel-form-title">Post a comment</p>

//         {errorMessage ? <p className="blog-comments-panel-error">{errorMessage}</p> : null}
//         {successMessage ? <p className="blog-comments-panel-success">{successMessage}</p> : null}

//         <input
//           type="text"
//           placeholder="Your name *"
//           value={authorName}
//           disabled={isSubmitting}
//           onChange={(e) => setAuthorName(e.target.value)}
//         />
//         <input
//           type="email"
//           placeholder="Your email *"
//           value={authorEmail}
//           disabled={isSubmitting}
//           onChange={(e) => setAuthorEmail(e.target.value)}
//         />
//         <textarea
//           rows={3}
//           placeholder="Your comment *"
//           value={content}
//           disabled={isSubmitting}
//           onChange={(e) => setContent(e.target.value)}
//         />
//         <button type="submit" disabled={isSubmitting}>
//           {isSubmitting ? 'Submitting...' : 'Submit Comment'}
//         </button>
//       </form>
//     </div>
//   );
// }

'use client';

import { useEffect, useState } from 'react';
import {
  fetchWebsiteBlogComments,
  submitWebsiteBlogComment,
  type WebsiteBlogComment,
} from '@/services/blogs.service';

type BlogCommentsPanelProps = {
  blogId: string;
};

function getCommentAuthor(comment: WebsiteBlogComment) {
  return comment.authorName || comment.name || 'Guest';
}

function getCommentContent(comment: WebsiteBlogComment) {
  return comment.content || comment.message || '';
}

export default function BlogCommentsPanel({ blogId }: BlogCommentsPanelProps) {
  const [comments, setComments] = useState<WebsiteBlogComment[]>([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  async function loadComments() {
    if (!blogId) return;

    setLoadingComments(true);
    setErrorMessage('');

    try {
      const response = await fetchWebsiteBlogComments(blogId);
      const approved = (response.data ?? []).filter((comment) => comment.isApproved !== false);
      setComments(approved);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Failed to load comments.');
    } finally {
      setLoadingComments(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const trimmedName = authorName.trim();
    const trimmedEmail = authorEmail.trim();
    const trimmedContent = content.trim();

    if (!trimmedName || !trimmedEmail || !trimmedContent) {
      setErrorMessage('Name, email, and comment are required.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setErrorMessage('Enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await submitWebsiteBlogComment(blogId, {
        authorName: trimmedName,
        authorEmail: trimmedEmail,
        content: trimmedContent,
      });

      if (!response.success) {
        setErrorMessage(response.message || 'Failed to submit comment.');
        return;
      }

      setSuccessMessage(
        response.message || 'Comment submitted. It will appear after admin approval.',
      );
      setAuthorName('');
      setAuthorEmail('');
      setContent('');
      await loadComments();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Failed to submit comment.');
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    void loadComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blogId]);

  return (
    <div className="blog-comments-panel">
      {loadingComments ? <p className="blog-comments-panel-status">Loading comments...</p> : null}

      {!loadingComments && comments.length === 0 ? (
        <p className="blog-comments-panel-status">No approved comments yet.</p>
      ) : null}

      <div className="blog-comments-panel-list">
        {comments.map((comment, index) => (
          <div
            key={comment.id ?? `comment-${blogId}-${index}`}
            className="blog-comments-panel-item"
          >
            <strong>{getCommentAuthor(comment)}</strong>
            <p>{getCommentContent(comment)}</p>
          </div>
        ))}
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          marginTop: '18px',
          marginBottom: '14px',
        }}
      >
        <p className="blog-comments-panel-form-title" style={{ margin: 0 }}>
          Post a comment
        </p>

        <button
          type="button"
          onClick={() => setShowForm((prev) => !prev)}
          style={{
            background: '#8E0101',
            color: '#ffffff',
            border: 'none',
            borderRadius: '999px',
            padding: '9px 16px',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: 600,
            whiteSpace: 'nowrap',
          }}
        >
          {showForm ? 'Close' : 'Add Comment'}
        </button>
      </div>

      {showForm ? (
        <form className="blog-comments-panel-form" onSubmit={handleSubmit}>
          {errorMessage ? <p className="blog-comments-panel-error">{errorMessage}</p> : null}
          {successMessage ? <p className="blog-comments-panel-success">{successMessage}</p> : null}

          <input
            type="text"
            placeholder="Your name *"
            value={authorName}
            disabled={isSubmitting}
            onChange={(e) => setAuthorName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Your email *"
            value={authorEmail}
            disabled={isSubmitting}
            onChange={(e) => setAuthorEmail(e.target.value)}
          />

          <textarea
            rows={3}
            placeholder="Your comment *"
            value={content}
            disabled={isSubmitting}
            onChange={(e) => setContent(e.target.value)}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              background: '#8E0101',
              color: '#ffffff',
              border: 'none',
              borderRadius: '999px',
              padding: '9px 16px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: 600,
              whiteSpace: 'nowrap',
            }}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Comment'}
          </button>
        </form>
      ) : null}
    </div>
  );
}
