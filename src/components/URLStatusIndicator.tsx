import React from 'react';
import { UrlStatus } from '../types/enums';

interface URLStatusIndicatorProps {
  urlStatus: UrlStatus;
}

const URLStatusIndicator = ({ urlStatus }: URLStatusIndicatorProps) => {
  const getStatusProps = (status: UrlStatus) => {
    const baseContainerStyles =
      'flex-shrink-0 flex flex-row justify-end items-end';

    switch (status) {
      case UrlStatus.Loading:
        return {
          imgSrc:
            'https://image-resource.creatie.ai/135366163293663/135366179022307/f35ed7a9d768ed64c3166075fb683bbe.png',
          imgAlt: 'Loading icon',
          text: '정보를 가져오는 중입니다',
          textColor: 'text-system-disabled',
          containerStyles: baseContainerStyles,
        };
      case UrlStatus.Valid:
        return {
          imgSrc:
            'https://image-resource.creatie.ai/135366163293663/135366179022307/f35ed7a9d768ed64c3166075fb683bbe.png',
          imgAlt: 'Valid URL icon',
          text: '유효한 URL입니다',
          textColor: 'text-main-4',
          containerStyles: baseContainerStyles,
        };
      case UrlStatus.Invalid:
        return {
          imgSrc:
            'https://image-resource.creatie.ai/135366163293663/135366179022307/722dc7a1c85a7cd79886c0522a954a38.png',
          imgAlt: 'Invalid URL icon',
          text: 'URL을 다시 한번 확인해주세요',
          textColor: 'text-system-error',
          containerStyles: `${baseContainerStyles} overflow-hidden py-[3px]`,
        };
      case UrlStatus.Unavailable:
        return {
          imgSrc:
            'https://image-resource.creatie.ai/135366163293663/135366179022307/722dc7a1c85a7cd79886c0522a954a38.png',
          imgAlt: 'Unavailable platform icon',
          text: '해당 플랫폼은 정보를 가져올 수 없습니다',
          textColor: 'text-system-error',
          containerStyles: `${baseContainerStyles} overflow-hidden py-[3px]`,
        };
      default:
        return null;
    }
  };

  const statusProps = getStatusProps(urlStatus);

  if (!statusProps) return null;

  return (
    <div className="flex-shrink-0 flex flex-row justify-center items-center gap-y-0 px-0 py-[3px] overflow-hidden">
      <div className={statusProps.containerStyles}>
        <div className="w-[14px] h-[14px] relative">
          <img
            src={statusProps.imgSrc}
            alt={statusProps.imgAlt}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <span
          className={`flex-shrink-0 ${statusProps.textColor} whitespace-nowrap text-[10px] leading-[14px] font-semibold flex items-center`}
        >
          {statusProps.text}
        </span>
      </div>
    </div>
  );
};

export default URLStatusIndicator;
