import { Badge } from "../component/ui/badge";
import { LinearGradientText } from "../component/ui/linearGradientText";
import { useIsMobileOrTablet } from "../hooks/useIsMobileOrTablet";

export const Leaderboard2 = () => {
  const isMoblieOrTablet = useIsMobileOrTablet();
  console.log(isMoblieOrTablet);
  return (
    <div className="bg-black/20 mt-[10vw] border-3 border-b-0 border-teal-900 w-[80vw] mx-auto backdrop-blur-3xl rounded-t-[4vw] px-[10vw] overflow-hidden pb-[5vw]">
      <LinearGradientText text={"Leaderboard"} size="base" />
      <div className="mt-[3vw] flex justify-between ">
        <div>
          <h1 className="text-teal-50 font-[poppins] font-bold text-2xl mb-[2.5vw]">
            Position
          </h1>
          <div className="flex flex-col gap-8 ">
            {["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"].map(
              (e, index) => {
                return <Badge key={index} rank={e} />;
              },
            )}
          </div>
        </div>
        <div>
          <h1 className="text-teal-50 font-[poppins] font-bold text-2xl mb-[2.5vw] text-center ">
            Name
          </h1>
          <div className="flex flex-col gap-8 text-teal-50 font-[poppins] font-semibold text-xl text-center">
            {[
              "Anurag",
              "Arpit",
              "Ayush",
              "Sitanshu",
              "Piyush",
              "Akshit",
              "Tanu",
              "Tanvi",
              "Suyoug",
              "Panda",
              "Binod",
            ].map((e, index) => {
              return <p key={index}>{e}</p>;
            })}
          </div>
        </div>
        {!isMoblieOrTablet && (
          <div>
            <h1 className="text-teal-50 font-[poppins] font-bold text-2xl mb-[2.5vw] text-center ">
              Points
            </h1>
            <div className="flex flex-col gap-8 text-teal-50 font-[poppins] font-semibold text-xl text-center">
              {[
                "30",
                "29",
                "28",
                "27",
                "25",
                "23",
                "22",
                "20",
                "19",
                "15",
                "10",
              ].map((e, index) => {
                return <p key={index}>{e}</p>;
              })}
            </div>{" "}
          </div>
        )}
      </div>
    </div>
  );
};
