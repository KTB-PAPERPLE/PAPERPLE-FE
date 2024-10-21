import { ReactComponent as EditIcon } from '../assets/svg/EditIcon.svg';
import { ReactComponent as DeleteIcon } from '../assets/svg/DeleteIcon.svg';
import { formatDate } from '../utils/formateDate';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { useState } from 'react';
import DeleteConfirmationModal from './DeleteConfirmationModal';

interface MyPaperFooterProps {
  paperId: number;
  createdAt: string;
  isEdited: boolean;
}

const MyPaperFooter = ({
  paperId,
  createdAt,
  isEdited,
}: MyPaperFooterProps) => {
  const formattedCreatedAt: string = formatDate(createdAt);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const deletePaper = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/paper/${paperId}`, {
        withCredentials: true,
      });

      window.location.reload();
    } catch (error) {
      console.error('페이퍼 삭제 중에 오류가 발생했습니다. ', error);
    }
  };

  return (
    <div className="flex flex-col mt-[16px]">
      <div className="mt-[4px] flex items-center justify-between">
        <div className="text-[#4C4C57] text-[12px] flex items-center justify-center">
          <p>{`${formattedCreatedAt}${isEdited ? '(수정됨)' : ''}`}</p>
        </div>
        <div className="flex items-center justify-center gap-[8px]">
          <button>
            <EditIcon width={16} height={16} />
          </button>
          <button onClick={openModal}>
            <DeleteIcon width={16} height={16} />
          </button>
        </div>
      </div>

      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onDelete={deletePaper}
      />
    </div>
  );
};

export default MyPaperFooter;
