import StockBanner from './StockBanner';

interface ContentsTabProps {
  nickname: string;
  profileImage: string;
  stockName?: string | undefined;
  stockCode?: string | undefined;
}

const PaperHeader = ({
  nickname,
  profileImage,
  stockName,
  stockCode,
}: ContentsTabProps) => {
  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex items-center justify-center">
        <img
          className="w-[24px] h-[24px] bg-cover bg-center bg-no-repeat rounded-full"
          src={profileImage}
          alt="유저의 대표 이미지"
        />
        <p className="ml-[4px] text-[14px] font-semibold text-system-black">
          {nickname}
        </p>
      </div>
      {stockName && stockCode && (
        <StockBanner stockName={stockName} stockCode={stockCode} />
      )}
    </div>
  );
};

export default PaperHeader;
