import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import RegisterPaper from './pages/RegisterPaper';
import { useEffect } from 'react';
import setScreenHeight from './utils/setScreenHeight';
import 'pretendard/dist/web/static/pretendard.css';
import LoginModal from './components/LoginModal';
import UserPage from './pages/UserPage';
import BottomTab from './components/BottomTab';
import EditProfilePage from './pages/EditProfilePage';
import MyPaperPage from './pages/MyPaperPage';
import OtherUserPapersPage from './pages/OtherUserPapersPage';
import axios from 'axios';
import { useStockStore } from './stores/useStockStore';
import { STOCK_API_SECRET_KEY } from './config';

function App() {
  const setStockData = useStockStore(state => state.setStockData);

  useEffect(() => {
    setScreenHeight();

    const handleResize = () => setScreenHeight();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchStockData = async () => {
      const url = `https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo?numOfRows=1000&resultType=json&serviceKey=${STOCK_API_SECRET_KEY}&basDt=20240909`;
      try {
        const response = await axios.get(url);
        const stockItems = response.data.response.body.items.item;

        const formattedStockData = stockItems.map((item: any) => ({
          stockName: item.itmsNm,
          stockCode: item.srtnCd,
          price: parseFloat(item.clpr), // 종가
          change: parseFloat(item.vs), // 전일 대비 가격
          changePercent: parseFloat(item.fltRt), // 전일 대비 등락률
        }));

        setStockData(formattedStockData); // 전체 주식 데이터를 저장
      } catch (error) {
        console.error(
          '주식 데이터를 가져오는 과정에서 오류가 발생했습니다. ',
          error,
        );
      }
    };

    fetchStockData();
  }, [setStockData]);

  return (
    <div className="w-full max-w-sm mx-auto h-real-screen relative">
      <BrowserRouter>
        <Header />
        <LoginModal />
        <div className="pb-[60px]">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/register-paper" element={<RegisterPaper />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="/edit-profile" element={<EditProfilePage />} />
            <Route path="/my-paper" element={<MyPaperPage />} />
            <Route
              path="/user/:userId/papers"
              element={<OtherUserPapersPage />}
            />
          </Routes>
        </div>
        <BottomTab />
      </BrowserRouter>
    </div>
  );
}

export default App;
