import StockBanner from './StockBanner';

interface NewsHeaderProps {
  isHotArticleBanner: boolean;
  stockName: string;
  stockCode: string;
}

const NewsHeader = ({
  isHotArticleBanner,
  stockName,
  stockCode,
}: NewsHeaderProps) => {
  return (
    <div className="w-full flex items-center justify-between mb-[16px]">
      {isHotArticleBanner && (
        <p className="w-[57px] h-[28px] rounded-full bg-sub-background-1 text-[14px] text-system-white flex items-center justify-center">
          Hot
        </p>
      )}
      <div className={`ml-auto ${isHotArticleBanner ? 'ml-[8px]' : ''}`}>
        <StockBanner stockName={stockName} stockCode={stockCode} />
      </div>
    </div>
  );
};

export default NewsHeader;
