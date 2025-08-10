import { useState } from "react";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@/components/ui/button";
import { Calendar, Sparkles, Plus, X } from "lucide-react";
import CountryAutocomplete from "./CountryAutocomplete";

interface HeroSectionProps {
  onStartPlanning: (data: {
    startCountry: string;
    intermediateCountries: string[];
    endCountry: string;
    startDate: Date | null;
    endDate: Date | null;
  }) => void;
}

const HeroSection = ({ onStartPlanning }: HeroSectionProps) => {
  const [startCountry, setStartCountry] = useState("");
  const [endCountry, setEndCountry] = useState("");
  const [intermediateCountries, setIntermediateCountries] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleSubmit = () => {
    if (startCountry && endCountry) {
      onStartPlanning({ startCountry, intermediateCountries, endCountry, startDate, endDate });
    }
  };

  const addIntermediateCountry = () => {
    setIntermediateCountries([...intermediateCountries, ""]);
  };

  const removeIntermediateCountry = (index: number) => {
    setIntermediateCountries(intermediateCountries.filter((_, i) => i !== index));
  };

  const updateIntermediateCountry = (index: number, value: string) => {
    const updated = [...intermediateCountries];
    updated[index] = value;
    setIntermediateCountries(updated);
  };

  return (
    <div className="flex items-center justify-center min-h-screen relative">
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 md:p-8 max-w-lg w-full mx-4 border border-white/20 shadow-lg"
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
            className="text-lg md:text-xl text-coral-pink/80 font-dm-sans"
          >
            Your AI-powered travel companion to plan the perfect itinerary
          </motion.p>
        </div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="space-y-4"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-coral-pink">
                  Starting Country
                </label>
                <CountryAutocomplete
                  placeholder="e.g., Australia"
                  value={startCountry}
                  onChange={setStartCountry}
                  className="input-hero text-lg h-12 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-coral-pink">
                  Ending Country
                </label>
                <CountryAutocomplete
                  placeholder="e.g., Japan"
                  value={endCountry}
                  onChange={setEndCountry}
                  className="input-hero text-lg h-12 rounded-xl"
                />
              </div>
            </div>

            {/* Intermediate Countries */}
            {intermediateCountries.length > 0 && (
              <div className="space-y-3">
                <label className="block text-sm font-medium text-coral-pink">
                  Countries to visit in between
                </label>
                {intermediateCountries.map((country, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex gap-2"
                  >
                    <CountryAutocomplete
                      placeholder={`Country ${index + 1}`}
                      value={country}
                      onChange={(value) => updateIntermediateCountry(index, value)}
                      className="input-hero text-lg h-12 rounded-xl flex-1"
                    />
                    <Button
                      type="button"
                      onClick={() => removeIntermediateCountry(index)}
                      variant="outline"
                      className="h-12 w-12 rounded-xl border-coral-pink/20 text-coral-pink hover:bg-coral-pink/10"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </motion.div>
                ))}
              </div>
            )}

            <Button
              type="button"
              onClick={addIntermediateCountry}
              variant="outline"
              className="w-full h-12 rounded-xl border-coral-pink/30 text-coral-pink hover:bg-coral-pink/10 border-2 border-dashed"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add country to visit
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="grid md:grid-cols-2 gap-4"
          >
            <div>
              <label className="block text-sm font-medium mb-2 text-coral-pink">
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
              <label className="block text-sm font-medium mb-2 text-coral-pink">
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