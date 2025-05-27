import { API_URL } from '../app/(Home)/page';
import styles from '../styles/movie-videos.module.css';

async function getVideos(id: string) {
  // new Promise((resolve) => setTimeout(resolve, 5000));
  // throw new Error('something broke...');
  const response = await fetch(`${API_URL}/${id}/videos`);
  return response.json();
}

export default async function MovieVideos({ id }: { id: string }) {
  const videos = await getVideos(id);
  return (
    <>
      <h3 className={styles.title}>Videos</h3>
      <div className={styles.container}>
        {videos.slice(0, 4).map((video) => (
          <iframe
            key={video.id}
            src={`https://youtube.com/embed/${video.key}`}
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
            title={video.name}
          />
        ))}
      </div>
    </>
  );
}
