import { useState } from 'react';
import { NewspaperInPaperDTO } from '../types/dto/paper/PaperDTO';
import NewsItem from './NewsItem';
import { openLinkInNewBrowser } from '../utils/browserUtils';

interface PaperContentProps {
  content: string;
  newspaper: NewspaperInPaperDTO | null;
}

const PaperContent = ({ content, newspaper }: PaperContentProps) => {
  const [isSummaryVisible, setIsSummaryVisible] = useState(false);

  const toggleSummaryVisibility = () => {
    setIsSummaryVisible(prevState => !prevState);
  };

  return (
    <article className="mt-[16px]">
      <p className="text-system-black text-[14px]">{content}</p>
      {newspaper && (
        <div className="w-full border border-line-1 rounded-[8px] px-[8px] py-[12px] mt-[16px]">
          {isSummaryVisible ? (
            <NewsItem
              isShowHeader={false}
              isHotArticleBanner={false}
              title={newspaper.title}
              link={newspaper.link}
              summary={newspaper.summary}
              image={newspaper.image}
              tags={newspaper.tags}
              publishedAt={newspaper.publishedAt}
              createdAt={newspaper.createdAt}
              likeNum={newspaper.likeNum}
              stockName={newspaper.stockName}
              stockCode={newspaper.stockCode}
            />
          ) : (
            <article>
              <div className="flex justify-center">
                <div>
                  <button
                    className="text-subtitle font-semibold hover:underline text-left"
                    onClick={() => openLinkInNewBrowser(newspaper.link)}
                  >
                    {newspaper.title}
                  </button>
                  <button
                    onClick={toggleSummaryVisibility}
                    className="text-subtitle text-[12px] font-semibold mt-[4px]"
                  >
                    {isSummaryVisible ? '' : '> 요약 보기'}
                  </button>
                </div>
                <img
                  className="w-[120px] h-[80px] bg-cover bg-center bg-no-repeat rounded-[16px]"
                  src={
                    'https://www.journalist.or.kr/data/photos/20171044/art_1509452169.jpg'
                  }
                  alt="기사의 대표 이미지"
                />
              </div>
            </article>
          )}
        </div>
      )}
    </article>
  );
};

export default PaperContent;
