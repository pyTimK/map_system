import { MouseEventHandler } from "react";
import { motion } from "framer-motion";

interface CheckCircleIconProps {
  onClick?: MouseEventHandler<HTMLParagraphElement>;
}

const CheckCircleIcon: React.FC<CheckCircleIconProps> = ({ onClick }) => {
  return (
    <motion.div
      className="cursor-pointer flex items-center justify-center w-6 h-6 border border-black rounded-full bg-light-green"
      whileTap={{ scale: 0.8 }}
    >
      <p className="text-lg " onClick={onClick}>
        ✓
      </p>
    </motion.div>
  );
};

export default CheckCircleIcon;
