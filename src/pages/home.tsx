import React, { useEffect, useState, useRef, useCallback } from "react";
import "./../styles/posts.css";
import PhotosApi from "../helpers/photosApi/photosApi";
import { Link, useParams } from "react-router-dom";
import {
  AiOutlineComment,
  AiOutlineFieldNumber,
  AiOutlineLike,
} from "react-icons/ai";

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}
interface User {
  id: number;
  username: string;
}

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const page = useRef(1);
  const { userId } = useParams();

  const fetchPosts = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      var response;
      if (!userId) {
        response = await fetch(
          `https://jsonplaceholder.typicode.com/posts?_page=${page.current}&_limit=10`
        );
      } else {
        response = await fetch(
          `https://jsonplaceholder.typicode.com/posts?_page=${page.current}&_limit=10&userId=${userId}`
        );
      }
      const data = await response.json();
      setPosts((prevPosts) => [...prevPosts, ...data]);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
    // console.log("fetching posts");
    // console.log(posts);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const fetchPostsOnScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight
    ) {
      // console.log("Reached the bottom of the page.");
      page.current++;
      // console.log("Page:", page.current);
      fetchPosts();
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", fetchPostsOnScroll);

    return () => {
      window.removeEventListener("scroll", fetchPostsOnScroll);
    };
  }, [fetchPostsOnScroll]);

  return (
    <div className="post-list">
      {posts.map((post) => (
        <div
          key={post.id}
          className="post-container"
        >
          <Link
            className="goToPost"
            to={`/post/${post.id}`}
          >
            <div className="post-content">
              <div className="post-user">
                <PhotosApi
                  userId={post.userId}
                  photoId={1}
                />

                {users.map((user) => (
                  <div
                    key={user.id}
                    className="userName"
                  >
                    {post.userId === user.id && (
                      <p className="post-username">u/{user.username}</p>
                    )}
                  </div>
                ))}
              </div>
              <h2 className="post-title">{post.title}</h2>
              <p className="post-body">{post.body}</p>
              <div className="post-photo">
                <PhotosApi
                  userId={post.userId}
                  photoId={3}
                  bigImg={true}
                />
              </div>
              <div className="post-additional-info">
                <div className="N1">
                  <AiOutlineFieldNumber />
                  <p>{post.id}</p>
                </div>
                <div className="N2">
                  <AiOutlineComment />
                  <p>5</p>
                </div>
                <div className="N3">
                  <AiOutlineLike />
                  <p>{Math.floor(Math.random() * 100)}</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PostList;

// двоятся посты при скролле
// не отображается лоадинг
