import { useNavigate } from "react-router-dom";
import { Button } from "../component/ui/button.jsx";
import { LinearGradientText } from "../component/ui/linearGradientText.jsx";

export const UpdatedHomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="h-full">
      <div className="absolute rounded-full bg-teal-50/30 h-[126vw] lg:w-16 w-12 lg:blur-2xl blur-lg rotate-[50deg] pointer-events-none -top-[100vw] lg:-right-[0vw] right-[8vw]"></div>
      <div className="absolute rounded-full bg-teal-50/30 md:h-[140vw] h-[160vw] lg:w-20 w-12 lg:blur-2xl blur-lg rotate-[50deg] pointer-events-none -top-[100vw] -right-[10vw]"></div>
      <div className="absolute rounded-full bg-teal-50/30 md:h-[160vw] h-[200vw] lg:w-24 w-14 lg:blur-2xl blur-lg rotate-[50deg] pointer-events-none -top-[100vw] -right-[25vw]"></div>
      <div className="absolute rounded-full bg-teal-50/30 md:h-[160vw] h-[200vw] lg:w-20 w-12 lg:blur-2xl blur-lg rotate-[50deg] pointer-events-none -top-[100vw] lg:-right-[45vw] -right-[65vw]"></div>
      <div className="flex flex-col justify-between  min-h-screen">
        <div className="py-20">
          <LinearGradientText
            text={"Abhedhya"}
            subtitlePreset={false}
            size={"base"}
          />
          <p className="lg:text-[1.1vw] md:text-[2vw] text-[3.35vw] text-center text-teal-400 -mt-[2vw]">
            A game you'll remember forever isn't about
            <br />
            graphics but the emotions it sparks
          </p>
          <div className="flex justify-center items-center mt-5 ">
            <Button
              variant={"blackBg"}
              text={"Register Now"}
              size="lg"
              animation={true}
              onClickHandler={() => {
                navigate("/signup");
              }}
            />
          </div>
        </div>
        <div className="flex justify-center items-end ">
          <img
            className="lg:h-[22vw] md:h-[35vw] h-[65vw] object-bottom rotate-y-180 grayscale "
            src="../../public/Futuristic Armored Figure Background Removed.png"
          />
        </div>
      </div>
    </div>
  );
};
