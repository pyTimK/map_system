import { jsoFont } from "@/styles/fonts";
import { forwardRef } from "react";

interface HeaderInterface {
  children?: React.ReactNode;
}

const Header = forwardRef<HTMLDivElement, HeaderInterface>(
  ({ children }, ref) => {
    return (
      <div
        ref={ref}
        className="flex items-center justify-between w-full px-4 py-2"
        id="header"
      >
        <div className="flex items-center gap-4">{children}</div>
        <p className={`${jsoFont}`}>San Rafael Map</p>
      </div>
    );
  }
);

export default Header;
