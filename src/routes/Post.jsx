import PostsList from "../components/PostsList";
import { Outlet } from "react-router-dom";

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
