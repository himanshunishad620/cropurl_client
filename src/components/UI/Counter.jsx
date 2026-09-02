import { useEffect, useRef, useState } from "react";

const Counter = ({ end = 100, duration = 2000, prefix = "", suffix = "" }) => {
  const ref = useRef(null);
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  // Start the animation only when the counter enters view.
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.4,
      },
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [started]);
  // Animate from zero to the target value.
  useEffect(() => {
    if (!started) return;

    let start = 0;
    const startTime = performance.now();

    function animate(currentTime) {
      const progress = Math.min((currentTime - startTime) / duration, 1);

      setCount(Math.floor(progress * (end - start) + start));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    }

    requestAnimationFrame(animate);
  }, [started, end, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
};

export default Counter;
