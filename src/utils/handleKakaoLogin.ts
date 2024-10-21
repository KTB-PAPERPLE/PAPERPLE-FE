import { API_BASE_URL } from '../config';

export const handleKakaoLogin = async () => {
  try {
    window.location.href = `${API_BASE_URL}/oauth2/authorization/kakao`;
  } catch (error) {
    console.error('로그인 실패:', error);
  }
};
