import { ReactComponent as FavoriteIcon } from '../assets/svg/FavoriteIcon.svg';
import { StockData, useStockStore } from '../stores/useStockStore';

interface StockBannerProps {
  stockName: string;
  stockCode: string;
}

const StockBanner = ({ stockName, stockCode }: StockBannerProps) => {
  const { stockData } = useStockStore();

  const stockInfo = stockData.find(
    (stock: StockData) =>
      stock.stockName === stockName || stock.stockCode === stockCode,
  );

  if (!stockInfo) {
    return <div></div>;
  }

  return (
    <div className="h-[24px] bg-opposite-background-4 px-[4px] py-[5px] rounded-button flex items-center justify-center">
      <FavoriteIcon width={14} />
      <div className="ml-[4px] flex items-baseline justify-center font-semibold text-[12px]">
        <p className="text-teritary-title">{stockInfo.stockName}</p>
        <p className="ml-[4px] text-system-red">
          {stockInfo.price.toLocaleString()}
        </p>
        <p
          className={`ml-[4px] ${
            stockInfo.change >= 0 ? 'text-system-green' : 'text-system-red'
          } text-[8px]`}
        >
          {stockInfo.change >= 0 ? '🔺' : '🔻'}
          {stockInfo.change.toLocaleString()} ({stockInfo.changePercent}%)
        </p>
      </div>
    </div>
  );
};

export default StockBanner;
