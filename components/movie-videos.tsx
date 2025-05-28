import { API_URL } from '../lib/constans';
import styles from '../styles/movie-videos.module.css';

async function getVideos(id: string) {
  // new Promise((resolve) => setTimeout(resolve, 5000));
  // throw new Error('something broke...');
  try {
    const response = await fetch(`${API_URL}/${id}/videos`);

    if (!response.ok) {
      throw new Error(`Failed to fetch videos: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching videos:', error);
    return [];
  }
}

export default async function MovieVideos({ id }: { id: string }) {
  const videos = await getVideos(id);

  if (!videos || videos.length === 0) {
    return <p>No videos found for this movie.</p>;
  }

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
