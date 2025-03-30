import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useRecoilValue } from "recoil";
import { customCursorSizeAtom } from "../../store/atom";
import { useIsMobileOrTablet } from "../../hooks/useIsMobileOrTablet";

export default function Mask() {
  const customCursorSize = useRecoilValue(customCursorSizeAtom);
  const maskRef = useRef(null);
  const isMobileOrTablet = useIsMobileOrTablet();

  useEffect(() => {
    const mask = maskRef.current;
    gsap.set(mask, {
      x: window.innerWidth / 2 - customCursorSize / 2,
      y: window.innerHeight / 2 - customCursorSize / 2,
    });

    gsap.to(mask, {
      width: isMobileOrTablet ? 0 : customCursorSize,
      height: isMobileOrTablet ? 0 : customCursorSize,
      duration: 0.8,
      ease: "elastic.out(0.1,0.4)",
    });

    const handleMouseMove = (e) => {
      gsap.to(mask, {
        x: e.clientX - customCursorSize / 2,
        y: e.clientY - customCursorSize / 2,
        duration: 2.25,
        ease: "elastic.out(0.11,0.75)",
      });
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [customCursorSize, isMobileOrTablet]);

  return (
    <div
      ref={maskRef}
      className="fixed top-0 left-0 bg-teal-50 rounded-full pointer-events-none z-[1000] mix-blend-difference -translate-x-1/2 -translate-y-1/2"
    ></div>
  );
}
