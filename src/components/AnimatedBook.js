'use client';

import { useState, useEffect } from 'react';

export default function AnimatedMascot() {
  const [isWelcoming, setIsWelcoming] = useState(false);
  const [speechText, setSpeechText] = useState('');
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  const welcomeMessages = [
    'Welcome to Notes Manager! 📝',
    'Ready to organize your thoughts? ✨',
    'Let\'s make note-taking fun! 🎉',
    'Your ideas are precious! 💡'
  ];
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsWelcoming(true);
      setSpeechText(welcomeMessages[currentMessageIndex]);
      
      const resetTimer = setTimeout(() => {
        setIsWelcoming(false);
        setSpeechText('');
        setCurrentMessageIndex((prev) => (prev + 1) % welcomeMessages.length);
      }, 3000);
      
      return () => clearTimeout(resetTimer);
    }, 2000);
    
    const intervalTimer = setInterval(() => {
      if (!isHovered) {
        setIsWelcoming(true);
        setSpeechText(welcomeMessages[currentMessageIndex]);
        
        setTimeout(() => {
          setIsWelcoming(false);
          setSpeechText('');
          setCurrentMessageIndex((prev) => (prev + 1) % welcomeMessages.length);
        }, 3000);
      }
    }, 8000);
    
    return () => {
      clearTimeout(timer);
      clearInterval(intervalTimer);
    };
  }, [currentMessageIndex, isHovered]);

  const handleClick = () => {
    setIsWelcoming(true);
    setSpeechText('Click below to get started! 👇');
    setTimeout(() => {
      setIsWelcoming(false);
      setSpeechText('');
    }, 2500);
  };

  return (
    <div 
      className="fixed top-20 right-8 z-50 cursor-pointer"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        {speechText && (
          <div className="absolute -top-20 -left-32 bg-white/95 backdrop-blur-sm text-gray-800 px-4 py-3 rounded-2xl shadow-xl border-2 border-purple-300 animate-bounce">
            <div className="text-sm font-medium whitespace-nowrap">{speechText}</div>
            <div className="absolute bottom-0 left-16 transform translate-y-1/2 rotate-45 w-4 h-4 bg-white border-r-2 border-b-2 border-purple-300"></div>
          </div>
        )}
        
        <div className="mascot-container relative">
          <div className="robot-body bg-gradient-to-br from-blue-400 to-purple-500 w-16 h-20 rounded-2xl shadow-2xl border-4 border-white/30 relative overflow-hidden transform hover:scale-110 transition-all duration-300">
            
            <div className="face-container mt-2">
              <div className="eyes flex justify-center gap-2 mb-2">
                <div className={`eye w-3 h-3 bg-white rounded-full relative ${isWelcoming ? 'animate-pulse' : ''}`}>
                  <div className={`pupil w-2 h-2 bg-blue-600 rounded-full absolute top-0.5 left-0.5 ${isHovered ? 'animate-bounce' : ''}`}></div>
                </div>
                <div className={`eye w-3 h-3 bg-white rounded-full relative ${isWelcoming ? 'animate-pulse' : ''}`}>
                  <div className={`pupil w-2 h-2 bg-blue-600 rounded-full absolute top-0.5 left-0.5 ${isHovered ? 'animate-bounce' : ''}`}></div>
                </div>
              </div>
              
              <div className="mouth-container flex justify-center">
                <div className={`mouth w-6 h-3 border-2 border-white rounded-b-full ${isWelcoming ? 'animate-pulse bg-pink-400' : 'bg-transparent'}`}>
                  {isWelcoming && <div className="w-2 h-1 bg-white rounded-full mx-auto mt-0.5"></div>}
                </div>
              </div>
            </div>
            
            <div className="body-details absolute bottom-2 left-1/2 transform -translate-x-1/2">
              <div className="chest-panel w-8 h-6 bg-white/20 rounded border border-white/30 flex items-center justify-center">
                <div className="text-xs">📝</div>
              </div>
            </div>
            
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
              <div className="w-0.5 h-3 bg-yellow-400"></div>
              <div className={`w-2 h-2 bg-yellow-400 rounded-full -mt-0.5 ${isWelcoming ? 'animate-ping' : 'animate-pulse'}`}></div>
            </div>
            
            <div className="arms">
              <div className={`arm-left absolute -left-2 top-6 w-3 h-8 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full border-2 border-white/30 ${isWelcoming ? 'animate-bounce' : ''}`}></div>
              <div className={`arm-right absolute -right-2 top-6 w-3 h-8 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full border-2 border-white/30 ${isWelcoming ? 'animate-bounce' : ''}`}></div>
            </div>
            
            {isWelcoming && (
              <>
                <div className="absolute -top-4 -left-2 text-red-400 animate-bounce">💖</div>
                <div className="absolute -top-6 right-0 text-pink-400 animate-pulse">✨</div>
                <div className="absolute -top-3 -right-3 text-yellow-400 animate-bounce">⭐</div>
              </>
            )}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .mascot-container {
          animation: float 3s ease-in-out infinite;
        }
        
        .mascot-container:hover {
          animation: floatFast 1s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes floatFast {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          50% { transform: translateY(-15px) rotate(2deg); }
        }
      `}</style>
    </div>
  );
}