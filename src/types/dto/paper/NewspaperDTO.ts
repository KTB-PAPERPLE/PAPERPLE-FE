export interface NewspaperDTO {
  id: number;
  isHotArticleBanner: boolean;
  title: string;
  link: string;
  image: string;
  summary: string;
  tags: string[];
  date: string;
  stockName: string;
  stockCode: string;
  publishedAt: string;
  createdAt: string;
  likeNum: number;
}
