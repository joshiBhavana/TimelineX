import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const RotatingText = ({
  texts,
  mainClassName,
  rotationInterval = 2000,
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setIndex((prev) => (prev + 1) % texts.length),
      rotationInterval
    );
    return () => clearInterval(interval);
  }, [texts.length, rotationInterval]);

  return (
    <div className={mainClassName}>
      <AnimatePresence mode="wait">
        <motion.span
          key={texts[index]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="block"
        >
          {texts[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

export default RotatingText;
