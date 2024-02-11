import { FC, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PhotosApi from "../helpers/photosApi/photosApi";
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
  email: string;
}

interface Comm {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

const SinglePost: FC = () => {
  const { postId } = useParams();
  const [post, setPost] = useState<Post>({
    id: 0,
    userId: 0,
    title: "",
    body: "",
  });
  const [comments, setComments] = useState<Comm[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      if (loading) {
        return;
      } else {
        setLoading(true);
        try {
          const response = await fetch(
            "https://jsonplaceholder.typicode.com/posts/" + postId
          );
          const data = await response.json();
          setPost(data);
        } catch (error) {
          console.error("Error fetching post:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchPost();
  }, []);

  useEffect(() => {
    const fetchComms = async () => {
      if (loading) {
        return;
      } else {
        setLoading(true);
        try {
          const response = await fetch(
            "https://jsonplaceholder.typicode.com/posts/" + postId + "/comments"
          );
          const data = await response.json();
          console.log(data);
          setComments(data);
        } catch (error) {
          console.error("Error fetching comments:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchComms();
  }, []);

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
  function userFinder(email: string) {
    return users.find((user) => user.email === email);
  }

  return (
    <main className="comms_and_post">
      <div
        key={post.id}
        className="post-container"
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
              <p>{comments.length}</p>
            </div>
            <div className="N3">
              <AiOutlineLike />
              <p>{Math.floor(Math.random() * 100)}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="comments">
        <h3></h3>
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="comment"
          >
            <PhotosApi
              userId={post.userId}
              photoId={comment.id}
            />
            <div className="comment-bd">
              <p className="comment-name">{comment.name}</p>
              <p className="comment-email">
                <span>from:</span> {comment.email}
              </p>
              <p className="comment-body">{comment.body}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};
export default SinglePost;
