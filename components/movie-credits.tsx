import { API_URL } from '../app/(Home)/page';
import styles from '../styles/movie-credits.module.css';

async function getCredits(id: string) {
  // new Promise((resolve) => setTimeout(resolve, 5000));
  // throw new Error('something broke...');
  const response = await fetch(`${API_URL}/${id}/credits`);
  return response.json();
}

export default async function MovieCredits({ id }: { id: string }) {
  const credits = await getCredits(id);

  return (
    <>
      <h3 className={styles.title}>Credits</h3>
      <div className={styles.container}>
        {credits.slice(0, 4).map((credit) => (
          <div key={credit.id}>
            <img src={credit.profile_path} alt={credit.name} />
            <span>{credit.name}</span>
          </div>
        ))}
      </div>
    </>
  );
}
