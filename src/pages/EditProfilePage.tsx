import { useNavigate } from 'react-router-dom';
import { ReactComponent as BackArrowIcon } from '../assets/svg/BackArrowIcon.svg';
import { ReactComponent as PhotoLibraryIcon } from '../assets/svg/PhotoLibraryIcon.svg';
import { ReactComponent as ErrorIcon } from '../assets/svg/ErrorIcon.svg';
import useAuthStore from '../stores/useAuthStore';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import Webcam from 'react-webcam';
import { uploadImageToS3 } from '../utils/uploadImageToS3';
import { UserDTO } from '../types/dto/user/UserDTO';

const EditProfilePage = () => {
  const { nickname, profileImage, login } = useAuthStore();
  const [newNickname, setNewNickname] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const navigate = useNavigate();

  const [imageUrl, setImageUrl] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isWebcamOpen, setIsWebcamOpen] = useState<boolean>(false);
  const [isNicknameValid, setIsNicknameValid] = useState<boolean>(true); // 닉네임 유효성 상태

  const webcamRef = useRef<Webcam>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (nickname != null) {
      setNewNickname(nickname);
    }

    if (profileImage != null) {
      setImageUrl(profileImage);
    }
  }, [nickname, profileImage]);

  const handleBackArrowClick = () => {
    navigate('/user');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false); // 외부 클릭 시 드롭다운 닫기
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside); // 외부 클릭 이벤트 탐지를 위한 이벤트 리스너
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const changeProfileImage = async () => {
    if (imageUrl == profileImage || imageFile == null) return;

    try {
      const imageUrlInS3 = await uploadImageToS3(imageFile);

      // user profile image 업데이트
      await axios.patch(
        `${API_BASE_URL}/user/profile-image`,
        {
          profileImage: imageUrlInS3,
        },
        {
          withCredentials: true,
        },
      );
    } catch (e) {
      console.error(
        '프로필 이미지를 변경하는 과정에서 오류가 발생했습니다. ',
        e,
      );
    }
  };

  const changeNickname = async () => {
    if (newNickname === nickname) return;

    try {
      await axios.patch(
        `${API_BASE_URL}/user/nickname`,
        {
          nickname: newNickname,
        },
        {
          withCredentials: true,
        },
      );
    } catch (error) {
      // TO DO - error 타입에 따라 다른 에러 메세지 표시
      setErrorMessage('이미 사용 중인 닉네임입니다.');
      setIsNicknameValid(false);
      throw new Error('닉네임 중복 오류: 이미 사용 중인 닉네임입니다.');
    }
  };

  const uploadImage = (file: File | undefined) => {
    if (file == undefined) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const imageURL = reader.result as string;
      setImageUrl(imageURL);
      setImageFile(file);
    };
    reader.readAsDataURL(file);
  };

  const resetToDefaultImage = () => {
    const defaultImageUrl = '/path/to/default/profile/image.jpg'; // TO DO - 기본 이미지 경로 수정
    setImageUrl(defaultImageUrl);
    setImageFile(null); // 파일 초기화
  };

  const validateNickname = (nickname: string): string => {
    if (nickname.length < 1) {
      return '글자는 최소 1자 이상이어야 합니다';
    }
    if (nickname.length > 30) {
      return '최대 30글자로 설정할 수 있습니다';
    }

    const nicknameRegex = /^[가-힣ㄱ-ㅎa-zA-Z0-9-_]+$/;
    if (!nicknameRegex.test(nickname)) {
      return "한글, 영어, 숫자, '-', '_'만 사용 가능합니다";
    }

    return '';
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewNickname(value);
    const validationMessage = validateNickname(value); // 유효성 검사 후 에러 메시지 설정
    setErrorMessage(validationMessage);
    if (validationMessage != '') {
      setIsNicknameValid(false);
    } else {
      setIsNicknameValid(true);
    }
  };

  const handleSaveProfile = async () => {
    try {
      await changeNickname();
      await changeProfileImage();

      // user 정보 업데이트
      const response = await axios.get(`${API_BASE_URL}/user`, {
        withCredentials: true,
      });

      const userInfo: UserDTO = response.data;
      login(userInfo.nickname, userInfo.profileImage);
      navigate('/user');
    } catch (e) {
      console.error('프로필 정보를 수정하는 중에 오류가 발생했습니다.', e);
    }
  };

  const handleCapture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        fetch(imageSrc)
          .then(res => res.blob())
          .then(blob => {
            const file = new File([blob], 'captured-image.jpg', {
              type: 'image/jpeg',
            });
            setImageFile(file);
            setImageUrl(imageSrc);
            setIsWebcamOpen(false);
          });
      }
    }
  };

  return (
    <div className="w-full text-sm">
      <header className="relative flex items-center h-16">
        <button className="absolute left-4" onClick={handleBackArrowClick}>
          <BackArrowIcon />
        </button>
        <p className="mx-auto text-center font-semibold">프로필 수정</p>
      </header>
      <section className="relative w-full flex flex-col items-center px-6 py-4">
        <div className="relative w-[96px] h-[96px] mb-[47px]">
          <img
            className="w-full h-full rounded-full bg-cover bg-center"
            src={imageUrl}
            alt={`${nickname}의 프로필 이미지`}
          />
          <button
            className="w-[30px] h-[30px] rounded-full bg-system-salmon flex items-center justify-center absolute bottom-0 right-0"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <PhotoLibraryIcon />
          </button>

          {isDropdownOpen && (
            <ul
              ref={dropdownRef}
              className="w-[165px] absolute bottom-[-170px] right-[-130px] bg-white border rounded-lg shadow-lg py-2 text-[12px]"
            >
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setIsWebcamOpen(true);
                  setIsDropdownOpen(false);
                }}
              >
                사진 찍기
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  document.getElementById('upload-image')?.click();
                  setIsDropdownOpen(false);
                }}
              >
                라이브러리에서 가져오기
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  resetToDefaultImage();
                  setIsDropdownOpen(false);
                }}
              >
                기본 프로필 이미지로 변경
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => setIsDropdownOpen(false)}
              >
                닫기
              </li>
            </ul>
          )}
        </div>

        {/* 파일 업로드용 인풋 (숨김) */}
        <input
          id="upload-image"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={event => {
            if (event.target.files && event.target.files.length > 0) {
              uploadImage(event.target.files[0]);
            }
          }}
        />

        {/* 닉네임 입력 필드 */}
        <div className="w-full flex flex-col mt-8">
          <p className="font-semibold">닉네임</p>
          <input
            className={`mt-[8px] border rounded p-[12px] ${
              isNicknameValid ? '' : 'border-system-error'
            }`}
            type="text"
            value={newNickname}
            onChange={handleNicknameChange}
          />
          <div className="flex items-center justify-end h-[20px]">
            {!isNicknameValid && (
              <>
                <ErrorIcon width={14} height={14} />
                <p className="ml-[2px] text-system-error text-[10px] font-semibold">
                  {errorMessage}
                </p>
              </>
            )}
          </div>
        </div>

        {/* 프로필 저장 버튼 */}
        <button
          className={`w-full mt-24 h-10 rounded-md font-semibold text-white ${
            isNicknameValid
              ? 'bg-sub-background-1'
              : 'bg-system-disabled cursor-not-allowed'
          }`}
          onClick={handleSaveProfile}
          disabled={!isNicknameValid}
        >
          수정 완료
        </button>
      </section>

      {/* 웹캠 모달 */}
      {isWebcamOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-md w-11/12 max-w-md">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="w-full h-auto rounded-md"
              videoConstraints={{
                facingMode: 'user',
              }}
            />
            <div className="flex justify-between mt-4">
              <button
                className="bg-green-500 text-white rounded-md px-4 py-2"
                onClick={handleCapture}
              >
                촬영
              </button>
              <button
                className="bg-gray-500 text-white rounded-md px-4 py-2"
                onClick={() => setIsWebcamOpen(false)}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfilePage;
