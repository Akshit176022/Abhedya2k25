import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CircleUserRound, HelpCircle } from "lucide-react";
import FloatingBlobs from "../component/ui/FloatingBlobs";
import { loadQuestion, validateAnswer, getCurrentUser } from "../services/api";

const TOTAL_QUESTIONS = 15;

export const GamePage = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [user, setUser] = useState(null);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState({
    initial: true,
    submission: false
  });
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [gameCompleted, setGameCompleted] = useState(false);

  const fetchUserAndQuestion = useCallback(async () => {
    try {
      setLoading(prev => ({ ...prev, initial: true }));
      setError(null);
      
      const userData = await getCurrentUser();
      setUser(userData);
      
      if (userData.currentQuestion > TOTAL_QUESTIONS || userData.hasCompletedGame) {
        setGameCompleted(true);
        return;
      }
      
      if (userData.currentQuestion) {
        const questionData = await loadQuestion(userData.currentQuestion);
        setCurrentQuestion(questionData);
      }
      
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Failed to load game data";
      setError(errorMessage);
      
      if (errorMessage.includes("token") || err.response?.status === 401) {
        alert("Please sign in to continue");
        navigate("/signin");
        return;
      }
      
      console.error("Error loading game data:", err);
    } finally {
      setLoading(prev => ({ ...prev, initial: false }));
    }
  }, [navigate]);

  useEffect(() => {
    fetchUserAndQuestion();
  }, [fetchUserAndQuestion]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!answer.trim() || gameCompleted || loading.submission) return;

    try {
      setLoading(prev => ({ ...prev, submission: true }));
      const result = await validateAnswer(currentQuestion.id, answer);
      setFeedback(result);

      if (result.isCorrect) {
        if (result.nextQuestion) {
          loadQuestion(result.nextQuestion.id)
            .then(nextQuestion => {
              setCurrentQuestion(nextQuestion);
              setAnswer("");
            })
            .catch(err => {
              console.error("Error loading next question:", err);
            });
        } else if (currentQuestion.id === TOTAL_QUESTIONS) {
          setGameCompleted(true);
        }
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Failed to validate answer";
      setError(errorMessage);
      
      if (errorMessage.includes("token") || err.response?.status === 401) {
        alert("Session expired. Please sign in again");
        navigate("/signin");
        return;
      }
      
      console.error("Error validating answer:", err);
    } finally {
      setLoading(prev => ({ ...prev, submission: false }));
    }
  };

  const renderMediaItem = (mediaItem, index) => {
    switch (mediaItem.type) {
      case 'image':
        return (
          <a key={index} href={mediaItem.url} target="_blank" rel="noopener noreferrer">
            <img 
              src={mediaItem.url}
              alt={`Question image ${index + 1}`}
              className="max-h-[50vh] max-w-full object-contain rounded-lg shadow-lg"
            />
          </a>
        );
        case 'audio':
          return (
            <div key={index} className="w-full max-w-md bg-black bg-opacity-50 p-4 relative group">
{/* 
              <audio controls className="w-full relative z-10">
                <source src={mediaItem.url} type={`audio/${mediaItem.url.split('.').pop()}`} />
                Your browser does not support the audio element.
              </audio> */}
              
              <a 
                href={mediaItem.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="absolute inset-0 z-20 opacity-80 group-hover:opacity-100 flex items-center justify-center bg-black bg-opacity-30 transition-opacity duration-200"
                title="Open audio in new tab"
              >
                <div className="bg-blue-500 text-white px-4 py-4 rounded-md text-sm">
                  Click to Open Audio ↗
                </div>
              </a>
            </div>
          );
      case 'video':
        return (
          <div key={index} className="w-full max-w-2xl">
            <video controls className="w-full ">
              <source src={mediaItem.url} type={`video/${mediaItem.url.split('.').pop()}`} />
              Your browser does not support the video tag.
            </video>
          </div>
        );
      case 'document':
        return (
          <div key={index} className="bg-black bg-opacity-50 p-4 rounded-lg">
            <a 
              href={mediaItem.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              CLICK TO OPEN AUDION FILE {index + 1}
            </a>
          </div>
        );
      default:
        return (
          <a 
            key={index} 
            href={mediaItem.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            View Media {index + 1}
          </a>
        );
    }
  };

  if (loading.initial && !gameCompleted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-cyan-400 text-2xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-red-500 text-xl">Error: {error}</div>
      </div>
    );
  }

  if (gameCompleted || (user && (user.currentQuestion > TOTAL_QUESTIONS || user.hasCompletedGame))) {
    return (
      <div className="relative min-h-screen bg-black flex flex-col items-center justify-center p-8 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-32 bg-teal-600 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-purple-600 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-blue-600 rounded-full filter blur-3xl opacity-15 animate-pulse"></div>
        </div>

        <div className="relative z-10 text-center max-w-2xl">
          <div className="mb-8 animate-bounce">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </div>
          <div className="border-teal-400 border-4 w-full rounded-3xl text-center p-6 mx-auto text-2xl font-bold bg-gray-900 bg-opacity-80 backdrop-blur-sm shadow-lg shadow-teal-500/20 transform transition-all hover:scale-105 duration-300">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-purple-500">
              Congratulations! You've Completed All Questions!
            </span>
          </div>
          <div className="mt-8 text-gray-300 text-lg">
            <p className="mb-4 text-3xl">FIRST ONE TO REACH LAST LEVEL IN LAST TWO YEARS</p>
          </div>

          <div className="absolute -top-20 -left-20 w-full h-full pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div key={i} className={`absolute w-2 h-2 rounded-full ${i%3===0 ? 'bg-yellow-400' : i%3===1 ? 'bg-teal-400' : 'bg-purple-400'}`}
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `fall ${Math.random() * 3 + 2}s linear infinite`,
                  animationDelay: `${Math.random() * 2}s`
                }}></div>
            ))}
          </div>
        </div>

        <style jsx>{`
          @keyframes fall {
            0% {
              transform: translateY(-100vh) rotate(0deg);
              opacity: 1;
            }
            100% {
              transform: translateY(100vh) rotate(360deg);
              opacity: 0;
            }
          }
        `}</style>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-2xl">
          {user?.currentQuestion === null 
            ? "Congratulations! You've completed all questions!" 
            : "No current question found"}
        </div>
      </div>
    );
  }

  const hasMedia = currentQuestion.media && currentQuestion.media.length > 0;

  return (
    <div className="relative min-h-screen bg-transparent text-[rgba(0,170,190,1)] flex flex-col backdrop-blur-[1px] items-center justify-center p-6">
      <div className="w-full pt-[80px] flex flex-col items-center">
        <div className="relative z-0">
          <FloatingBlobs />
        </div>

        {/* Header */}
        <div className="mt-10 absolute top-[48px] flex w-[calc(100%-64px)] gap-[34.2px] justify-between mx-[128px] lg:flex-nowrap">
          <div className="w-full lg:w-[297.14px] h-[72px] flex items-center bg-black rounded-2xl border-[1.25px] border-[rgba(0,191,163,1)]/60 p-2 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/50">
            <div className="flex items-center gap-2 text-cyan-400 text-lg font-semibold p-2">
              <HelpCircle className="w-6 h-6 md:w-10 md:h-10" />
              <span className="text-[14px] md:text-2xl">
                Question: {currentQuestion.id.toString().padStart(2, '0')}
              </span>
            </div>
          </div>

          <div className="hidden lg:flex w-[641.31px] h-[72px] items-center justify-center bg-black rounded-2xl border-[1.25px] border-[rgba(0,191,163,1)]/60 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/50">
            {feedback && (
              <span className={`text-lg ${feedback.isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                {feedback.message}
              </span>
            )}
          </div>

          <div className="w-full lg:w-[297.14px] h-[72px] flex items-center bg-black rounded-2xl border-[1.25px] border-[rgba(0,191,163,1)]/60 p-2 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/50">
            <CircleUserRound className="text-cyan-400 w-5.5 h-5.5 md:w-10 md:h-10 mr-1 md:mr-2" />
            <div className="flex flex-col ml-[10px] w-full">
              <span className="block text-[10px] md:text-base">Hi there,</span>
              <span className="text-[13px] md:text-xl font-bold overflow-clip">
                {user?.username || "Guest"}
              </span>
            </div>
          </div>
        </div>
        
        <div
          className="mt-8 absolute top-[160px] w-[calc(100%-64px)] mx-[128px] rounded-2xl border-[1.25px] border-[rgba(0,191,163,1)]/60 shadow-md transition-all duration-300 hover:scale-101 hover:shadow-cyan-500/50 p-6 pb-0 bg-black flex flex-col"
          style={{
            height: "auto",
            minHeight: "60vh",
          }}
        >
          <div className="flex flex-col w-full h-full">
            {/* Question Text */}
            <div className="w-full text-left p-4 overflow-y-auto">
              <p className="text-[4vw] md:text-[1.5vw] text-gray-300">
                {currentQuestion.question}
              </p>
            </div>

            {hasMedia && (
              <div className="w-full flex flex-wrap justify-center gap-4 p-4">
                {currentQuestion.media.map((mediaItem, index) => (
                  renderMediaItem(mediaItem, index)
                ))}
              </div>
            )}
          </div>

          <div className="mt-auto w-full p-2 bg-black rounded-xl">
            <form onSubmit={handleSubmit} className="flex">
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type your answer"
                className="w-full max-w-md bg-transparent text-white p-2 border-b-2 border-gray-400 focus:outline-none placeholder-gray-500"
                disabled={loading.submission || gameCompleted}
              />
              <button 
                type="submit"
                className="ml-2 text-xl text-cyan-500 p-3 hover:text-cyan-300 disabled:opacity-50"
                disabled={loading.submission || gameCompleted || !answer.trim()}
              >
                {loading.submission ? "..." : "➜"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};