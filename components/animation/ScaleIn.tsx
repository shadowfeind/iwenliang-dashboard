import { motion } from "motion/react";

type props = {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
};

export const ScaleIn = ({
  children,
  delay = 0.2,
  duration = 0.5,
  className = "",
}: props) => (
  <motion.div
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay, duration }}
    className={className}
  >
    {children}
  </motion.div>
);
