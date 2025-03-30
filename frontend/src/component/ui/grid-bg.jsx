export const GridBg = ({ children, leftLight, rightLight }) => {
  return (
    <div className="relative bg-[size:40px_40px] bg-[image:linear-gradient(to_right,#1c1c1c_2px,transparent_2px),linear-gradient(to_bottom,#1c1c1c_2px,#0c0c0c_1px)] min-h-screen w-full overflow-x-hidden ">
      {leftLight && (
        <div
          className="absolute md:w-14 w-16 md:h-[100vw] h-[180vw] md:bg-teal-50/50 bg-teal-50/20 md:blur-3xl blur-xl
        md:-rotate-60 -rotate-45  md:-top-[45vw] -top-[80vw] left-0 rounded-full pointer-events-none z-10 "
        ></div>
      )}
      {rightLight && (
        <div
          className="absolute md:w-24 w-16 md:h-[100vw] h-[180vw] md:bg-teal-50/30 bg-teal-50/20 md:blur-3xl blur-xl
        md:rotate-60 rotate-45  md:-top-[45vw] -top-[80vw] left-full rounded-4xl pointer-events-none z-10 "
        ></div>
      )}
      {children}
    </div>
  );
};
