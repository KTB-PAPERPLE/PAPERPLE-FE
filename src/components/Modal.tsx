import React from 'react';
import { ModalType } from '../types/enums';

interface ModalProps {
  type: ModalType;
  onConfirm: () => void;
  onCancel: () => void;
}

const modalContent = {
  [ModalType.TryToExit]: {
    title: '이야기가 저장되지 않습니다',
    message: '페이지를 벗어나면 작성 중인 이야기가 사라질 수 있어요',
    confirmText: '계속 작성하기',
    cancelText: '나가기',
  },
  [ModalType.Loading]: {
    title: '뉴스 내용을 요약하고 있는 중입니다',
    message: '이야기만 등록하시겠습니까?',
    confirmText: '등록하기',
    cancelText: '요약 기다려보기',
  },
  [ModalType.InvalidURL]: {
    title: '올바르지 않은 URL입니다',
    message: '입력하신 뉴스 URL을 다시 한 번 확인해주세요',
    confirmText: '확인',
    cancelText: '',
  },
  [ModalType.UnavailableURL]: {
    title: '뉴스 정보를 가져오는데 실패했습니다',
    message: '다른 플랫폼의 뉴스를 입력해보세요',
    confirmText: '확인',
    cancelText: '',
  },
};

const Modal: React.FC<ModalProps> = ({ type, onConfirm, onCancel }) => {
  if (type === ModalType.None) return null;

  const { title, message, confirmText, cancelText } = modalContent[type];

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-50 px-[64px]">
      <div className="rounded-[8px] w-[262px] h-[106px] flex flex-col gap-y-[12px] gap-x-[12px] p-[16px] overflow-hidden bg-[#FFFFFF] border-[1px] border-[solid] border-[rgba(0,0,0,0.12)]">
        <h1 className="flex-shrink-0 text-[#3D3D3D] whitespace-nowrap text-[12px] leading-[16px] font-semibold flex items-center">
          {title}
        </h1>
        <p className="flex-shrink-0 text-[#5A5A5A] whitespace-nowrap text-[8px] leading-[11px] font-medium flex items-center">
          {message}
        </p>
        <div className="flex-shrink-0 self-stretch justify-end flex flex-row items-center gap-x-[4px] gap-y-0 pl-0 pr-0 py-[4px]">
          {cancelText && (
            <button
              onClick={onCancel}
              className="flex-shrink-0 rounded-[4px] flex flex-col justify-end items-end px-[8px] py-[4px] border-[1px] border-[solid] border-[rgba(0,0,0,0.12)]"
            >
              <span className="flex-shrink-0 text-[#444444] whitespace-nowrap text-[8px] leading-[11px] font-medium flex items-center">
                {cancelText}
              </span>
            </button>
          )}
          <button
            onClick={onConfirm}
            className="flex-shrink-0 rounded-[4px] flex flex-col justify-end items-end px-[8px] py-[4px] bg-[#1E1E1E]"
          >
            <span className="flex-shrink-0 text-[#FFFFFF] whitespace-nowrap text-[8px] leading-[11px] font-semibold flex items-center">
              {confirmText}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
