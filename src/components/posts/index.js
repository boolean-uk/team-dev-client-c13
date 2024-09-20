import { useEffect, useState } from "react";
import Post from "../post";
import { getPosts } from "../../service/apiClient";

const Posts = ({ newPostsubmitted, setNewPostSubmitted }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      await getPosts().then(setPosts);

      if (newPostsubmitted) {
        setNewPostSubmitted(false);
      }
    };

    fetchPosts();
  }, [newPostsubmitted]);

  return (
    <>
      {posts.map((post) => {
        return (
          <Post
            key={post.id}
            name={`${post.user.profile.firstName} ${post.user.profile.lastName}`}
            date={post.createdAt}
            content={post.content}
            comments={post.comments}
          />
        );
      })}
    </>
  );
};

export default Posts;
