import { useState } from 'react';
import ContentsTab from '../components/ContentsTab';
import NewsList from '../components/NewsList';
import { Tab } from '../types/enums';
import PaperList from '../components/PaperList';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [selectedTab, setSelectedTab] = useState<Tab>(Tab.News);

  return (
    <div className="w-full h-full relative">
      <div>
        <ContentsTab
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
      </div>
      <div className="px-[15px]">
        {selectedTab === Tab.News ? <NewsList /> : <PaperList />}
      </div>
      <div className="absolute bottom-[30px] left-1/2 transform -translate-x-1/2"></div>
    </div>
  );
};

export default HomePage;
