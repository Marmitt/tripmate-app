import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Download, Share2, ArrowLeft, MapPin, Calendar, Users, DollarSign } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

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
          title: "Travel Plan Ready!",
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

  const formatTravelPlan = (plan: string) => {
    return plan.split('\n').map((line, index) => {
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-3xl font-bold text-coral-pink mb-4 mt-8">{line.slice(2)}</h1>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={index} className="text-2xl font-semibold text-cyan-400 mb-3 mt-6">{line.slice(3)}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={index} className="text-xl font-medium text-purple-400 mb-2 mt-4">{line.slice(4)}</h3>;
      }
      if (line.startsWith('- ')) {
        return <li key={index} className="text-gray-700 mb-1 ml-4">{line.slice(2)}</li>;
      }
      if (line.trim() === '') {
        return <br key={index} />;
      }
      return <p key={index} className="text-gray-800 mb-2 leading-relaxed">{line}</p>;
    });
  };

  const downloadPlan = () => {
    const element = document.createElement('a');
    const file = new Blob([travelPlan], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `travel-plan-${tripData.startCountry}-to-${tripData.endCountry}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Downloaded!",
      description: "Your travel plan has been downloaded.",
    });
  };

  const sharePlan = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Travel Plan',
          text: travelPlan,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(travelPlan);
      toast({
        title: "Copied!",
        description: "Travel plan copied to clipboard.",
      });
    }
  };

  const getTripSummary = () => {
    const startDate = new Date(tripData.startDate);
    const endDate = new Date(tripData.endDate);
    const duration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    return {
      route: `${tripData.startCountry} → ${tripData.intermediateCountries?.join(' → ') || ''} ${tripData.intermediateCountries?.length ? '→' : ''} ${tripData.endCountry}`.replace(/\s+/g, ' '),
      duration,
      travelers: preferences.travelers,
      budget: preferences.budget
    };
  };

  const summary = getTripSummary();

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Button 
            onClick={onBack}
            variant="outline"
            className="mb-6 bg-white/70 backdrop-blur-sm border-white/20 hover:bg-white/80"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Planning
          </Button>

          <Card className="bg-white/70 backdrop-blur-sm border-white/20 mb-6">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-coral-pink flex items-center gap-2">
                <MapPin className="w-6 h-6" />
                Your Travel Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  <span className="font-medium">Route:</span>
                  <span className="text-gray-600">{summary.route}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-purple-400" />
                  <span className="font-medium">Duration:</span>
                  <span className="text-gray-600">{summary.duration} days</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-green-400" />
                  <span className="font-medium">Travelers:</span>
                  <span className="text-gray-600">{summary.travelers}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-yellow-400" />
                  <span className="font-medium">Budget:</span>
                  <span className="text-gray-600 capitalize">{summary.budget}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {isLoading ? (
            <Card className="bg-white/70 backdrop-blur-sm border-white/20">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="mb-6"
                >
                  <Loader2 className="w-12 h-12 text-cyan-400" />
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Creating Your Perfect Itinerary
                </h3>
                <p className="text-gray-600 text-center max-w-md">
                  Our AI is crafting a personalized travel plan based on your preferences. 
                  This may take a moment...
                </p>
              </CardContent>
            </Card>
          ) : error ? (
            <Card className="bg-white/70 backdrop-blur-sm border-white/20">
              <CardContent className="text-center py-16">
                <div className="text-red-500 text-6xl mb-4">⚠️</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Oops! Something went wrong
                </h3>
                <p className="text-gray-600 mb-6">{error}</p>
                <Button onClick={generateTravelPlan} className="bg-coral-pink hover:bg-coral-pink/90">
                  Try Again
                </Button>
              </CardContent>
            </Card>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="flex gap-4 mb-6">
                <Button onClick={downloadPlan} variant="outline" className="bg-white/70 backdrop-blur-sm border-white/20 hover:bg-white/80">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button onClick={sharePlan} variant="outline" className="bg-white/70 backdrop-blur-sm border-white/20 hover:bg-white/80">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>

              <Card className="bg-white/70 backdrop-blur-sm border-white/20">
                <CardContent className="p-8">
                  <div className="prose prose-lg max-w-none">
                    {formatTravelPlan(travelPlan)}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default TravelPlanResults;