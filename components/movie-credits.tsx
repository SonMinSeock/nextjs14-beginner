import { API_URL } from '../app/(Home)/page';
import styles from '../styles/movie-credits.module.css';

async function getCredits(id: string) {
  // new Promise((resolve) => setTimeout(resolve, 5000));
  // throw new Error('something broke...');
  try {
    const response = await fetch(`${API_URL}/${id}/credits`);

    if (!response.ok) {
      throw new Error(`Failed to fetch movie credits: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching movie credits:', error);
    return [];
  }
}

export default async function MovieCredits({ id }: { id: string }) {
  const credits = await getCredits(id);

  if (!credits || credits.length === 0) {
    return <p>No credits found for this movie.</p>;
  }

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
