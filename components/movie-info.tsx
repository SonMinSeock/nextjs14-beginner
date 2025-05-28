import Link from 'next/link';
import { API_URL } from '../app/(Home)/page';
import styles from '../styles/movie-info.module.css';

export async function getMovie(id: string) {
  //   new Promise((resolve) => setTimeout(resolve, 3000));
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch movie info: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching movie info:', error);
    return null;
  }
}

export default async function MovieInfo({ id }: { id: string }) {
  const movie = await getMovie(id);

  if (!movie) {
    return <p>Failed to load movie info.</p>;
  }

  return (
    <div className={styles.container}>
      <img className={styles.poster} src={movie.poster_path} />
      <div className={styles.info}>
        <h1 className={styles.title}>{movie.title}</h1>
        <h3>⭐️ {movie.vote_average.toFixed(1)}</h3>
        <p>{movie.overview}</p>
        <Link href={movie.homepage} target={'_blank'} rel='noreferrer'>
          Homepage &rarr;
        </Link>
        <Link href={`/movies/${id}/similar`}>Similar &rarr;</Link>
      </div>
    </div>
  );
}
