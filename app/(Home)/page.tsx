import { Metadata } from 'next';
import Movie from '../../components/movie';
import styles from '../../styles/home.module.css';

export const metadata: Metadata = {
  title: 'Home',
};

export const API_URL = 'https://nomad-movies.nomadcoders.workers.dev/movies';

const getMovies = async () => {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Failed to fetch movies: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
};

export default async function Home() {
  const movies = await getMovies();

  return (
    <div className={movies.length > 0 ? styles.container : ''}>
      {movies.length > 0 ? (
        movies.map((movie) => (
          <Movie
            key={movie.id}
            id={movie.id}
            title={movie.title}
            poster_path={movie.poster_path}
          />
        ))
      ) : (
        <p>No movies found.</p>
      )}
    </div>
  );
}
