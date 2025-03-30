import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const FloatingBlobs = () => {
  const [mousePos, setMousePos] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  // Track cursor movement
  useEffect(() => {
    let animationFrameId;
    const handleMouseMove = (e) => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        setMousePos({ x: e.clientX, y: e.clientY });
      });
    };
  
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  

  return (
    <div className="fixed inset-0 w-full h-full z-[-1] pointer-events-none">
      {/* Blob 1 - Top Left */}
      <motion.div
        className="absolute w-40 h-40 sm:w-60 sm:h-60 md:w-80 md:h-80 bg-[rgba(0,96,96,1)] filter blur-3xl rounded-full"
        initial={{ x: 100, y: 80 }}
        animate={{
          x: mousePos.x * 0.12 + 120,
          y: mousePos.y * 0.12 + 100,
        }}
        transition={{ type: "spring", stiffness: 25, damping: 8 }}
      />

      {/* Blob 2 - Slightly Right (Spread Out) */}
      <motion.div
        className="absolute w-60 h-60 sm:w-80 sm:h-80 md:w-100 md:h-100 bg-[rgba(0,96,96,1)] filter blur-2xl rounded-full"
        initial={{ x: window.innerWidth - 300, y: 100 }}
        animate={{
          x: mousePos.x * -0.12 + window.innerWidth - 320,
          y: mousePos.y * 0.10 + 130,
        }}
        transition={{ type: "spring", stiffness: 25, damping: 8 }}
      />

      {/* Blob 3 - Center */}
      <motion.div
        className="absolute w-50 h-50 sm:w-75 sm:h-75 md:w-90 md:h-90 bg-[rgba(0,96,96,1)] filter blur-2xl rounded-full"
        initial={{ x: window.innerWidth / 2 - 120, y: window.innerHeight / 2 - 150 }}
        animate={{
          x: mousePos.x * 0.10 + window.innerWidth / 2 - 140,
          y: mousePos.y * -0.10 + window.innerHeight / 2 - 130,
        }}
        transition={{ type: "spring", stiffness: 25, damping: 8 }}
      />

      {/* Blob 4 - Bottom Left */}
      <motion.div
        className="absolute w-40 h-40 sm:w-50 sm:h-50 md:w-60 md:h-60 bg-[rgba(0,96,96,1)] filter blur-2xl rounded-full"
        initial={{ x: 80, y: window.innerHeight - 220 }}
        animate={{
          x: mousePos.x * -0.14 + 100,
          y: mousePos.y * 0.14 + window.innerHeight - 240,
        }}
        transition={{ type: "spring", stiffness: 25, damping: 8 }}
      />

      {/* Blob 5 - Bottom Right (Moved More to Right for Balance) */}
      <motion.div
        className="absolute w-50 h-50 sm:w-75 sm:h-75 md:w-100 md:h-100 bg-[rgba(0,96,96,1)] filter blur-3xl rounded-full"
        initial={{ x: window.innerWidth - 250, y: window.innerHeight - 220 }}
        animate={{
          x: mousePos.x * 0.14 + window.innerWidth - 280,
          y: mousePos.y * -0.14 + window.innerHeight - 250,
        }}
        transition={{ type: "spring", stiffness: 25, damping: 8 }}
      />
    </div>
  );
};

export default FloatingBlobs;
