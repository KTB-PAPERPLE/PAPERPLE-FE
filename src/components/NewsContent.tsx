interface NewsContentProps {
  title: string;
  link: string;
  summary: string;
  image: string;
}

const NewsContent = ({ title, link, summary, image }: NewsContentProps) => {
  const summaryLines = summary.split('\n');
  return (
    <article>
      <button className="text-[#26262C] font-semibold hover:underline text-left">
        {title}
      </button>
      <ul className="mt-[16px] text-[#444444] text-[12px]">{summaryLines}</ul>
      <img
        className="w-full h-[150px] mt-[16px] bg-cover bg-center bg-no-repeat rounded-[16px]"
        src={image}
        alt="기사의 대표 이미지"
      />
    </article>
  );
};

export default NewsContent;
