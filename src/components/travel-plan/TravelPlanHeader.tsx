
import { ArrowLeft, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TravelPlanHeaderProps {
  onBack: () => void;
}

const TravelPlanHeader = ({ onBack }: TravelPlanHeaderProps) => {
  return (
    <div className="mb-8">
      <Button 
        onClick={onBack}
        variant="outline"
        className="mb-6 bg-white/90 backdrop-blur-sm border-white/30 hover:bg-white text-navy-blue hover:text-navy-blue shadow-md"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Planning
      </Button>

      <Card className="bg-gradient-to-r from-white/90 to-white/80 backdrop-blur-sm border-white/30 shadow-xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-3xl font-bold text-navy-blue flex items-center gap-3">
            <div className="p-2 bg-coral-pink/20 rounded-full">
              <MapPin className="w-8 h-8 text-coral-pink" />
            </div>
            Your Personalized Travel Plan
          </CardTitle>
          <p className="text-navy-blue/70 text-lg mt-2">
            Crafted just for you with AI-powered recommendations
          </p>
        </CardHeader>
      </Card>
    </div>
  );
};

export default TravelPlanHeader;
