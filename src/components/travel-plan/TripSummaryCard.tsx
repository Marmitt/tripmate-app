
import { MapPin, Calendar, Users, DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface TripSummaryCardProps {
  tripData: any;
  preferences: any;
}

const TripSummaryCard = ({ tripData, preferences }: TripSummaryCardProps) => {
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

  const summaryItems = [
    {
      icon: MapPin,
      label: "Route",
      value: summary.route,
      color: "text-coral-pink"
    },
    {
      icon: Calendar,
      label: "Duration",
      value: `${summary.duration} days`,
      color: "text-sky-blue"
    },
    {
      icon: Users,
      label: "Travelers",
      value: summary.travelers,
      color: "text-mint-green"
    },
    {
      icon: DollarSign,
      label: "Budget",
      value: summary.budget.charAt(0).toUpperCase() + summary.budget.slice(1),
      color: "text-sunny-yellow"
    }
  ];

  return (
    <Card className="hero-card mb-8">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {summaryItems.map((item, index) => (
            <div key={index} className="flex items-center gap-3 p-4 bg-white/50 rounded-xl border border-white/20">
              <div className={`p-2 rounded-full bg-white/70 ${item.color}`}>
                <item.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-navy-blue/70">{item.label}</p>
                <p className="font-semibold text-navy-blue text-sm">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TripSummaryCard;
