import { useState } from "react";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Sparkles } from "lucide-react";

interface HeroSectionProps {
  onStartPlanning: (data: {
    startCountry: string;
    endCountry: string;
    startDate: Date | null;
    endDate: Date | null;
  }) => void;
}

const HeroSection = ({ onStartPlanning }: HeroSectionProps) => {
  const [startCountry, setStartCountry] = useState("");
  const [endCountry, setEndCountry] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleSubmit = () => {
    if (startCountry && endCountry) {
      onStartPlanning({ startCountry, endCountry, startDate, endDate });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen relative">
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="hero-card rounded-3xl p-8 md:p-12 max-w-2xl w-full mx-4 backdrop-blur-sm"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <span className="text-5xl md:text-6xl">🌎</span>
            <h1 className="text-4xl md:text-5xl font-bold text-coral-pink font-fredoka">
              TripMate
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground font-dm-sans"
          >
            Your AI-powered travel companion to plan the perfect itinerary
          </motion.p>
        </div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="grid md:grid-cols-2 gap-4"
          >
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">
                Starting Country
              </label>
              <Input
                placeholder="e.g., Australia"
                value={startCountry}
                onChange={(e) => setStartCountry(e.target.value)}
                className="input-hero text-lg h-12 rounded-xl"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">
                Ending Country
              </label>
              <Input
                placeholder="e.g., Japan"
                value={endCountry}
                onChange={(e) => setEndCountry(e.target.value)}
                className="input-hero text-lg h-12 rounded-xl"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="grid md:grid-cols-2 gap-4"
          >
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">
                Start Date
              </label>
              <div className="relative">
                <DatePicker
                  selected={startDate}
                  onChange={(date: Date | null) => setStartDate(date)}
                  placeholderText="Select start date"
                  className="input-hero text-lg h-12 rounded-xl w-full pl-10"
                  dateFormat="MMM dd, yyyy"
                />
                <Calendar className="absolute left-3 top-3 h-6 w-6 text-coral-pink" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">
                End Date
              </label>
              <div className="relative">
                <DatePicker
                  selected={endDate}
                  onChange={(date: Date | null) => setEndDate(date)}
                  placeholderText="Select end date"
                  className="input-hero text-lg h-12 rounded-xl w-full pl-10"
                  dateFormat="MMM dd, yyyy"
                  minDate={startDate || undefined}
                />
                <Calendar className="absolute left-3 top-3 h-6 w-6 text-coral-pink" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            className="pt-4"
          >
            <Button
              onClick={handleSubmit}
              disabled={!startCountry || !endCountry}
              className="btn-hero w-full h-14 text-lg font-semibold rounded-xl font-fredoka group"
            >
              <span className="flex items-center gap-2">
                Start Planning
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="h-5 w-5" />
                </motion.div>
              </span>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;