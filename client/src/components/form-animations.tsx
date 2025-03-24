import { motion } from "framer-motion";

// Animation wrapper for section headers
export const AnimatedHeader = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.h2
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay }}
    className="text-xl font-semibold border-b pb-2"
  >
    {children}
  </motion.h2>
);

// Animation wrapper for section content
export const AnimatedSection = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="space-y-4"
  >
    {children}
  </motion.div>
);

// Animation wrapper for buttons
export const AnimatedButton = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {children}
  </motion.div>
);

// Animation wrapper for form controls section
export const AnimatedFormControls = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    className="flex flex-wrap justify-between pt-4 border-t border-border"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5, duration: 0.3 }}
  >
    {children}
  </motion.div>
);