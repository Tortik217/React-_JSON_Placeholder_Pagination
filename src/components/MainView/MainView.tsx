import { useMemo } from "react";
import { Post } from "../Post/Post.tsx";
import type { IPost } from "../../types/IPost.ts";
import { useEffect, useState } from "react";
import { apiPostsGetAll } from "../../api/postsApi.ts";

export function MainView() {
  const [allPosts, setAllPosts] = useState<IPost[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [inputText, setInputText] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);

  const postPerPage = 10;

  const filteredPosts = useMemo(
    () =>
      allPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(inputText.toLowerCase()) ||
          post.body.toLowerCase().includes(inputText.toLowerCase())
      ),
    [allPosts, inputText]
  );

  const paginationPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * postPerPage
    const endIndex = startIndex + postPerPage
    return filteredPosts.slice(startIndex, endIndex)
  },[currentPage, filteredPosts, postPerPage])

  const totalPages = useMemo(
    () => Math.ceil(filteredPosts.length / postPerPage),
    [filteredPosts]
  );

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await apiPostsGetAll();
        setAllPosts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  },[]);

  return (
    <div className="main flex items-center justify-center flex-col gap-4 mt-5">
      <h1 className="text-3xl">Main Page</h1>
      <span>page: </span>
      <span>posts per page: {postPerPage}</span>
      <span>total pages: </span>

      <div className="input-group ">
        <div className="relative">
          <input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInputText(e.target.value)
            }
            type="text"
            id="floating_outlined"
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-heading bg-transparent rounded-base border border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
            placeholder=" "
          />
          <label
            htmlFor="floating_outlined"
            className="absolute text-sm text-body duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-left bg-neutral-primary px-2 peer-focus:px-2 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >
            Your Search
          </label>
        </div>
      </div>

      <div className="pagination mb-5">
        <nav aria-label="Page navigation example">
          <ul className="flex -space-x-px text-sm">
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(prev => Math.max(1, prev - 1));
                }}
                className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium transition-colors hover:bg-neutral-tertiary-medium hover:text-heading font-medium rounded-s-base text-sm px-3 h-9 focus:outline-none"
              >
                Previous
              </a>
            </li>

            {Array.from({ length: totalPages }, (_, i) => (
            <li key={i}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(i + 1);
                }}
                className={
                  `flex items-center justify-center box-border border border-default-medium 
                  transition-colors font-medium text-sm w-9 h-9 focus:outline-none
                  ${
                    currentPage === i + 1
                      ? "bg-neutral-400 text-heading" // активная
                      : "bg-neutral-secondary-medium text-body hover:bg-neutral-300 hover:text-heading"
                  }`
                }
              >
                {i + 1}
              </a>
            </li>
          ))}


            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(prev => Math.min(totalPages, prev + 1));
                }}
                className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium transition-colors hover:bg-neutral-tertiary-medium hover:text-heading font-medium rounded-e-base text-sm px-3 h-9 focus:outline-none"
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="posts-container flex gap-3 flex-wrap justify-center mb-5">
        {isLoading && (
          <p className="text-2xl text-red-400">Посты загружаются</p>
        )}
        {!isLoading &&
          paginationPosts.map((post: IPost) => (
            <Post key={post.id} post={post} />
          ))}
      </div>
    </div>
  );
}
