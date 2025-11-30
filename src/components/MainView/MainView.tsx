import {Post} from "../Post/Post.tsx";
import type {IPost} from "../../types/IPost.ts";
import {useEffect, useState} from "react";
import {apiPostsGetAll} from "../../api/postsApi.ts";

export function MainView() {

  const [allPosts, setAllPosts] = useState<IPost[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await apiPostsGetAll();
        setAllPosts(data);
        console.log(allPosts);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, []);

  return (
      <div className="main flex items-center justify-center flex-col gap-4 mt-5">
        <h1 className="text-3xl">Main Page</h1>
        <span>page: </span>
        <span>posts per page: </span>
        <span>total pages: </span>

        <div className="input-group ">
          <div className="relative">
            <input type="text" id="floating_outlined"
                   className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-heading bg-transparent rounded-base border-1 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
                   placeholder=" "/>
            <label htmlFor="floating_outlined"
                   className="absolute text-sm text-body duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-neutral-primary px-2 peer-focus:px-2 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Your
              Search</label>
          </div>
        </div>

        <div className="posts-container flex gap-3 flex-wrap justify-center mb-5">
          {isLoading && (
              <p className="text-2xl text-red-400">Посты загружаются</p>
          )}
          {!isLoading && (
              allPosts.map((post: IPost) => (
                <Post key={post.id} post={post} />
              ))
          )}
        </div>
      </div>


  )
}