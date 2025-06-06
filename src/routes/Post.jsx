import PostsList from "../components/PostsList";
import { Outlet } from "react-router";

function Post() {
  return (
    <>
      <Outlet />
      <main>
        <PostsList />
      </main>
    </>
  );
}

export default Post;

// export async function loader() {
//   const response = await fetch("http://192.168.219.150:8080/posts");
//   const resData = await response.json();

//   return resData.posts;
// }

export function loader() {
  const posts = fetch("http://192.168.219.150:8080/posts")
    .then((response) => response.json())
    .then((resData) => resData.posts);

  return { posts };
}
