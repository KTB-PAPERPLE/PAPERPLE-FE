import { useEffect, useState } from 'react';
import { openLinkInNewBrowser } from '../utils/browserUtils';

interface NewsContentProps {
  title: string;
  link: string;
  summary: string;
  image: string;
}

const NewsContent = ({ title, link, summary, image }: NewsContentProps) => {
  const [formattedSummary, setFormattedSummary] = useState<string[]>([]);

  useEffect(() => {
    try {
      const parsedSummary = JSON.parse(summary);
      if (Array.isArray(parsedSummary)) {
        setFormattedSummary(parsedSummary);
      } else {
        setFormattedSummary([summary]);
      }
    } catch (error) {
      console.error('JSON 파싱 오류:', error);
      setFormattedSummary([summary]);
    }
  }, [summary]);

  return (
    <article>
      <button
        className="text-[#26262C] font-semibold hover:underline text-left"
        onClick={() => openLinkInNewBrowser(link)}
      >
        {title}
      </button>
      <ul className="mt-[16px] text-[#444444] text-[12px]">
        {formattedSummary.map((line, index) => (
          <li key={index}>{line}</li>
        ))}
      </ul>
      <img
        className="w-full h-[150px] mt-[16px] bg-cover bg-center bg-no-repeat rounded-[16px]"
        src={image}
        alt="기사의 대표 이미지"
      />
    </article>
  );
};

export default NewsContent;
