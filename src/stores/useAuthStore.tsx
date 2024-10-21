import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isLoggedIn: boolean;
  nickname: string | null;
  profileImage: string | null;
  login: (nickname: string, profileImage: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      isLoggedIn: false,
      nickname: null,
      profileImage: null,

      login: (nickname: string, profileImage: string) => {
        set({ isLoggedIn: true, nickname, profileImage });
      },

      logout: () => {
        set({
          isLoggedIn: false,
          nickname: null,
          profileImage: null,
        });
      },
    }),
    {
      name: 'user-login-info',
      partialize: state => ({
        isLoggedIn: state.isLoggedIn,
        nickname: state.nickname,
        profileImage: state.profileImage,
      }),
    },
  ),
);

export default useAuthStore;
