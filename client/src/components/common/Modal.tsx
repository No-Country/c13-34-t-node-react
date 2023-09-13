import { ReactNode } from "react";
interface PropsTypes {
  showModal: boolean;
  onClose: () => void;
  message: ReactNode;
}

export const Modal = ({ showModal, onClose, message }: PropsTypes) => {
  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-start flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none max-sm:pb-12 max-sm:mx-4 rounded-md">
            <div className="relative w-auto my-6 2xl:mx-auto">
              <div className="border-0 rounded-lg shadow-lg relative w-full bg-white outline-none focus:outline-none">
                <div className="relative p-4 2xl:p-6">
                  <div className="2xl:my-4 text-slate-500 text-2xl font-bold leading-relaxed">
                    {message}
                  </div>
                </div>
                <div className="flex items-center justify-end p-2 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    onClick={onClose}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};
