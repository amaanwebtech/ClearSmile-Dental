import { motion } from 'framer-motion';

const variants = {
  up: { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } },
  fade: { hidden: { opacity: 0 }, show: { opacity: 1 } },
  scale: { hidden: { opacity: 0, scale: 0.94 }, show: { opacity: 1, scale: 1 } },
};

const Reveal = ({ children, as = 'up', delay = 0, duration = 0.6, className = '', once = true, amount = 0.2 }) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={variants[as]}
      transition={{ duration, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
};

export const RevealGroup = ({ children, className = '', stagger = 0.1, once = true, amount = 0.15 }) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={{ show: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </motion.div>
  );
};

export const RevealItem = ({ children, className = '', as = 'up' }) => (
  <motion.div className={className} variants={variants[as]} transition={{ duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] }}>
    {children}
  </motion.div>
);

export default Reveal;
