
import { motion } from "framer-motion";
import { Loader2, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const LoadingState = () => {
  return (
    <Card className="hero-card-static">
      <CardContent className="flex flex-col items-center justify-center py-20">
        <div className="relative mb-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="mb-6"
          >
            <Loader2 className="w-16 h-16 text-coral-pink" />
          </motion.div>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-2 -right-2"
          >
            <Sparkles className="w-6 h-6 text-sunny-yellow" />
          </motion.div>
        </div>
        
        <h3 className="text-2xl font-bold text-navy-blue mb-4 text-center">
          Creating Your Perfect Itinerary
        </h3>
        <p className="text-navy-blue/70 text-center max-w-md text-lg leading-relaxed">
          Our AI is crafting a personalized travel plan based on your preferences. 
          This magical process may take a moment...
        </p>
        
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-8 flex gap-2"
        >
          <div className="w-3 h-3 bg-coral-pink rounded-full"></div>
          <div className="w-3 h-3 bg-sunny-yellow rounded-full"></div>
          <div className="w-3 h-3 bg-sky-blue rounded-full"></div>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default LoadingState;
