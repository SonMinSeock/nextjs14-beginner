import Movie from '../../../../../components/movie';
import { IParams } from '../page';
import styles from '../../../../../styles/movie-similar.module.css';
import { Metadata } from 'next';
import { API_URL } from '../../../../../lib/constans';

export const metadata: Metadata = {
  title: 'Similar',
};

const getSimilars = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/${id}/similar`);

    if (!response.ok) {
      throw new Error(`Failed to fetch similar movies: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching similar movies:', error);
    return [];
  }
};

export default async function Similar({ params: { id } }: IParams) {
  const similars = await getSimilars(id);

  if (!similars || similars.length === 0) {
    return <p>No similar movies found.</p>;
  }

  return (
    <div className={similars.length > 0 ? styles.container : ''}>
      {similars.map((similar) => (
        <Movie
          key={similar.id}
          id={similar.id}
          title={similar.title}
          poster_path={similar.backdrop_path}
        />
      ))}
    </div>
  );
}
