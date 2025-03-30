import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

export function LoadingAnimation() {
  const bgRef = useRef();
  const loadingRef = useRef();
  const [loading, setLoading] = useState("Loading...");
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      setLoading("Almost There");
    }, 1000);
    setTimeout(() => {
      setLoading("Loading Completed");
    }, 2000);
    const tl = gsap.timeline();

    gsap.to(loadingRef.current, {
      dur: 0.2,
      opacity: 0,
      duration: 0.69,
      repeat: 3,
      ease: "power3.out",
      yoyo: true,
    });

    // First column stops at "1" (10% of total movement)
    tl.to(ref3.current, {
      delay: 1,
      y: "-45.8%",
      duration: 2,
      ease: "power2.out",
    });
    // Other two columns stop at "0" (100% of total movement)
    tl.to(
      ref2.current,
      {
        y: "-45.8%",
        duration: 1.75,
        ease: "power2.out",
      },
      "-=1.7",
    );

    tl.to(
      ref1.current,
      { y: "-27%", duration: 1.5, ease: "power2.out" },
      "-=1.3",
    );
    tl.to(bgRef.current, {
      delay: 0.5,
      y: "-100%",
      duration: 1.5,
      ease: "power4.out",
      display: "none",
    });
  }, []);

  return (
    <>
      <div
        ref={bgRef}
        className="fixed top-0 left-0 flex flex-col justify-center items-center h-screen bg-white z-50"
      >
        <div className="flex justify-center items-center w-screen bg-white  ">
          <h1 className="h-16 overflow-hidden font-extrabold text-6xl flex items-center">
            <div
              ref={ref1}
              className="flex flex-col items-center justify-center translate-y-[1.647rem]"
            >
              {[0, 1].map((e, key) => {
                return <div key={key}>{e}</div>;
              })}
            </div>
          </h1>
          <h1 className="h-16 overflow-hidden font-extrabold text-6xl flex items-center">
            <div
              ref={ref2}
              className="flex flex-col items-center justify-center translate-y-[18.5rem]"
            >
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((e, key) => {
                return <div key={key}>{e}</div>;
              })}
            </div>
          </h1>
          <h1 className="h-16 overflow-hidden font-extrabold text-6xl flex items-center">
            <div
              ref={ref3}
              className="flex flex-col items-center justify-center translate-y-[18.5rem]"
            >
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((e, key) => {
                return <div key={key}>{e}</div>;
              })}
            </div>
          </h1>
        </div>
        <h1 ref={loadingRef} className="text-center">
          {loading}
        </h1>
      </div>
    </>
  );
}
