export interface UserPaperDTO {
  paperId: number;
  content: string;
  view: number; // UI에 안 쓰임
  image: string | null;
  createdAt: string;
  nickname: string;
  profileImage: string;
  isEdited: boolean;
  likeNum: number;
  newspaper: NewspaperInPaperDTO | null;
  isLikedByCurrentUser: boolean;
}

export interface NewspaperInPaperDTO {
  title: string;
  link: string;
  image: string;
  summary: string;
  tags: string[];
  date: string;
  publishedAt: string;
  createdAt: string;
  likeNum: number;
  stockName: string;
  stockCode: string;
}
