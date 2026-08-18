import { useEffect, useState, useRef } from "react";
import { Clock } from "lucide-react";
import clsx from "clsx";

/**
 * Countdown timer for a timed practice section.
 *
 * @param {number} durationSec - total time allotted, in seconds
 * @param {() => void} onExpire - called once when the timer hits zero
 * @param {boolean} isRunning - pause/resume control
 */
export default function ExamTimer({ durationSec, onExpire, isRunning = true }) {
  const [secondsLeft, setSecondsLeft] = useState(durationSec);
  const expiredRef = useRef(false);

  useEffect(() => {
    setSecondsLeft(durationSec);
    expiredRef.current = false;
  }, [durationSec]);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          if (!expiredRef.current) {
            expiredRef.current = true;
            onExpire?.();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, onExpire]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const isLow = secondsLeft <= 60;

  return (
    <div
      className={clsx(
        "flex items-center gap-2 font-mono font-semibold px-3 py-1.5 rounded-lg",
        isLow ? "bg-red-50 text-red-600" : "bg-brand-mint/40 text-brand-purple"
      )}
    >
      <Clock size={16} />
      {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
    </div>
  );
}
