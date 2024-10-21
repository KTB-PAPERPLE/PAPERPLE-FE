import { NewspaperDTO } from '../types/dto/paper/NewspaperDTO';
import { NewspaperInPaperDTO } from '../types/dto/paper/PaperDTO';
import PaperContent from './PaperContent';
import PaperFooter from './PaperFooter';
import PaperHeader from './PaperHeader';

interface PaperItemProps {
  nickname: string;
  profileImage: string;
  content: string;
  createdAt: string;
  isEdited: boolean;
  likeNum: number;
  newspaper: NewspaperInPaperDTO | null;
}

const PaperItem = ({
  nickname,
  profileImage,
  content,
  createdAt,
  isEdited,
  likeNum,
  newspaper,
}: PaperItemProps) => {
  return (
    <div className="w-full">
      <PaperHeader nickname={nickname} profileImage={profileImage} />
      <PaperContent content={content} newspaper={newspaper} />
      <PaperFooter
        createdAt={createdAt}
        isEdited={isEdited}
        likeNum={likeNum}
      />
    </div>
  );
};

export default PaperItem;
