import { FC, useEffect, useState } from "react";
import "./../styles/users.css";
import PhotosApi from "../helpers/photosApi/photosApi";
import { Link } from "react-router-dom";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}
const Users: FC = () => {
  const [users, setUsers] = useState<User[]>([]);

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

  return (
    <>
      <div className="users-list">
        {users.map((user) => (
          <div
            key={user.id}
            className="user-container"
          >
            <div className="user-content">
              <picture className="user-picture">
                <PhotosApi
                  userId={user.id}
                  photoId={1}
                />
              </picture>
              <div className="user-text">
                <h2 className="user-name">{user.username}</h2>
                <p className="user-username">{user.name}</p>
                <p className="user-email">{user.email}</p>
                <Link to={`/users/${user.id}`}>
                  <p className="user-show-profile">Show Profile</p>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Users;
