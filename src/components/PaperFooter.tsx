import { ReactComponent as FavoriteIcon } from '../assets/svg/FavoriteIcon.svg';
import { formatDate } from '../utils/formateDate';

interface PaperFooterProps {
  createdAt: string;
  isEdited: boolean;
  likeNum: number;
}

const PaperFooter = ({ createdAt, isEdited, likeNum }: PaperFooterProps) => {
  const formattedCreatedAt = formatDate(createdAt);

  return (
    <div className="flex flex-col mt-[16px]">
      <div className="mt-[4px] flex items-center justify-between">
        <div className="text-[#4C4C57] text-[12px] flex items-center justify-center">
          <p>{`${formattedCreatedAt}${isEdited ? '(수정됨)' : ''}`}</p>
        </div>
        <div className="flex items-center justify-center gap-[2px]">
          <FavoriteIcon width={16} height={16} />
          <p className="text-[14px]">{likeNum}</p>
        </div>
      </div>
    </div>
  );
};

export default PaperFooter;
