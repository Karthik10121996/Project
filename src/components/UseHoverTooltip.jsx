import { useState, useRef, useEffect } from "react";

function useHoverTooltip() {
  const [show, setShow] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      setIsOverflowing(ref.current.scrollWidth > ref.current.clientWidth);
    }
  }, []);

  return {
    show: show && isOverflowing,
    onMouseEnter: () => setShow(true),
    onMouseLeave: () => setShow(false),
    ref,
  };
}

export default useHoverTooltip; 
