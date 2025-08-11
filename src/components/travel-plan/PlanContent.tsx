
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

interface PlanContentProps {
  travelPlan: string;
}

const PlanContent = ({ travelPlan }: PlanContentProps) => {
  const formatTravelPlan = (plan: string) => {
    return plan.split('\n').map((line, index) => {
      if (line.startsWith('# ')) {
        return (
          <h1 key={index} className="text-4xl font-bold text-navy-blue mb-6 mt-8 pb-3 border-b-2 border-coral-pink/30">
            {line.slice(2)}
          </h1>
        );
      }
      if (line.startsWith('## ')) {
        return (
          <h2 key={index} className="text-2xl font-bold text-coral-pink mb-4 mt-8 flex items-center gap-2">
            <span className="w-2 h-8 bg-coral-pink rounded-full"></span>
            {line.slice(3)}
          </h2>
        );
      }
      if (line.startsWith('### ')) {
        return (
          <h3 key={index} className="text-xl font-semibold text-sky-blue mb-3 mt-6">
            {line.slice(4)}
          </h3>
        );
      }
      if (line.startsWith('- ')) {
        return (
          <li key={index} className="text-navy-blue/80 mb-2 ml-6 pl-2 border-l-2 border-mint-green/50 list-none">
            <span className="inline-block w-2 h-2 bg-mint-green rounded-full mr-3"></span>
            {line.slice(2)}
          </li>
        );
      }
      if (line.trim() === '') {
        return <br key={index} />;
      }
      return (
        <p key={index} className="text-navy-blue/90 mb-3 leading-relaxed text-lg">
          {line}
        </p>
      );
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
    >
      <Card className="bg-gradient-to-br from-white/95 to-white/85 backdrop-blur-sm border-white/30 shadow-xl">
        <CardContent className="p-10">
          <div className="prose prose-lg max-w-none">
            {formatTravelPlan(travelPlan)}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PlanContent;
