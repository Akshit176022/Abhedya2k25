import { useEffect } from 'react';

export default function GameStartingSoon() {

  useEffect(() => {

  }, []);

  return (
    <>


      <div className="relative min-h-screen text-white flex flex-col items-center justify-center p-8 overflow-hidden">
        {/* Background animation elements */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-1/3 right-1/3 w-72 h-72 bg-purple-600 rounded-full filter blur-3xl animate-pulse-slower"></div>
          <div className="absolute top-2/3 left-1/2 w-48 h-48 bg-teal-400 rounded-full filter blur-3xl animate-pulse-slowest"></div>
        </div>

        {/* Main content container */}
        <div className="relative z-10 text-center max-w-2xl w-full px-4">
          {/* Animated game icon */}
          <div className="mx-auto mb-12 w-32 h-32 animate-float">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-blue-400">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>

          {/* Main heading with gradient text */}
          <h1 className="text-4xl md:text-4xl font-bold mb-6 animate-fade-in">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              ABHEDYA 4.O STARTING SOON
            </span>
          </h1>
          
          {/* Subheading */}
          <p className="text-lg md:text-xl text-gray-300 mb-8 animate-fade-in-slow">
            Preparing an amazing experience for you...
          </p>

          {/* Animated loading dots */}
          <div className="flex justify-center space-x-2 mb-12">
            {[...Array(3)].map((_, i) => (
              <div 
                key={i}
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: i === 0 ? '#60a5fa' : i === 1 ? '#a78bfa' : '#2dd4bf',
                  animation: `bounce 1.5s infinite ${i * 0.2}s`
                }}
              ></div>
            ))}
          </div>

          <div className="inline-block px-4 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 animate-pulse-border">
            <p className="text-blue-300 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 animate-spin-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Initializing game environment...
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-6 text-gray-500 text-sm animate-fade-in-slower">
          Stay tuned! The adventure begins momentarily...
        </div>
      </div>

      {/* Global styles for animations */}
      <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.2; transform: scale(1.05); }
        }
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.05; transform: scale(1); }
          50% { opacity: 0.15; transform: scale(1.03); }
        }
        @keyframes pulse-slowest {
          0%, 100% { opacity: 0.05; transform: scale(1); }
          50% { opacity: 0.1; transform: scale(1.02); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-slow {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fade-in-slower {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-border {
          0%, 100% { border-color: rgba(55, 65, 81, 1); }
          50% { border-color: rgba(96, 165, 250, 0.5); }
        }
        .animate-pulse-slow { animation: pulse-slow 6s ease-in-out infinite; }
        .animate-pulse-slower { animation: pulse-slower 8s ease-in-out infinite; }
        .animate-pulse-slowest { animation: pulse-slowest 10s ease-in-out infinite; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-fade-in { animation: fade-in 1s ease-out forwards; }
        .animate-fade-in-slow { animation: fade-in-slow 1.5s ease-out forwards; }
        .animate-fade-in-slower { animation: fade-in-slower 2s ease-out forwards; }
        .animate-spin-slow { animation: spin-slow 3s linear infinite; }
        .animate-pulse-border { animation: pulse-border 2s ease-in-out infinite; }
      `}</style>
    </>
  );
}