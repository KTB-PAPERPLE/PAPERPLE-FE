import { useNavigate } from 'react-router-dom';
import NewsContent from './NewsContent';
import NewsFooter from './NewsFooter';
import NewsHeader from './NewsHeader';

interface NewsItemProps {
  isShowHeader?: boolean;
  isHotArticleBanner: boolean;
  title: string;
  link: string;
  summary: string;
  image: string;
  tags: string[];
  publishedAt: string;
  createdAt: string;
  likeNum: number;
  stockName: string;
  stockCode: string;
}

const NewsItem = ({
  isShowHeader = true,
  isHotArticleBanner,
  title,
  link,
  summary,
  image,
  tags,
  publishedAt,
  createdAt,
  likeNum,
  stockName,
  stockCode,
}: NewsItemProps) => {
  const navigate = useNavigate();

  const handleWriteClick = () => {
    navigate('./register-paper', { state: { link } });
  };

  return (
    <div className="w-full">
      {isShowHeader && (
        <NewsHeader
          isHotArticleBanner={isHotArticleBanner}
          stockName={stockName}
          stockCode={stockCode}
        />
      )}
      <NewsContent title={title} link={link} summary={summary} image={image} />
      <NewsFooter
        tags={tags}
        link={link}
        publishedAt={publishedAt}
        createdAt={createdAt}
        likeNum={likeNum}
        handleWriteClick={handleWriteClick}
      />
    </div>
  );
};

export default NewsItem;
