import { FC, useState, useEffect } from "react";

interface Props {
  userId?: number;
  photoId?: number;
  bigImg?: boolean;
  albumId?: number;
}

interface Photo {
  albumId: number;
  id: number;
  url: string;
  thumbnailUrl: string;
}

interface Album {
  userId: number;
  id: number;
}

const PhotosApi: FC<Props> = ({ userId, photoId, bigImg, albumId }) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [userPhotos, setUserPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/photos"
        );
        const data = await response.json();
        setPhotos(data);
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };

    fetchPhotos();
  }, []);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/albums"
        );
        const data = await response.json();
        setAlbums(data);
      } catch (error) {
        console.error("Error fetching albums:", error);
      }
    };

    fetchAlbums();
  }, []);

  useEffect(() => {
    const populateUserPhotos = () => {
      if (albumId) {
        const filteredPhotos = photos.filter((photo) => {
          return photo.albumId === albumId;
        });
        setUserPhotos(filteredPhotos);
      } else {
        const filteredPhotos = photos.filter((photo) => {
          return albums.some((album) => {
            return photo.albumId === album.id && album.userId === userId;
          });
        });
        setUserPhotos(filteredPhotos);
      }
    };

    populateUserPhotos();
  }, [photos, albums, userId]);

  return (
    <>
      {userPhotos.length > 0 &&
        (bigImg ? (
          <img
            key={
              photoId
                ? userPhotos[photoId].id
                : userPhotos[Math.floor(Math.random() * userPhotos.length)].id
            }
            src={
              photoId
                ? userPhotos[photoId].url
                : userPhotos[Math.floor(Math.random() * userPhotos.length)].url
            }
            alt="photo"
            className="photo"
          />
        ) : (
          <img
            key={
              photoId
                ? userPhotos[photoId].id
                : userPhotos[Math.floor(Math.random() * userPhotos.length)].id
            }
            src={
              photoId
                ? userPhotos[photoId].thumbnailUrl
                : userPhotos[Math.floor(Math.random() * userPhotos.length)]
                    .thumbnailUrl
            }
            alt="photo"
            className="photo"
          />
        ))}
    </>
  );
};

export default PhotosApi;
