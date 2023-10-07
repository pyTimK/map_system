import { MouseEventHandler } from "react";
import BackIcon from "../svg/icon/BackIcon";
import { jsoFont } from "@/styles/fonts";

interface BackPageProps {
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const BackPage: React.FC<BackPageProps> = ({ onClick }) => {
  return (
    <div
      className="absolute top-12 left-12 flex gap-3 items-center cursor-pointer"
      onClick={onClick}
    >
      <BackIcon />
      <p className={`${jsoFont} text-black text-2xl`}>Back</p>
    </div>
  );
};

export default BackPage;
