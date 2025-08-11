import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import QuestionnaireSection from "@/components/QuestionnaireSection";
import FloatingIcons from "@/components/FloatingIcons";
import Navbar from "@/components/Navbar";
import TravelPlanResults from "@/components/TravelPlanResults";

type AppState = "landing" | "questionnaire" | "results";

interface TripData {
  startCountry: string;
  intermediateCountries: string[];
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
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <TravelPlanResults 
              tripData={tripData}
              preferences={preferences}
              onBack={handleBack}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
