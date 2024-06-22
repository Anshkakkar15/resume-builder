import { motion } from "framer-motion";

export const BuilderContinueButton = (props) => {
  return (
    <motion.button
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="rounded-full border border-[#4285f4] bg-[#4285f4] px-12 py-2 text-lg text-white"
      onClick={props?.handleContinue}
    >
      {props?.continueBtn ? props?.continueBtn : "Continue"}
    </motion.button>
  );
};
