import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
// import { Post } from "../Post/Post";
import type { IPost } from "../../types/IPost";
import { apiPostsById } from "../../api/postsApi";

export function PostView() {
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<IPost | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const load = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await apiPostsById({ id });
        setPost(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Неизвестная ошибка");
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [id, setIsLoading]);

  if (error || !post) {
    return (
      <div className="space-y-4 text-center">
        <p className="text-red-600">{isLoading ? "Post is loading now...." : error}</p>
        <Link to="/" className="text-brand-primary underline">
          ← Вернуться к списку
        </Link>
      </div>
    );
  }

  return (
    <div className="post-container">
      <h1 className="text-3xl text-center p-5">Post Page</h1>

      {/* {isLoading && <h2 className="text-2xl text-center">Post is loading now....</h2>} */}
      {!isLoading && (
        <div className="bg-neutral-primary-soft block max-w-sm p-6 border border-default rounded-base shadow-xs mx-auto">
          <h5 className="mb-3 text-2xl font-semibold tracking-tight text-heading leading-8">
            {post.title}
          </h5>
          <p className="text-body mb-6">{post.body}</p>
          <Link to="/" className="text-sm text-brand-primary underline">
            ← Назад к списку
          </Link>
        </div>
      )}
    </div>
  );
}
