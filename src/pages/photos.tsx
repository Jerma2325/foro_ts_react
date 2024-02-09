import { FC, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PhotosApi from "../helpers/photosApi/photosApi";
import "./../styles/photos.css";

const Photos: FC = () => {
  const { albumId } = useParams();
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPhotos = async () => {
      let response;
      try {
        if (!albumId) {
          response = await fetch("https://jsonplaceholder.typicode.com/photos");
        } else {
          response = await fetch(
            `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`
          );
        }
        const data = await response.json();
        setPhotos(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };
    fetchPhotos();
  }, [albumId]);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <main className="section">
          <div className="container">
            <h1>Photos</h1>
            <ul className="photos-list">
              {photos.map((photo: any) => (
                <li key={photo.id}>
                  <div className="photo-cover">
                    <img
                      src={photo.url}
                      alt={photo.title}
                    />
                  </div>
                  <h2>#{photo.id}</h2>
                  <h2>{photo.title}</h2>
                  <h2>Album {photo.albumId}</h2>
                </li>
              ))}
            </ul>
          </div>
        </main>
      )}
    </>
  );
};
export default Photos;
