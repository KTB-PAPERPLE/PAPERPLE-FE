export interface PaperDTO {
  paperId: number;
  nickname: string;
  profileImage: string;
  content: string;
  view: number; // UI에 안 쓰임
  image: string | null;
  createdAt: string;
  isEdited: boolean;
  likeNum: number;
  newspaper: NewspaperInPaperDTO | null;
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
