import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import QuestionnaireSection from "@/components/QuestionnaireSection";
import FloatingIcons from "@/components/FloatingIcons";
import Navbar from "@/components/Navbar";

type AppState = "landing" | "questionnaire" | "results";

interface TripData {
  startCountry: string;
  endCountry: string;
  startDate: Date | null;
  endDate: Date | null;
}

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>("landing");
  const [tripData, setTripData] = useState<TripData | null>(null);
  const [preferences, setPreferences] = useState<any>(null);

  const handleStartPlanning = (data: TripData) => {
    setTripData(data);
    setCurrentState("questionnaire");
  };

  const handleQuestionnaireComplete = (prefs: any) => {
    setPreferences(prefs);
    setCurrentState("results");
    // Here you would typically call your AI service to generate the itinerary
    console.log("Trip Data:", tripData);
    console.log("Preferences:", prefs);
  };

  const handleBack = () => {
    setCurrentState("landing");
  };

  return (
    <div className="min-h-screen hero-background relative overflow-hidden">
      <FloatingIcons />
      <Navbar />
      
      <AnimatePresence mode="wait">
        {currentState === "landing" && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
          >
            <HeroSection onStartPlanning={handleStartPlanning} />
          </motion.div>
        )}
        
        {currentState === "questionnaire" && (
          <motion.div
            key="questionnaire"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <QuestionnaireSection 
              onComplete={handleQuestionnaireComplete}
              onBack={handleBack}
            />
          </motion.div>
        )}
        
        {currentState === "results" && (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="min-h-screen flex items-center justify-center"
          >
            <div className="hero-card rounded-3xl p-12 max-w-2xl mx-4 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
                className="text-6xl mb-6"
              >
                ✈️
              </motion.div>
              <h1 className="text-4xl font-bold text-coral-pink font-fredoka mb-4">
                Your Itinerary is Being Created!
              </h1>
              <p className="text-lg text-muted-foreground font-dm-sans mb-8">
                Our AI is crafting the perfect travel plan based on your preferences...
              </p>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="inline-block text-4xl"
              >
                🌍
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
