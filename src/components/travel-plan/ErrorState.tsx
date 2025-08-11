
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

const ErrorState = ({ error, onRetry }: ErrorStateProps) => {
  return (
    <Card className="bg-gradient-to-br from-white/95 to-white/85 backdrop-blur-sm border-white/30 shadow-xl">
      <CardContent className="text-center py-20">
        <div className="mb-6">
          <AlertTriangle className="w-16 h-16 text-coral-pink mx-auto mb-4" />
        </div>
        <h3 className="text-2xl font-bold text-navy-blue mb-4">
          Oops! Something went wrong
        </h3>
        <p className="text-navy-blue/70 mb-8 text-lg max-w-md mx-auto leading-relaxed">
          {error}
        </p>
        <Button 
          onClick={onRetry} 
          className="bg-coral-pink hover:bg-coral-pink/90 text-white px-8 py-3 text-lg shadow-lg"
        >
          Try Again
        </Button>
      </CardContent>
    </Card>
  );
};

export default ErrorState;
