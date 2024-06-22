import { motion } from "framer-motion";

export const BuilderBackButton = (props) => {
  return (
    <motion.button
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="rounded-full border border-dark-blue bg-white px-12 py-2 text-lg text-dark-blue"
      onClick={props?.handleBack}
    >
      Back
    </motion.button>
  );
};
