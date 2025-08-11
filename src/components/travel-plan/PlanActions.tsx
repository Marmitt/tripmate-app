
import { Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface PlanActionsProps {
  travelPlan: string;
  tripData: any;
}

const PlanActions = ({ travelPlan, tripData }: PlanActionsProps) => {
  const { toast } = useToast();

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

  return (
    <div className="flex gap-4 mb-8">
      <Button 
        onClick={downloadPlan} 
        variant="outline"
      >
        <Download className="w-4 h-4 mr-2" />
        Download Plan
      </Button>
      <Button 
        onClick={sharePlan} 
        variant="outline"
      >
        <Share2 className="w-4 h-4 mr-2" />
        Share Plan
      </Button>
    </div>
  );
};

export default PlanActions;
