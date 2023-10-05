import { jsoFont } from "@/styles/fonts";
import Title from "./Title";

interface HeaderInterface {
  children?: React.ReactNode;
}

const Header: React.FC<HeaderInterface> = ({ children }) => {
  return (
    <div className="flex items-center justify-between w-full px-4 py-2 ">
      <div className="flex items-center gap-4">{children}</div>
      <p className={`${jsoFont}`}>San Rafael Map</p>
    </div>
  );
};

export default Header;
