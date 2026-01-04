import { X } from "lucide-react";

const Modal = ({ isOpen, onClose, children }) => {

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black-100/50 flex items-center flex-col justify-center z-50">
      <div className="bg-white space-y-6 rounded-2xl shadow-xl w-[90%] max-w-md p-6 relative">
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-black-100"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
