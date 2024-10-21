import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config';
import { ReactComponent as BackArrowIcon } from '../assets/svg/BackArrowIcon.svg';
import { useNavigate } from 'react-router-dom';
import { UserPaperDTO } from '../types/dto/paper/UserPaperDTO';
import useAuthStore from '../stores/useAuthStore';
import MyPaperItem from '../components/MyPaperItem';

const MyPaperPage = () => {
  const [papers, setPapers] = useState<UserPaperDTO[]>([]);
  const { nickname, profileImage } = useAuthStore();

  const navigate = useNavigate();

  const handleBackArrowClick = () => {
    navigate('/user');
  };

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/paper/my-papers`, {
          withCredentials: true,
        });

        setPapers(response.data);
      } catch (error) {
        console.error('Paper 리스트 API 요청 실패:', error);
      }
    };

    fetchPapers();
  }, []);

  return (
    <section className="w-full h-full">
      <header className="relative flex items-center pb-[10px] border-b-[1px] border-line-1">
        <button className="absolute left-4" onClick={handleBackArrowClick}>
          <BackArrowIcon />
        </button>
        <p className="mx-auto text-center font-semibold  text-[14px]">
          내 페이퍼
        </p>
      </header>
      {papers.length > 0 ? (
        <ul>
          {papers.map((paper, index) => (
            <li
              key={paper.content}
              className={`py-[16px] ${index != papers.length - 1 ? 'border-b' : ''}`}
            >
              <MyPaperItem
                paperId={paper.paperId}
                nickname={nickname || ''}
                profileImage={profileImage || ''}
                content={paper.content}
                createdAt={paper.createdAt}
                isEdited={paper.isEdited}
                newspaper={paper.newspaper}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="w-full h-full mt-[30px] my-auto flex items-center justify-center font-semibold">
          작성한 게시글이 없습니다.
        </p>
      )}
    </section>
  );
};

export default MyPaperPage;
