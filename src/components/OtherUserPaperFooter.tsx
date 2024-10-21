import { useState } from 'react';
import { ReactComponent as FavoriteIcon } from '../assets/svg/FavoriteIcon.svg';
import { ReactComponent as FilledFavoriteIcon } from '../assets/svg/FilledFavoriteIcon.svg';
import { formatDate } from '../utils/formateDate';
import axios from 'axios';
import { API_BASE_URL } from '../config';

interface OtherUserPaperFooterProps {
  paperId: number;
  createdAt: string;
  isEdited: boolean;
  isLikedByCurrentUser: boolean;
}

const OtherUserPaperFooter = ({
  paperId,
  createdAt,
  isEdited,
  isLikedByCurrentUser,
}: OtherUserPaperFooterProps) => {
  const [liked, setLiked] = useState(isLikedByCurrentUser);
  const [animating, setAnimating] = useState(false);
  const formattedCreatedAt: string = formatDate(createdAt);

  const handleFavoriteIconClick = async () => {
    setLiked(!liked);
    setAnimating(true);

    try {
      if (liked) {
        // 이미 좋아요 상태일 때 -> DELETE 요청
        await axios.delete(`${API_BASE_URL}/paper/${paperId}/likes`, {
          withCredentials: true,
        });
      } else {
        // 좋아요가 안 되어 있을 때 -> POST 요청
        await axios.post(`${API_BASE_URL}/paper/${paperId}/likes`, null, {
          withCredentials: true,
        });
      }
    } catch (error) {
      console.error('좋아요 버튼 처리 중 오류가 발생했습니다.', error);
      setLiked(!liked);
    } finally {
      setTimeout(() => setAnimating(false), 300);
    }
  };

  return (
    <div className="flex flex-col mt-[16px]">
      <div className="mt-[4px] flex items-center justify-between">
        <div className="text-[#4C4C57] text-[12px] flex items-center justify-center">
          <p>{`${formattedCreatedAt}${isEdited ? '(수정됨)' : ''}`}</p>
        </div>
        <button
          className={`flex items-center justify-center gap-[8px] transition-transform duration-300 ${
            animating ? 'animate-bounce' : ''
          }`}
          onClick={handleFavoriteIconClick}
        >
          {liked ? (
            <FilledFavoriteIcon width={16} height={16} />
          ) : (
            <FavoriteIcon width={16} height={16} />
          )}
        </button>
      </div>
    </div>
  );
};

export default OtherUserPaperFooter;
