import { useLoaderData } from "react-router";
import { Suspense, use } from "react";
import Post from "./Post";
import classes from "./PostsList.module.css";

function PostsList() {
  const { posts } = useLoaderData();

  return (
    <>
      <Suspense
        fallback={
          <div style={{ textAlign: "center", color: "white" }}>
            <p>Loading Posts...</p>
          </div>
        }
      >
        <AwaitPostList postsPromise={posts} />
      </Suspense>
    </>
  );
}

function AwaitPostList({ postsPromise }) {
  const posts = use(postsPromise);
  return (
    <>
      {posts.length > 0 && (
        <ul className={classes.posts}>
          {posts.map((post) => (
            <Post key={post.body} author={post.author} body={post.body} />
          ))}
        </ul>
      )}
      {posts.length === 0 && (
        <div style={{ textAlign: "center", color: "white" }}>
          <h2>There are no posts yet.</h2>
          <p>Start adding some!</p>
        </div>
      )}
    </>
  );
}

export default PostsList;
