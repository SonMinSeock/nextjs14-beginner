import { API_URL } from '../../../../(Home)/page';
import Movie from '../../../../../components/movie';
import { IParams } from '../page';
import styles from '../../../../../styles/movie-similar.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Similar',
};

const getSimilars = async (id: string) => {
  const response = await fetch(`${API_URL}/${id}/similar`);
  return response.json();
};

export default async function Similar({ params: { id } }: IParams) {
  const similars = await getSimilars(id);
  return (
    <div className={styles.container}>
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
