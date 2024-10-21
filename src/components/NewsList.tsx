import { useEffect, useState } from 'react';
import axios from 'axios';
import { NewspaperDTO } from '../types/dto/paper/NewspaperDTO';
import NewsItem from './NewsItem';
import { API_BASE_URL } from '../config';

const NewsList = () => {
  const [newsData, setNewsData] = useState<NewspaperDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const response = await axios.get<NewspaperDTO[]>(
          `${API_BASE_URL}/news-paper`,
          {
            withCredentials: true,
          },
        );
        setNewsData(response.data);
      } catch (error) {
        setError('Failed to fetch news.');
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsData();
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>오류 발생: {error}</div>;

  return (
    <section className="w-full">
      <ul>
        {newsData.map((news, index) => (
          <li
            key={news.id} // id를 키로 사용
            className={`py-[16px] ${index !== newsData.length - 1 ? 'border-b' : ''}`}
          >
            <NewsItem
              isHotArticleBanner={true}
              stockName={'삼성전자'}
              stockCode={'005930'}
              title={news.title}
              link={news.link}
              summary={news.summary}
              image={news.image}
              tags={['IT/과학', '반도체']}
              publishedAt={news.publishedAt}
              createdAt={news.createdAt}
              likeNum={0}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default NewsList;
