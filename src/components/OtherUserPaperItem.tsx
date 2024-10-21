import { useEffect } from 'react';
import useAuthStore from '../stores/useAuthStore';
import { NewspaperInPaperDTO } from '../types/dto/paper/PaperDTO';
import OtherUserPaperFooter from './OtherUserPaperFooter';
import PaperContent from './PaperContent';
import PaperHeader from './PaperHeader';
import { useNavigate } from 'react-router-dom';

interface OtherUserPaperItemProps {
  paperId: number;
  nickname: string;
  profileImage: string;
  content: string;
  createdAt: string;
  isEdited: boolean;
  newspaper: NewspaperInPaperDTO | null;
  isLikedByCurrentUser: boolean;
}

const OtherUserPaperItem = ({
  paperId,
  nickname,
  profileImage,
  content,
  createdAt,
  isEdited,
  newspaper,
  isLikedByCurrentUser,
}: OtherUserPaperItemProps) => {
  const { isLoggedIn, nickname: authNickname } = useAuthStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn && nickname === authNickname) {
      navigate('/my-paper');
    }
  }, []);

  return (
    <div className="w-full px-4">
      <PaperHeader nickname={nickname} profileImage={profileImage} />
      <PaperContent content={content} newspaper={newspaper} />
      <OtherUserPaperFooter
        paperId={paperId}
        createdAt={createdAt}
        isEdited={isEdited}
        isLikedByCurrentUser={isLikedByCurrentUser}
      />
    </div>
  );
};

export default OtherUserPaperItem;
