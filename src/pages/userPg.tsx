import { FC, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./../styles/userPg.css";
import PhotosApi from "../helpers/photosApi/photosApi";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

const UserPg: FC = ({}) => {
  const [user, setUser] = useState<User | null>(null);
  const { userId } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users/" + userId
        );
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      {user ? (
        <>
          <div className="usr-container">
            <div className="usr-content">
              <h1>{user.username}'s Profile</h1>
              <div className="usr-picture">
                <PhotosApi
                  userId={user.id}
                  photoId={1}
                />
              </div>
              <div className="flexCont">
                <div className="usr-data">
                  <h2>Data</h2>
                  <div>
                    <p>Username:</p>
                    <span>{user.username}</span>
                  </div>
                  <div>
                    <p>Full Name:</p>
                    <span>{user.name}</span>
                  </div>
                  <div>
                    <p>Email:</p>
                    <span>{user.email}</span>
                  </div>
                  <div>
                    <p>Phone:</p>
                    <span>{user.phone}</span>
                  </div>
                  <div>
                    <p>Website:</p>
                    <span>{user.website}</span>
                  </div>
                </div>
                <h2>Address</h2>
                <div className="usr-address">
                  <div>
                    <p>City:</p>
                    <span>{user.address.city}</span>
                  </div>
                  <div>
                    <p>Street:</p>
                    <span>{user.address.street}</span>
                  </div>
                  <div>
                    <p>Zipcode:</p>
                    <span>{user.address.zipcode}</span>
                  </div>
                  <div>
                    <p>Suite:</p>
                    <span>{user.address.suite}</span>
                  </div>
                  <div>
                    <p>Coordinates:</p>
                    <span>
                      {user.address.geo.lat}, {user.address.geo.lng}
                    </span>
                  </div>
                </div>
                <h2>Company</h2>
                <div className="usr-company">
                  <div>
                    <p>Name:</p>
                    <span>{user.company.name}</span>
                  </div>
                  <div>
                    <p>Catch Phrase:</p>
                    <span>{user.company.catchPhrase}</span>
                  </div>
                  <div>
                    <p>Bs:</p>
                    <span>{user.company.bs}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="usr-items">
              <button className="usr-posts">
                <Link
                  className="link-posts"
                  to={`/users/${user.id}/posts`}
                >
                  <h2>Posts</h2>
                </Link>
              </button>
              <button className="usr-albums">
                <Link
                  className="link-albums"
                  to={`/users/${user.id}/albums`}
                >
                  <h2>Albums</h2>
                </Link>
              </button>
              <button className="usr-todos">
                <Link
                  className="link-todos"
                  to={`/users/${user.id}/todos`}
                >
                  <h2>Todos</h2>
                </Link>
              </button>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default UserPg;
