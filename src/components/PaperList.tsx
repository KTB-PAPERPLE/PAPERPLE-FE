import { useState, useEffect } from 'react';
import axios from 'axios';
import { PaperDTO } from '../types/dto/paper/PaperDTO';
import PaperItem from './PaperItem';
import { API_BASE_URL } from '../config';

const PaperList = () => {
  const [paperData, setPaperData] = useState<PaperDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const response = await axios.get<PaperDTO[]>(`${API_BASE_URL}/paper`, {
          withCredentials: true,
        });
        setPaperData(response.data);
      } catch (error) {
        setError('Failed to fetch papers.');
        console.error('Error fetching papers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPapers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="w-full">
      <ul>
        {paperData.map((paper, index) => (
          <li
            key={paper.paperId} // Changed from paper.content to paper.paperId for unique key
            className={`py-[16px] ${index !== paperData.length - 1 ? 'border-b' : ''}`}
          >
            <PaperItem
              nickname={paper.nickname}
              profileImage={paper.profileImage}
              content={paper.content}
              createdAt={paper.createdAt}
              isEdited={paper.isEdited}
              likeNum={paper.likeNum}
              newspaper={paper.newspaper}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PaperList;
