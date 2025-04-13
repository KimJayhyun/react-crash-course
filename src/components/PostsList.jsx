import Post from "./Post";
import classes from "./PostsList.module.css";

function PostsList() {
  return (
    <ul className={classes.posts}>
      <Post author="jhkim" body="Hello World" />
      <Post author="dky" body="Hi" />
    </ul>
  );
}

export default PostsList;
