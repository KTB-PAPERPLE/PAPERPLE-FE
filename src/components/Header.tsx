import { ReactComponent as NotificationIcon } from '../assets/svg/NotificationIcon.svg';
import { ReactComponent as SearchIcon } from '../assets/svg/SearchIcon.svg';
import { ReactComponent as LogoIcon } from '../assets/svg/LogoIcon.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuthStore from '../stores/useAuthStore';
import { handleKakaoLogin } from '../utils/handleKakaoLogin';
import axios from 'axios';
import { API_BASE_URL } from '../config';

const Header = () => {
  const { isLoggedIn } = useAuthStore();

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleSearchIconClick = () => {
    navigate('/search');
  };

  const handlePostTest = async () => {
    try {
      await axios.post(`${API_BASE_URL}/paper/test`, {
        url: '',
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="w-full h-[64px] px-[24px] bg-system-white flex items-center justify-between">
      <button onClick={handleLogoClick}>
        <LogoIcon width={88} height={21} fill="#1E1E1E" />
      </button>
      <div className="flex items-center justify-center space-x-1">
        {location.pathname === '/' && (
          <SearchIcon
            width={28}
            className="cursor-pointer"
            onClick={handleSearchIconClick}
          />
        )}
        {isLoggedIn ? (
          <NotificationIcon width={28} />
        ) : (
          <button
            className="w-[63px] h-[27px] bg-system-black text-system-white rounded-[4px] font-semibold text-[14px]"
            onClick={handleKakaoLogin}
          >
            로그인
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
