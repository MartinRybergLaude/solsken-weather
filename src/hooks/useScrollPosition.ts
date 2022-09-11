import { RefObject, useEffect, useState } from "react";
import debounce from "lodash.debounce";

/* Returns scroll position of ref or window if no ref is passed */
const useScrollPosition = (useRef?: boolean, ref?: RefObject<HTMLElement>) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const updatePosition = debounce(() => {
      if (useRef && ref) {
        const scrollY = ref.current?.scrollTop;
        setScrollPosition(scrollY || 0);
      } else {
        setScrollPosition(window.pageYOffset);
      }
    }, 1);
    if (useRef) {
      ref && ref.current?.addEventListener("scroll", updatePosition);
    } else {
      window.addEventListener("scroll", updatePosition);
    }

    updatePosition();
    return () =>
      useRef
        ? ref && ref.current?.removeEventListener("scroll", updatePosition)
        : window.removeEventListener("scroll", updatePosition);
  }, []);

  return scrollPosition;
};

export default useScrollPosition;
