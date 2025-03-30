import React from "react";

const QuizComponent = () => {
  return (
    <div className="min-h-screen bg-black text-cyan-300 flex flex-col items-center justify-center p-6">
      {/* Header */}
      <div className="flex justify-between items-center w-full max-w-4xl bg-gray-800 p-4 rounded-lg">
    <div className="w-[297.14px] h-[72px] bg-teal-600 rounded-lg flex items-center justify-center">
      Box 1
    </div>
    <div className="w-[641.31px] h-[72px] bg-teal-700 rounded-lg flex items-center justify-center">
      Box 2
    </div>
    <div className="w-[297.14px] h-[72px] bg-teal-600 rounded-lg flex items-center justify-center">
      Box 3
    </div>
  </div>
    </div>
  );
};

export default QuizComponent;
