import gsap from "gsap";
import { useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import { customCursorSizeAtom } from "../../store/atom";

const variantStyles = {
  main: "bg-[#242C31]  py-1 px-3 text-[#f9f9f9] border-teal-50/10 border hover:bg-teal-900 ",
  blackBg:
    "bg-[#f9f9f9] py-1 px-3 text-[#242C31]  border-teal-50/10 border hover:bg-teal-50 ",
  transparent: "text-teal-50 ",
};

const sizeStyles = {
  sm: "md:text-lg py-1 px-3 text-sm",
  md: "md:text-xl md:py-2 md:px-3 text-base",
  lg: "md:text-xl md:py-2 md:px-3 text-base",
  nav: "md:text-lg text-4xl py-1 px-3 ",
};

const defaultStyles =
  "font-medium md:rounded-lg rounded cursor-pointer transition-all whitespace-nowrap";

export const Button = ({
  variant,
  text,
  animation,
  size,
  onClickHandler,
  underLineAnimation,
}) => {
  const buttonRef = useRef(null);
  const setCustomCursorSize = useSetRecoilState(customCursorSizeAtom);
  const [isButtonHoveredOn, setIsButtonHovered] = useState(false);

  const mouseHandlerEnter = () => {
    setCustomCursorSize(0);
    setIsButtonHovered(true);
    if (!buttonRef.current) return;
    if (!animation) {
      return;
    }
    gsap.to(buttonRef.current.querySelectorAll(".firstDiv span"), {
      y: size === "lg" ? "-129%" : "-118%",
      opacity: 1,
      rotateX: 0,
      duration: 0.4,
      stagger: 0.02,
    });

    gsap.to(buttonRef.current.querySelectorAll(".secondDiv span"), {
      y: -20,
      opacity: 1,
      rotateX: 90,
      duration: 0.4,
      stagger: 0.02,
    });
  };

  const mouseHandlerLeave = () => {
    setCustomCursorSize(50);
    setIsButtonHovered(false);
    if (!buttonRef.current) return;
    if (!animation) {
      return;
    }

    gsap.to(buttonRef.current.querySelectorAll(".firstDiv span"), {
      y: "0%",
      opacity: 1,
      rotateX: -90,
      duration: 0.4,
      stagger: 0.02,
    });

    gsap.to(buttonRef.current.querySelectorAll(".secondDiv span"), {
      y: 0,
      rotateX: 0,
      opacity: 1,
      duration: 0.4,
      stagger: 0.02,
    });
  };

  return (
    <button
      ref={buttonRef}
      onClick={() => {
        onClickHandler();
      }}
      className={`${variantStyles[variant]} relative overflow-hidden ${defaultStyles} ${sizeStyles[size]} `}
      onMouseEnter={mouseHandlerEnter}
      onMouseLeave={mouseHandlerLeave}
      aria-label={text}
    >
      {/* First layer for hover animation */}
      <div className="absolute top-full flex items-center justify-center firstDiv">
        {text.split("").map((char, key) => (
          <span className="inline-block " key={key}>
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>

      <div className="relative secondDiv">
        {text.split("").map((char, key) => (
          <span className="inline-block" key={key}>
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>
      {underLineAnimation && (
        <div
          className={`absolute right-0 bottom-0 w-0 h-0.5 bg-teal-50 transition-all duration-500 delay-75 ease-in-out pointer-events-none ${isButtonHoveredOn ? "left-0 w-full" : ""}`}
        ></div>
      )}
    </button>
  );
};
