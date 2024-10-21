import { NewspaperInPaperDTO } from '../types/dto/paper/PaperDTO';
import MyPaperFooter from './MyPaperFooter';
import PaperContent from './PaperContent';
import PaperHeader from './PaperHeader';

interface MyPaperItemProps {
  paperId: number;
  nickname: string;
  profileImage: string;
  content: string;
  createdAt: string;
  isEdited: boolean;
  newspaper: NewspaperInPaperDTO | null;
}

const MyPaperItem = ({
  paperId,
  nickname,
  profileImage,
  content,
  createdAt,
  isEdited,
  newspaper,
}: MyPaperItemProps) => {
  return (
    <div className="w-full px-4">
      <PaperHeader nickname={nickname} profileImage={profileImage} />
      <PaperContent content={content} newspaper={newspaper} />
      <MyPaperFooter
        paperId={paperId}
        createdAt={createdAt}
        isEdited={isEdited}
      />
    </div>
  );
};

export default MyPaperItem;
