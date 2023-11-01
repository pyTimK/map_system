import Modal from "react-modal";
import MyButton from "./MyButton";
import { twMerge } from "tailwind-merge";
import CrossCircleIcon from "../svg/icon/CrossCircleIcon";

interface MyModalProps {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  title: string;
  children: React.ReactNode;
  height?: string;
  width?: string;
  className?: string;
  classNameInner?: string;
  classNameContent?: string;
  hideLine?: boolean;
  hasExitButton?: boolean;
}

const MyModal: React.FC<MyModalProps> = ({
  isOpen,
  closeModal,
  openModal,
  title,
  children,
  height,
  width,
  className,
  classNameInner,
  classNameContent,
  hideLine = false,
  hasExitButton = false,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      ariaHideApp={false}
      className={twMerge(
        "absolute inset-0 w-fit -translate-x-1/2 -translate-y-1/2 h-fit top-1/2 ",
        className
      )}
      onRequestClose={closeModal}
      // style={customStyles}
    >
      <div
        className={twMerge("relative m-auto", classNameInner)}
        style={{ height, width }}
      >
        {/* BACKGROUND LINE */}
        <div
          className={twMerge(
            "absolute w-full h-full rotate-[-2deg] border-2 border-white rounded-xl",
            hideLine && "hidden"
          )}
        ></div>

        {/* MAIN CONTENT */}
        <div
          className={twMerge(
            "absolute w-full h-full  bg-white px-5 py-5 rounded-xl ",
            classNameContent
          )}
        >
          <p className="text-2xl font-bold text-center text-smooth_black">
            {title}
          </p>
          {children}

          {/* EXIT BUTTON  */}
          <div className="absolute top-5 left-5">
            <CrossCircleIcon onClick={closeModal} />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MyModal;
