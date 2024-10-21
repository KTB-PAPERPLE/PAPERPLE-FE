import { useNavigate, useLocation } from 'react-router-dom';
import { ReactComponent as HomePageIcon } from '../assets/svg/HomePageIcon.svg';
import { ReactComponent as RegisterPaperIcon } from '../assets/svg/RegisterPaperIcon.svg';
import { ReactComponent as FavoriteIcon } from '../assets/svg/FavoriteIcon.svg';
import { ReactComponent as UserPageIcon } from '../assets/svg/UserPageIcon.svg';

interface TabIconProps {
  path: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  alt: string;
  isSelected: boolean;
}

const TabIcon = ({ path, icon: Icon, alt, isSelected }: TabIconProps) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(path)}
      className={`cursor-pointer w-[39px] h-[39px] flex items-center justify-center ${
        isSelected ? 'bg-white rounded-full' : ''
      }`}
      aria-label={alt}
    >
      <Icon
        fill="white"
        className="w-[23px] h-[23px]"
        style={{
          filter: isSelected
            ? 'invert(54%) sepia(9%) saturate(3563%) hue-rotate(211deg) brightness(78%) contrast(88%)'
            : '',
        }}
      />
    </div>
  );
};

const BottomTab = () => {
  const location = useLocation();
  const tabs = [
    {
      path: '/',
      icon: HomePageIcon,
      alt: 'Navigation Icon to Home Page',
    },
    {
      path: '/register-paper',
      icon: RegisterPaperIcon,
      alt: 'Navigation Icon to Register Paper Page',
    },
    {
      path: '/favorite',
      icon: FavoriteIcon,
      alt: 'Navigation Icon to Favorite Page',
    },
    {
      path: '/user',
      icon: UserPageIcon,
      alt: 'Navigation Icon to User Page',
      isSelected: ['/user', '/edit-profile', '/my-paper'].includes(
        location.pathname,
      ),
    },
  ];

  return (
    <nav className="w-full max-w-sm h-[52px] fixed bottom-0 bg-[#B5AADE] rounded-t-[28px] flex items-center justify-between px-[40px]">
      {tabs.map(tab => (
        <TabIcon
          key={tab.path}
          path={tab.path}
          icon={tab.icon}
          alt={tab.alt}
          isSelected={tab.isSelected || location.pathname === tab.path}
        />
      ))}
    </nav>
  );
};

export default BottomTab;
