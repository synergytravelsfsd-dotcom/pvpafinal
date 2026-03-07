import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TARGET = new Date("2026-04-28T09:00:00+05:00").getTime();

const CountdownTimer = () => {
  const [diff, setDiff] = useState(TARGET - Date.now());

  useEffect(() => {
    const id = setInterval(() => setDiff(TARGET - Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  if (diff <= 0) return null;

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);

  const blocks = [
    { value: days, label: "Days" },
    { value: hours, label: "Hours" },
    { value: minutes, label: "Minutes" },
    { value: seconds, label: "Seconds" },
  ];

  return (
    <div className="flex gap-3 md:gap-4">
      {blocks.map((b, i) => (
        <motion.div
          key={b.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          className="text-center"
        >
          <div className="relative bg-primary-foreground/10 backdrop-blur-md border border-primary-foreground/20 rounded-xl px-3 py-2 md:px-5 md:py-3 min-w-[60px] md:min-w-[80px] overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-primary-foreground/5 to-transparent" />
            <AnimatePresence mode="popLayout">
              <motion.span
                key={b.value}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="relative text-2xl md:text-4xl font-bold font-display block"
              >
                {String(b.value).padStart(2, "0")}
              </motion.span>
            </AnimatePresence>
          </div>
          <span className="text-[10px] md:text-xs uppercase tracking-wider mt-2 block opacity-70 font-medium">
            {b.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
};

export default CountdownTimer;
