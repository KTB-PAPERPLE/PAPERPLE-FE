import { create } from 'zustand';

export interface StockData {
  stockName: string;
  stockCode: string;
  price: number; // 종가
  change: number; // 전일 대비 가격
  changePercent: number; // 전일 대비 등락률
}

interface StockStore {
  stockData: StockData[];
  setStockData: (stockData: StockData[]) => void;
}

export const useStockStore = create<StockStore>(set => ({
  stockData: [],
  setStockData: stockData => set({ stockData }),
}));
