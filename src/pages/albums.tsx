import { FC, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PhotosApi from "../helpers/photosApi/photosApi";
import "./../styles/albums.css";

const Albums: FC = () => {
  const { userId } = useParams();
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchAlbums = async () => {
      let response;
      try {
        if (!userId) {
          response = await fetch("https://jsonplaceholder.typicode.com/albums");
        } else {
          response = await fetch(
            `https://jsonplaceholder.typicode.com/albums?userId=${userId}`
          );
        }
        const data = await response.json();
        setAlbums(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching albums:", error);
      }
    };
    fetchAlbums();
  }, [userId]);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <main className="section">
          <div className="container">
            <h1>Albums</h1>
            <ul className="albums-list">
              {albums.map((album: any) => (
                <Link
                  to={`/albums/${album.id}/photos`}
                  key={album.id}
                >
                  <li key={album.id}>
                    <div className="album-cover">
                      <PhotosApi
                        albumId={album.id}
                        userId={Number(userId)}
                        bigImg={true}
                        photoId={1}
                      />
                    </div>
                    <h2>#{album.id}</h2>
                    <h2>{album.title}</h2>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </main>
      )}
    </>
  );
};
export default Albums;
