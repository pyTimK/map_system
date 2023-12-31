import { jsoFont } from "@/styles/fonts";
import { forwardRef } from "react";

interface HeaderInterface {
  children?: React.ReactNode;
  title: string;
}

const MyHeader = forwardRef<HTMLDivElement, HeaderInterface>(
  ({ children, title }, ref) => {
    return (
      <div
        ref={ref}
        className="flex items-center justify-between w-full px-4 py-4 border-b border-black"
        id="header"
      >
        <div className="flex items-center gap-4">{children}</div>
        <p className={`${jsoFont}`}>{title}</p>
      </div>
    );
  }
);
MyHeader.displayName = "MyHeader";
export default MyHeader;
