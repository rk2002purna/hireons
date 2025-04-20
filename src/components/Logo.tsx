import { motion } from 'framer-motion';
import { Users, ArrowRight, Sparkles } from 'lucide-react';

const Logo = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-3"
    >
      <div className="relative">
        {/* Main logo container */}
        <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl transform rotate-12 flex items-center justify-center overflow-hidden">
          {/* Connection dots */}
          <div className="absolute w-2 h-2 bg-white rounded-full top-2 left-2" />
          <div className="absolute w-2 h-2 bg-white rounded-full bottom-2 right-2" />
          
          {/* Connection line */}
          <div className="absolute w-8 h-1 bg-white/30 rounded-full transform rotate-45" />
          
          {/* Center icon */}
          <div className="relative z-10">
            <Users className="w-6 h-6 text-white" />
          </div>
          
          {/* Sparkle effects */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          >
            <Sparkles className="absolute w-3 h-3 text-white/30 top-1 right-1" />
            <Sparkles className="absolute w-2 h-2 text-white/30 bottom-1 left-1" />
          </motion.div>
        </div>
        
        {/* Arrow animation */}
        <motion.div
          animate={{ x: [0, 4, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -right-2 top-1/2 -translate-y-1/2"
        >
          <ArrowRight className="w-4 h-4 text-primary-600" />
        </motion.div>
      </div>
      
      {/* Text */}
      <div className="flex flex-col">
        <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
          HireOns
        </span>
        <span className="text-xs text-gray-500 -mt-1">Connect. Refer. Grow.</span>
      </div>
    </motion.div>
  );
};

export default Logo; 