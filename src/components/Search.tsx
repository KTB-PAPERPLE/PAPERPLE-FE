import { ReactComponent as SearchIcon } from '../assets/svg/SearchIcon.svg';

interface SearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onBackClick: () => void;
}

const Search = ({ searchQuery, setSearchQuery, onBackClick }: SearchProps) => {
  return (
    <div className="w-full bg-gray-100 flex items-center">
      <button type="button" onClick={onBackClick}>
        <img
          src="https://image-resource.creatie.ai/135366163293663/135366179022307/5d9beed17b736aff8c11655e1defc3a8.png"
          alt="Back Arrow"
          className="flex-shrink-0 w-[36px] h-[36px] object-cover"
        />
      </button>
      <div className="flex-grow rounded-[16px] flex flex-row items-center gap-x-[8px] gap-y-0 px-[12px] py-[8px] bg-system-gray-5">
        <SearchIcon
          width={20}
          className="flex-shrink-0 w-[24px] h-[24px] object-cover"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={e => {
            setSearchQuery(e.target.value);
            console.debug('Input changed:', e.target.value);
          }}
          placeholder="검색어를 입력해주세요"
          className="flex-grow text-system-black text-[14px] leading-[24px] font-normal flex items-center justify-between text-justify bg-system-gray-5"
        />
      </div>
    </div>
  );
};

export default Search;
