import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import { Badge } from "../component/ui/badge";
import { LinearGradientText } from "../component/ui/linearGradientText";
import { useIsMobileOrTablet } from "../hooks/useIsMobileOrTablet";
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL ;
const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const isMobileOrTablet = useIsMobileOrTablet();
  useEffect(() => {
    const socket = socketIOClient(API_BASE_URL);
    fetchLeaderboard();

    socket.on("leaderboard", (data) => {
      setLeaderboard(data);
      setLoading(false);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch(API_BASE_URL);
      const data = await response.json();
      setLeaderboard(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-teal-50 text-center py-10">
        Loading leaderboard...
      </div>
    );
  }

  return (
    <div className="bg-black/20 lg:mt-[10vw] mt-[25vw] border-3 border-b-0 border-teal-900 md:w-[80vw] w-[90vw] mx-auto backdrop-blur-3xl rounded-t-[4vw] px-[10vw] overflow-hidden pb-[5vw] md:py-0 md:pb-[2vw] py-[2vw]">
      <LinearGradientText
        text={"Leaderboard"}
        size="leaderboard"
        subtitlePreset={false}
      />
      
      <div className="grid lg:grid-cols-3 grid-cols-2 grid-row-10 place-items-center gap-5 mt-5">
        <h1 className="text-teal-50 font-[poppins] font-bold lg:text-2xl text-lg mb-[1.5vw]">
          Position
        </h1>
        <h1 className="text-teal-50 font-[poppins] font-bold lg:text-2xl text-lg mb-[1.5vw]">
          Name
        </h1>

        {!isMobileOrTablet && (
          <h1 className="text-teal-50 font-[poppins] font-bold text-2xl mb-[1.5vw]">
            Level
          </h1>

          
        )}
        
        {leaderboard.length === 0 ? (
          <div className="col-span-full text-teal-50 py-5">
            No data available
          </div>
        ) : (
          leaderboard.map((user, index) => (
            <React.Fragment key={user._id || index}>
              <Badge rank={index + 1} />
              <p className="text-teal-50 font-[poppins] font-semibold md:text-xl text-md">
                {user.username}
              </p>


              {!isMobileOrTablet && (
                <p className="text-teal-50 font-[poppins] font-semibold md:text-xl text-md">
                  {user.currentQuestion}
                </p>
              )}
            </React.Fragment>
          ))
        )}
      </div>
    </div>
  );
};

export default Leaderboard;