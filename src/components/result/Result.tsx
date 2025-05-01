import { useState, useEffect, useRef } from "react";
import { LiaTimesSolid } from "react-icons/lia";

interface ResultProp {
  result: string;
}

export default function WinnerModal({ result }: ResultProp) {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const modalRef = useRef<HTMLDivElement>(null); // Ref for modal container

  const handleClose = () => {
    setIsModalOpen(false);
  };

  // Detect click outside the modal
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsModalOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 md:p-0">
      <div
        ref={modalRef}
        className="h-[20vh] w-full md:w-[600px] border border-gray-300 bg-white shadow-lg rounded-md  md:p-6"
      >
        <div className="flex justify-between items-center bg-[#4d96ff] rounded-t text-white px-2 h-[40px]">
          <h3 className="font-semibold text-lg">Winner!</h3>
          <LiaTimesSolid
            className="cursor-pointer text-xl hover:text-red-500 transition-colors"
            onClick={handleClose}
          />
        </div>

        <div className="mt-4">
          <p className="text-center text-lg text-green-500">
            🎉 Congratulations The winner is <strong>{result}</strong> 🎉
          </p>
        </div>
      </div>
    </div>
  );
}
