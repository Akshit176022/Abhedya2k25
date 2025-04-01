import { useEffect } from 'react';

export default function GameEnded() {

  useEffect(() => {
  }, []);

  return (
    <>
      <div className="relative min-h-screen text-white flex flex-col items-center justify-center p-8 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-1/3 right-1/3 w-72 h-72 bg-purple-600 rounded-full filter blur-3xl animate-pulse-slower"></div>
          <div className="absolute top-2/3 left-1/2 w-48 h-48 bg-teal-400 rounded-full filter blur-3xl animate-pulse-slowest"></div>
        </div>

        <div className="relative z-10 text-center max-w-2xl w-full px-4">
          {/* Celebration icon */}
          <div className="mx-auto mb-12 w-32 h-32 animate-float">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-yellow-400">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </div>

          {/* Main heading with gradient text */}
          <h1 className="text-4xl md:text-4xl font-bold mb-6 animate-fade-in">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-400">
              ABHEDYA 4.O HAS ENDED
            </span>
          </h1>
          
          {/* Thank you message */}
          <p className="text-lg md:text-xl text-gray-300 mb-4 animate-fade-in-slow">
            Thank you for playing ABHEDYA 4.O!
          </p>
          
          {/* Hope you enjoyed message */}
          <p className="text-lg md:text-xl text-gray-300 mb-8 animate-fade-in-slow">
            We hope you enjoyed the adventure!
          </p>

          {/* Congratulations section */}
          <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6 mb-8 border border-yellow-500 animate-pulse-border">
            <h2 className="text-2xl font-bold text-yellow-400 mb-2">Congratulations to the Winners!</h2>
            <p className="text-gray-300 mb-4">To those who didn't win this time, don't worry!</p>
            <p className="text-blue-300 font-medium">More exciting events are coming soon in PRODY!</p>
          </div>

          {/* Social links */}
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-6 justify-center mb-12 animate-fade-in-slower">
            <a 
              href="https://prody.istenith.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              Visit PRODY Website
            </a>
            
            <a 
              href="https://chat.whatsapp.com/L9oRQK10eGL25CSGI6wZQK" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg transition-colors flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Join PRODY WhatsApp Community
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-6 text-gray-500 text-sm animate-fade-in-slower">
          Thank you for being part of this amazing journey!
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
          0%, 100% { border-color: rgba(234, 179, 8, 0.5); }
          50% { border-color: rgba(234, 179, 8, 1); }
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