import ImportIcon from "@/components/svg/icon/ImportIcon";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";
import useDeviceDimensions from "@/hooks/useDeviceDimensions";
import { PagesWrapperContext } from "@/app/pages/PagesWrapper";
import { useContext } from "react";

interface ImportButtonProps {}

const ImportButton: React.FC<ImportButtonProps> = ({}) => {
  const { setShowImport } = useContext(PagesWrapperContext);
  //! USE DEVICE
  const { screenWidth } = useDeviceDimensions();

  return (
    <motion.div
      className={twMerge(
        "flex items-center pl-1 pr-3 border border-black rounded-lg cursor-pointer select-none",
        screenWidth < 1200 ? "pl-0 pr-2 text-sm" : ""
      )}
      whileTap={{ scale: 0.9 }}
      onClick={() => setShowImport(true)}
    >
      <div className="scale-50">
        <ImportIcon />
      </div>
      <p className={twMerge("text-xs", screenWidth > 1200 ? "text-base" : "")}>
        Import {screenWidth > 1200 ? "Data" : ""}
      </p>
    </motion.div>
  );
};

export default ImportButton;
