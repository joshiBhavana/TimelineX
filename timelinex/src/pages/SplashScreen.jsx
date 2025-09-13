import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SplashScreen = ({ onComplete }) => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Hide splash screen after 3 seconds and call onComplete
    const timer = setTimeout(() => {
      setShowSplash(false);
      // Call onComplete after fade out animation completes
      setTimeout(() => onComplete && onComplete(), 500);
    }, 5000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const SplashScreenComponent = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #f5e6d3 0%, #e8d5c2 25%, #dbc4a8 50%, #d4b896 75%, #c9a876 100%)'
      }}
    >
      {/* Animated geometric shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => {
          const size = Math.random() * 100 + 20;
          const r = 139 + Math.random() * 40;
          const g = 90 + Math.random() * 30;
          const b = 50 + Math.random() * 20;
          
          return (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: size + 'px',
                height: size + 'px',
                background: `radial-gradient(circle, rgba(${r}, ${g}, ${b}, 0.15) 0%, transparent 70%)`,
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
              }}
              animate={{
                x: [0, Math.random() * 200 - 100, 0],
                y: [0, Math.random() * 200 - 100, 0],
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.7, 0.3]
              }}
              transition={{
                duration: Math.random() * 15 + 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          );
        })}
      </div>

      {/* Flowing wave background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 20% 20%, rgba(184, 143, 92, 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(212, 184, 150, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 20%, rgba(184, 143, 92, 0.4) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(212, 184, 150, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 20%, rgba(184, 143, 92, 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(212, 184, 150, 0.3) 0%, transparent 50%)'
            ]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Subtle texture overlay */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23B8905C" fill-opacity="0.1"%3E%3Cpath d="M20 20c0 11.046-8.954 20-20 20v-40c11.046 0 20 8.954 20 20z"/%3E%3C/g%3E%3C/svg%3E")'
        }}
      />

      {/* Main content container */}
      <div className="relative z-20 text-center">
        
        {/* TimelineX Text with individual colored letters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-8"
        >
          <motion.h1 
            className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-wider"
            animate={{
              filter: [
                'drop-shadow(0 4px 8px rgba(0,0,0,0.2))',
                'drop-shadow(0 8px 16px rgba(139,90,50,0.3))',
                'drop-shadow(0 4px 8px rgba(0,0,0,0.2))'
              ]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {'TIMELINEX'.split('').map((letter, index) => {
              // Enhanced color palette matching your Canva logo
              const colors = [
                '#5D2E0A', // T - Very dark brown
                '#6B3B1A', // I - Dark brown
                '#7A482A', // M - Medium dark brown
                '#89553A', // E - Medium brown
                '#98624A', // L - Brown
                '#A76F5A', // I - Light brown
                '#B67C6A', // N - Lighter brown
                '#C5897A', // E - Light beige brown
                '#D4968A'  // X - Very light beige
              ];
              
              return (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 50, scale: 0.8, rotateZ: -10 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    rotateZ: 0,
                    rotateY: [0, 10, 0],
                  }}
                  transition={{
                    delay: 0.5 + index * 0.1,
                    duration: 0.8,
                    type: "spring",
                    stiffness: 100,
                    rotateY: {
                      duration: 5,
                      repeat: Infinity,
                      delay: index * 0.3,
                      ease: "easeInOut"
                    }
                  }}
                  className="inline-block"
                  style={{ 
                    color: colors[index],
                    textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                  }}
                  whileHover={{
                    scale: 1.1,
                    y: -5,
                    textShadow: '0 8px 16px rgba(0,0,0,0.4)',
                    transition: { duration: 0.2 }
                  }}
                >
                  {letter}
                </motion.span>
              );
            })}
          </motion.h1>
        </motion.div>

        {/* Enhanced Clock Icon with Decorative Lines */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            delay: 1.4, 
            duration: 0.8,
            type: "spring",
            stiffness: 160
          }}
          className="flex items-center justify-center mb-8"
        >
          {/* Left decorative line with gradient */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "150px" }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="h-1 mr-8 rounded-full"
            style={{
              background: 'linear-gradient(to right, transparent, #8B5A3C, #A0704A)'
            }}
          />
          
          {/* Enhanced Clock Icon */}
          <motion.div
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.1, 1],
              boxShadow: [
                '0 0 20px rgba(139, 90, 60, 0.3)',
                '0 0 40px rgba(139, 90, 60, 0.6)',
                '0 0 20px rgba(139, 90, 60, 0.3)'
              ]
            }}
            transition={{
              rotate: {
                delay: 2,
                duration: 10,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear"
              },
              scale: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              },
              boxShadow: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
            className="w-12 h-12 border-3 rounded-full flex items-center justify-center relative mx-6 bg-gradient-to-br from-amber-100 to-orange-200"
            style={{
              borderColor: '#8B5A3C'
            }}
            whileHover={{
              scale: 1.2,
              boxShadow: '0 0 30px rgba(139, 90, 60, 0.8)'
            }}
          >
            {/* Enhanced clock hands */}
            <motion.div 
              className="absolute w-1 h-4 origin-bottom rounded-full"
              style={{ 
                background: '#8B5A3C',
                transform: 'rotate(90deg) translateY(-8px)' 
              }}
              animate={{ rotate: [90, 180, 270, 360, 90] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute w-1 h-3 origin-bottom rounded-full"
              style={{ 
                background: '#A0704A',
                transform: 'rotate(0deg) translateY(-6px)' 
              }}
              animate={{ rotate: [0, 90, 180, 270, 360, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute w-2 h-2 rounded-full"
              style={{ background: '#8B5A3C' }}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
          
          {/* Right decorative line with gradient */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "150px" }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="h-1 ml-8 rounded-full"
            style={{
              background: 'linear-gradient(to left, transparent, #8B5A3C, #A0704A)'
            }}
          />
        </motion.div>

        {/* Enhanced subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="text-2xl font-light tracking-wide mb-6"
          style={{ color: '#8B5A3C' }}
        >
          Visualize Your Timeline
        </motion.p>

        {/* Enhanced loading indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4, duration: 0.4 }}
          className="mt-8"
        >
          <div className="flex items-center justify-center space-x-3">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-3 h-3 rounded-full"
                style={{ background: '#8B5A3C' }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                  y: [0, -10, 0]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.3
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Enhanced lighting effects */}
      <div className="absolute top-0 left-0 right-0 h-60 bg-gradient-to-b from-white/50 via-amber-100/30 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-60 bg-gradient-to-t from-amber-900/20 via-orange-200/10 to-transparent pointer-events-none" />
    </motion.div>
  );

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {showSplash && <SplashScreenComponent key="splash" />}
      </AnimatePresence>
    </div>
  );
};

export default SplashScreen;