import { Tab } from '../types/enums';

interface ContentsTabProps {
  selectedTab: Tab;
  setSelectedTab: (tab: Tab) => void;
}

const ContentsTab = ({ selectedTab, setSelectedTab }: ContentsTabProps) => {
  const tabs = [
    { label: Tab.News, value: Tab.News },
    { label: Tab.Paper, value: Tab.Paper },
  ];

  return (
    <div className="w-full relative drop-shadow-[0_1px_0_#D4D4D8] text-[14px] font-bold">
      <div className="w-full h-[40px] bg-system-white px-[16px] flex items-center justify-center">
        {tabs.map(tab => (
          <div key={tab.value} className="relative flex-1 flex justify-center">
            <button
              className={`px-4 ${selectedTab === tab.value ? 'text-system-black font-extrabold' : 'text-[#4C4C57]'}`}
              onClick={() => setSelectedTab(tab.value)}
            >
              {tab.label}
            </button>
            {selectedTab === tab.value && (
              <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-[115px] h-[4px] bg-main-1 rounded-full"></span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentsTab;
