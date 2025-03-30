import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useIsMobileOrTablet } from "../../hooks/useIsMobileOrTablet.js";
import { CrossIcon } from "../../icons/cross.jsx";
import { HamburgerIcon } from "../../icons/hamburger.jsx";
import { Logo } from "../../icons/logo.jsx";
import { isNavOpenAtom } from "../../store/atom.js";
import { Button } from "./button.jsx";

export const Navbar = ({ navItems }) => {
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useRecoilState(isNavOpenAtom);
  const isMobileOrTablet = useIsMobileOrTablet();
  return (
    <header className="lg:py-7 lg:px-15 p-5  fixed w-full z-30">
      <nav className="flex justify-between items-center">
        <div
          onClick={() => {
            navigate("/");
          }}
          className="flex items-center gap-3"
        >
          <Logo />
          <h1 className="text-white font-bold text-lg md:text-2xl cursor-pointer">
            Abhedya
          </h1>
        </div>

        <div
          className={`fixed z-30 inset-0 md:bg-transparent bg-teal-950/20 backdrop-blur-2xl md:backdrop-blur-none text-teal-100 flex flex-col items-center justify-center gap-6 transition-transform duration-500 ease-in-out 
          md:static md:flex md:flex-row md:gap-6 ${isNavOpen && isMobileOrTablet ? "translate-y-0" : "-translate-y-full md:translate-y-0"}`}
        >
          {isMobileOrTablet && (
            <div
              className="absolute top-5 right-5 cursor-pointer md:hidden"
              onClick={() => setIsNavOpen(false)}
            >
              <CrossIcon />
            </div>
          )}
          {navItems.map((element, index) => {
            return (
              <Button
                key={index}
                text={element}
                animation={false}
                underLineAnimation={true}
                size={"nav"}
                variant="transparent"
                onClickHandler={() => {
                  if (element === "Home") {
                    navigate("/");
                    setIsNavOpen(false);
                    return;
                  }
                  navigate(element.split(" ").join("").toLowerCase());
                  setIsNavOpen(false);
                }}
              />
            );
          })}
        </div>

        {isMobileOrTablet && !isNavOpen && (
          <div
            className="cursor-pointer text-white md:hidden"
            onClick={() => setIsNavOpen(true)}
          >
            <HamburgerIcon />
          </div>
        )}
      </nav>
    </header>
  );
};
