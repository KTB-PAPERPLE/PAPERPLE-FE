interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onDelete,
}: DeleteConfirmationModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-50">
      <div
        className="fixed inset-0 border-1 border-line-1 drop-shadow-[0_4px_10px_rgba(0,0,0,0.1)]
   flex justify-center items-center"
      >
        <div className="bg-white rounded-[8px] w-[300px] p-[16px] shadow-lg">
          <p className="text-[12px] font-semibold mb-[12px] text-[#3D3D3D]">
            페이퍼를 삭제하시겠습니까?
          </p>
          <div className="w-full flex items-center justify-end">
            <button
              onClick={onClose}
              className="px-[8px] py-[4px] bg-system-gray-5 text-subtitle text-[8px] rounded-[4px]"
            >
              취소
            </button>

            <button
              onClick={onDelete}
              className="px-[8px] py-[4px] bg-system-black text-system-white text-[8px] ml-[4px] rounded-[4px]"
            >
              삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
