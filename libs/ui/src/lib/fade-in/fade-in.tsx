'use client';

import { createContext, useContext } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const FadeInStaggerContext = createContext(false);

const viewport = { margin: '0px 0px -200px', once: true };

// https://www.framer.com/motion/component/###animating-css-variables
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function FadeIn(props: any) {
  const shouldReduceMotion = useReducedMotion();
  const isInStaggerGroup = useContext(FadeInStaggerContext);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5 }}
      {...(isInStaggerGroup
        ? {}
        : {
            initial: 'hidden',
            viewport,
            whileInView: 'visible',
          })}
      {...props}
    />
  );
}

export function FadeInStagger({ faster = false, ...props }) {
  return (
    <FadeInStaggerContext.Provider value={true}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        transition={{ staggerChildren: faster ? 0.12 : 0.2 }}
        {...props}
      />
    </FadeInStaggerContext.Provider>
  );
}
