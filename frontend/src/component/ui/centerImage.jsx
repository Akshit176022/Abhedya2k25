import { useSetRecoilState } from "recoil";
import { customCursorSizeAtom } from "../../store/atom";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

export const CenterImage = () => {
  const box1 = useRef();
  const box2 = useRef();
  const [isHover, setIsHover] = useState(false);
  const setCustomCursorSize = useSetRecoilState(customCursorSizeAtom);
  const mouseHandlerEnter = () => {
    setIsHover(true);
    setCustomCursorSize(4000);
  };
  const mouseHandlerLeave = () => {
    setIsHover(false);
    setCustomCursorSize(50);
  };
  useEffect(() => {
    const tl = gsap.timeline();
    tl.to(box1.current, {
      delay: 4.8,
      duration: 1.6,
      rotate: -5,
      ease: "elastic.out(5,0.3)",
    });
    tl.to(
      box2.current,
      {
        rotate: 3,
        duration: 1.6,
        ease: "elastic.out(5,0.3)",
      },
      "-=1.5",
    );
  }, []);
  return (
    <div className="flex justify-center items-center">
      <div
        ref={box1}
        className=" absolute -rotate-0 md:w-[14vw] md:h-[14vw] sm:w-56 sm:h-56 w-44 h-44 rounded-xl bg-[#0E3F3A] border border-teal-100/10"
      ></div>
      <div
        ref={box2}
        className="relative sm:w-56 md:w-[14vw] md:h-[14vw] sm:h-56 w-44 h-44 rounded-xl bg-gradient-to-br from-[#031615] to-[#115E59] rotate-0 border border-teal-100/20 shadow shadow-teal-950"
        onMouseLeave={mouseHandlerLeave}
        onMouseEnter={mouseHandlerEnter}
      >
        <img
          className={`object-cover absolute bottom-0 md:w-[15vw] md:h-[15vw] sm:w-60 sm:h-60 w-48 h-48 ${isHover ? "invert" : ""} `}
          src="../../../public/webImage.webp"
        />
      </div>
    </div>
  );
};
