import { motion } from "motion/react";

type props = {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
};

export const FadeIn = ({
  children,
  delay = 0.2,
  duration = 0.5,
  className = "",
}: props) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay, duration }}
    className={className}
  >
    {children}
  </motion.div>
);
