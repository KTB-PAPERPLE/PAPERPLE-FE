import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import URLStatusIndicator from '../components/URLStatusIndicator';
import { ModalType, UrlStatus } from '../types/enums';
import Modal from '../components/Modal';
import axios, { AxiosError } from 'axios';
import { API_BASE_URL } from '../config';

interface Paper {
  url: string;
  content: string;
  tags: string[];
}

interface RegisterPaperProps {
  isEditing?: boolean;
  existingPaper?: Paper | null;
}

const RegisterPaper = ({
  isEditing = false,
  existingPaper = null,
}: RegisterPaperProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialLink = location.state?.link || '';

  const [url, setUrl] = useState<string>(initialLink);
  const [urlStatus, setUrlStatus] = useState<UrlStatus>(UrlStatus.Idle);
  const [content, setContent] = useState<string>('');
  const [tags, setTags] = useState<string>('');
  const [tagList, setTagList] = useState<string[]>([]);
  const [modalType, setModalType] = useState<ModalType>(ModalType.None);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    if (isEditing && existingPaper !== null) {
      setUrl(existingPaper.url);
      setContent(existingPaper.content);
      setTagList(existingPaper.tags);
    }
  }, [isEditing, existingPaper]);

  const handleSubmit = async () => {
    console.debug('handleSubmit called');

    if (urlStatus === UrlStatus.Loading) {
      setModalType(ModalType.Loading);
      return;
    }

    if (urlStatus === UrlStatus.Invalid) {
      setModalType(ModalType.InvalidURL);
      return;
    }

    if (urlStatus === UrlStatus.Unavailable) {
      setModalType(ModalType.UnavailableURL);
      return;
    }

    try {
      let response;
      if (isEditing && existingPaper) {
        // 수정 API 호출
        response = await axios.post(
          `${API_BASE_URL}/paper`,
          { newspaperLink: url, content, tags: tagList },
          { withCredentials: true },
        );
      } else {
        // 등록 API 호출
        console.debug('post');
        response = await axios.post(
          `${API_BASE_URL}/paper`,
          { newspaperLink: url, content, tags: tagList },
          { withCredentials: true },
        );
      }
      // 서버 응답 상태 코드와 본문 로그 찍기
      console.debug('응답 상태 코드:', response.status);
      console.debug('응답 본문:', response.data);

      // 성공 시 처리
      setModalType(ModalType.None);
      navigate('/');
    } catch (error) {
      console.debug('Catch block entered');
      if (axios.isAxiosError(error)) {
        console.debug('응답 상태 코드:', error.response?.status);
        console.debug('응답 본문:', error.response?.data);
      } else {
        // 기타 에러 처리
        setErrorMessage('예상치 못한 오류가 발생했습니다.');
      }
      setModalType(ModalType.Loading);
    }
  };

  const closeModal = () => {
    setModalType(ModalType.None);
  };

  const handleTagKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tags.trim() !== '') {
      setTagList([...tagList, tags.trim()]);
      setTags('');
    }
  };

  const removeTag = (index: number) => {
    setTagList(tagList.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full overflow-hidden">
      <Modal type={modalType} onConfirm={closeModal} onCancel={closeModal} />
      <div className="top-[64px] left-[calc(100%-390px+16px)] rounded-[12px] flex flex-col justify-start items-center px-0 py-[10px] overflow-hidden border-[1px] border-[solid] border-[rgba(0,0,0,0.12)]">
        {/* Title Section */}
        <div className="flex-shrink-0 self-stretch flex flex-col justify-center items-start gap-y-[4px] gap-x-[4px] p-[16px] py-[10px] overflow-hidden">
          <h2 className="flex-shrink-0 text-title whitespace-nowrap text-[18px] leading-[25px] font-semibold flex items-center">
            페이퍼 등록하기
          </h2>
          <p className="flex-shrink-0 text-teritary-title whitespace-nowrap text-[12px] leading-[16px] font-medium flex items-center">
            뉴스를 등록하고 다른 사람과 이야기를 나눠보아요
          </p>
        </div>

        {/* Input Section */}
        <div className="flex-shrink-0 self-stretch flex flex-col justify-start items-start gap-y-[16px] gap-x-[16px] px-[16px] py-[10px] overflow-hidden">
          {/* URL Textfield */}
          <div className="flex-shrink-0 self-stretch flex flex-col justify-center items-start gap-y-[8px] gap-x-[8px] overflow-hidden">
            <div className="flex-shrink-0 flex flex-row justify-between items-center w-full">
              <h1 className="text-subtitle whitespace-nowrap text-[14px] leading-[19px] font-semibold">
                뉴스 URL
              </h1>
              <URLStatusIndicator urlStatus={urlStatus} />
            </div>
          </div>

          <div className="flex-shrink-0 self-stretch rounded-[4px] flex flex-col justify-center items-start px-[8px] py-[4px] overflow-hidden border-[1px] border-[solid] border-[rgba(0,0,0,0.12)]">
            <input
              type="text"
              value={url}
              onChange={e => setUrl(e.target.value)}
              placeholder="https://newspaper.co.kr/content"
              className="w-full flex-shrink-0 text-title text-[12px] leading-[16px] font-medium flex items-center"
            />
          </div>

          {/* Text Textfield */}
          <div className="flex-shrink-0 self-stretch flex flex-col justify-center items-start gap-y-[8px] gap-x-[8px] overflow-hidden">
            <h1 className="w-full flex-shrink-0 text-subtitle whitespace-nowrap text-[14px] leading-[19px] font-semibold flex items-center">
              이야기 <span className="text-system-red">*</span>
            </h1>
            <div className="flex-shrink-0 self-stretch rounded-[4px] flex flex-col justify-center items-start px-[8px] py-[4px] overflow-hidden border-[1px] border-[solid] border-[rgba(0,0,0,0.12)]">
              <textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="나누고 싶은 이야기를 적어주세요"
                className="w-full flex-shrink-0 self-stretch h-[282px] text-title text-[12px] leading-[16px] font-medium"
                maxLength={1000}
              ></textarea>
            </div>
          </div>

          {/* Tag Textfield */}
          <div className="flex-shrink-0 self-stretch flex flex-col justify-center gap-y-[8px] gap-x-[8px] overflow-hidden">
            <h1 className="flex-shrink-0 text-subtitle whitespace-nowrap text-[14px] leading-[19px] font-semibold flex items-center">
              태그
            </h1>
            <div className="flex-shrink-0 self-stretch rounded-[4px] flex flex-col justify-center px-[8px] py-[4px] overflow-hidden border-[1px] border-[solid] border-[rgba(0,0,0,0.12)]">
              <input
                type="text"
                value={tags}
                onChange={e => setTags(e.target.value)}
                onKeyPress={handleTagKeyPress}
                placeholder="#오늘점심뭐먹지"
                className="w-full flex-shrink-0 text-subtitle whitespace-nowrap text-[12px] leading-[16px] font-medium"
              />
            </div>

            {/* Tags */}
            <div className="flex-shrink-0 self-stretch rounded-[4px] flex flex-row flex-wrap justify-start items-center gap-x-[8px] gap-y-[4px] px-0 py-[4px] overflow-hidden">
              {tagList.map((tag, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 rounded-[4px] flex flex-row justify-start items-center gap-x-[4px] px-[8px] py-[4px] overflow-hidden bg-system-gray-6"
                >
                  <span className="flex-shrink-0 w-auto h-[16px] text-teritary-title whitespace-nowrap text-[12px] leading-[16px] font-medium">
                    {tag}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeTag(index)}
                    className="flex-shrink-0 text-placeholder whitespace-nowrap text-[8px] leading-[11px] font-medium flex items-center justify-center text-center"
                  >
                    ❌
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex-shrink-0 self-stretch flex justify-end items-end px-[16px] py-[10px] overflow-hidden">
            <button
              type="button" // This prevents form submission behavior
              onClick={handleSubmit}
              className="flex-shrink-0 rounded-[12px] flex flex-col justify-center items-end px-[16px] py-[8px] bg-[rgba(191,_69,_136,_0.8)]"
            >
              <span className="flex-shrink-0 text-system-white whitespace-nowrap text-[14px] leading-[19px] font-semibold flex items-center">
                {isEditing ? '수정' : '등록하기'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPaper;
