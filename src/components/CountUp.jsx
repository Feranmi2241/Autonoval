import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';

/**
 * Animated count-up number for stat/KPI cards.
 * Counts from 0 (or `from`) up to `value` once it scrolls into view.
 *
 * Usage:
 *   <CountUp value={2450} prefix="$" suffix="+" />
 *   <CountUp value={4.9} decimals={1} suffix=" ★" />
 */
export const CountUp = ({
  value,
  from = 0,
  duration = 1.4,
  decimals = 0,
  prefix = '',
  suffix = '',
  className = '',
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });
  const [display, setDisplay] = useState(from);

  useEffect(() => {
    if (!isInView) return;
    let start = null;
    const numericValue = typeof value === 'number' ? value : parseFloat(value) || 0;

    const step = (timestamp) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / (duration * 1000), 1);
      // ease-out cubic, matches the app's general easing language
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(from + (numericValue - from) * eased);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setDisplay(numericValue);
      }
    };
    requestAnimationFrame(step);
  }, [isInView, value, from, duration]);

  const formatted = decimals > 0
    ? display.toFixed(decimals)
    : Math.round(display).toLocaleString();

  return (
    <motion.span ref={ref} className={className}>
      {prefix}{formatted}{suffix}
    </motion.span>
  );
};

export default CountUp;
