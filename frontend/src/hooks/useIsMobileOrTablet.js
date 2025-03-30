import { useEffect, useState } from "react";

export function useIsMobileOrTablet() {
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    if (typeof window !== "undefined") {
      // eslint-disable-next-line no-undef
      const mediaQuery = window.matchMedia("(max-width: 1024px)");
      
      const updateMediaQuery = () => setIsMobileOrTablet(mediaQuery.matches);
      updateMediaQuery();
      mediaQuery.addEventListener("change", updateMediaQuery);
      return () => mediaQuery.removeEventListener("change", updateMediaQuery);
    }
  }, []);

  return isMobileOrTablet;
}