
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import TravelPlanHeader from "./travel-plan/TravelPlanHeader";
import TripSummaryCard from "./travel-plan/TripSummaryCard";
import PlanActions from "./travel-plan/PlanActions";
import LoadingState from "./travel-plan/LoadingState";
import ErrorState from "./travel-plan/ErrorState";
import PlanContent from "./travel-plan/PlanContent";

interface TravelPlanResultsProps {
  tripData: any;
  preferences: any;
  onBack: () => void;
}

const TravelPlanResults = ({ tripData, preferences, onBack }: TravelPlanResultsProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [travelPlan, setTravelPlan] = useState("");
  const [error, setError] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    generateTravelPlan();
  }, []);

  const generateTravelPlan = async () => {
    try {
      setIsLoading(true);
      setError("");
      
      console.log('Calling generate-travel-plan function with:', { tripData, preferences });

      const { data, error } = await supabase.functions.invoke('generate-travel-plan', {
        body: { tripData, preferences }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      if (data?.success) {
        setTravelPlan(data.travelPlan);
        toast({
          title: "Travel Plan Ready! ✨",
          description: "Your personalized itinerary has been generated.",
        });
      } else {
        throw new Error(data?.error || 'Failed to generate travel plan');
      }

    } catch (error) {
      console.error('Error generating travel plan:', error);
      setError(error.message || 'Failed to generate travel plan');
      toast({
        title: "Error",
        description: "Failed to generate your travel plan. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 hero-background relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <TravelPlanHeader onBack={onBack} />
          
          <TripSummaryCard tripData={tripData} preferences={preferences} />

          {isLoading ? (
            <LoadingState />
          ) : error ? (
            <ErrorState error={error} onRetry={generateTravelPlan} />
          ) : (
            <>
              <PlanActions travelPlan={travelPlan} tripData={tripData} />
              <PlanContent travelPlan={travelPlan} />
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default TravelPlanResults;
