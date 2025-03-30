import { LinearGradientText } from "../component/ui/linearGradientText";

export const Error404Page = () => {
  return (
    <div className="h-[80vh] flex flex-col justify-center items-center">
      <div>
        <LinearGradientText text={"404"} size="base" subtitlePreset={false} />
        <h1 className="font-[poppins] md:text-[12vw] text-[20vw] text-teal-300 font-extrabold leading-16 ">
          ERROR
        </h1>
      </div>
      <p className="font-extralight md:text-[1.2vw] text-[3vw] text-center text-teal-500 md:mt-[5vw] mt-[9vw] ">
        The page you are looking for
        <br />
        could not be found
      </p>
    </div>
  );
};
