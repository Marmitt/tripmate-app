import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Users, DollarSign, Zap, Camera, Building, 
  MapPin, Coffee, Music, Mountain, Heart,
  Hotel, Home, Tent, Backpack, Sparkles
} from "lucide-react";

interface QuestionnaireSectionProps {
  onComplete: (preferences: any) => void;
  onBack: () => void;
}

const QuestionnaireSection = ({ onComplete, onBack }: QuestionnaireSectionProps) => {
  const [travelers, setTravelers] = useState(1);
  const [budget, setBudget] = useState("");
  const [pace, setPace] = useState("");
  const [vibes, setVibes] = useState<string[]>([]);
  const [accommodation, setAccommodation] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [mustDos, setMustDos] = useState("");
  const [avoids, setAvoids] = useState("");
  const [surprises, setSurprises] = useState(false);

  const budgetOptions = [
    { id: "backpacker", label: "Backpacker", icon: "🎒" },
    { id: "mid-range", label: "Mid-range", icon: "🏨" },
    { id: "luxury", label: "Luxury", icon: "💎" },
  ];

  const paceOptions = [
    { id: "fast", label: "Fast", icon: "🏃", desc: "See everything!" },
    { id: "balanced", label: "Balanced", icon: "📷", desc: "Perfect mix" },
    { id: "relaxed", label: "Relaxed", icon: "🛋️", desc: "Take it easy" },
  ];

  const vibeOptions = [
    { id: "party", label: "Party & Nightlife", icon: "🍸" },
    { id: "nature", label: "Peace & Nature", icon: "🌿" },
    { id: "culture", label: "Culture & History", icon: "🏛️" },
    { id: "adventure", label: "Adventure", icon: "⛰️" },
    { id: "wellness", label: "Wellness", icon: "🧘" },
    { id: "festivals", label: "Festivals", icon: "🎉" },
    { id: "shopping", label: "Shopping", icon: "🛍️" },
    { id: "music", label: "Live Music", icon: "🎶" },
  ];

  const accommodationOptions = [
    { id: "hotel", label: "Hotel", icon: Hotel },
    { id: "hostel", label: "Hostel", icon: Building },
    { id: "airbnb", label: "Airbnb", icon: Home },
    { id: "camping", label: "Camping/Glamping", icon: Tent },
  ];

  const interestSuggestions = [
    "Food", "Photography", "Museums", "Wildlife", "Surfing", 
    "Hiking", "Architecture", "Street Art", "Markets", "Beaches"
  ];

  const toggleVibe = (vibe: string) => {
    setVibes(prev => prev.includes(vibe) 
      ? prev.filter(v => v !== vibe)
      : [...prev, vibe]
    );
  };

  const toggleInterest = (interest: string) => {
    setInterests(prev => prev.includes(interest)
      ? prev.filter(i => i !== interest)
      : [...prev, interest]
    );
  };

  const isFormValid = () => {
    return budget && pace && vibes.length > 0 && accommodation && interests.length > 0;
  };

  const handleComplete = () => {
    if (!isFormValid()) {
      return;
    }
    
    const preferences = {
      travelers,
      budget,
      pace,
      vibes,
      accommodation,
      interests,
      mustDos,
      avoids,
      surprises,
    };
    onComplete(preferences);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen py-8 px-4"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-navy-blue font-fredoka mb-4">
            Let's Build Your Dream Trip
          </h1>
          <p className="text-lg text-navy-blue/70 font-dm-sans">
            Tell us about your travel style and preferences
          </p>
        </motion.div>

        <div className="space-y-12">
          {/* The Basics */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="hero-card rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-navy-blue font-fredoka mb-6 flex items-center gap-2">
              🔹 The Basics
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium mb-4 text-foreground">
                  How many travelers?
                </label>
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setTravelers(Math.max(1, travelers - 1))}
                    className="rounded-full w-10 h-10"
                  >
                    -
                  </Button>
                  <span className="text-2xl font-bold text-coral-pink w-8 text-center">
                    {travelers}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setTravelers(travelers + 1)}
                    className="rounded-full w-10 h-10"
                  >
                    +
                  </Button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-4 text-foreground">
                  What's your budget style?
                </label>
                <div className="space-y-2">
                  {budgetOptions.map((option) => (
                    <Button
                      key={option.id}
                      variant={budget === option.id ? "default" : "outline"}
                      onClick={() => setBudget(option.id)}
                      className="w-full justify-start text-left"
                    >
                      <span className="mr-2">{option.icon}</span>
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

          {/* Travel Personality */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="hero-card rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-navy-blue font-fredoka mb-6">
              🔹 Your Travel Personality
            </h2>
            
            <div className="space-y-8">
              <div>
                <label className="block text-sm font-medium mb-4 text-foreground">
                  How fast do you want to go?
                </label>
                <div className="grid md:grid-cols-3 gap-4">
                  {paceOptions.map((option) => (
                    <Button
                      key={option.id}
                      variant={pace === option.id ? "default" : "outline"}
                      onClick={() => setPace(option.id)}
                      className="h-auto p-4 flex-col"
                    >
                      <span className="text-2xl mb-2">{option.icon}</span>
                      <span className="font-semibold">{option.label}</span>
                      <span className="text-sm opacity-70">{option.desc}</span>
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-4 text-foreground">
                  What's your vibe? (Select all that apply)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {vibeOptions.map((option) => (
                    <Button
                      key={option.id}
                      variant={vibes.includes(option.id) ? "default" : "outline"}
                      onClick={() => toggleVibe(option.id)}
                      className="h-auto p-4 flex-col text-center"
                    >
                      <span className="text-xl mb-1">{option.icon}</span>
                      <span className="text-xs">{option.label}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

          {/* Interests & Stay Style */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="hero-card rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-navy-blue font-fredoka mb-6">
              🔹 Interests & Stay Style
            </h2>
            
            <div className="space-y-8">
              <div>
                <label className="block text-sm font-medium mb-4 text-foreground">
                  Where would you like to stay?
                </label>
                <div className="grid md:grid-cols-4 gap-4">
                  {accommodationOptions.map((option) => (
                    <Button
                      key={option.id}
                      variant={accommodation === option.id ? "default" : "outline"}
                      onClick={() => setAccommodation(option.id)}
                      className="h-auto p-4 flex-col"
                    >
                      <option.icon className="h-6 w-6 mb-2" />
                      <span className="text-sm">{option.label}</span>
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-4 text-foreground">
                  What are you most excited about?
                </label>
                <div className="flex flex-wrap gap-2 mb-4">
                  {interestSuggestions.map((interest) => (
                    <Badge
                      key={interest}
                      variant={interests.includes(interest) ? "default" : "outline"}
                      onClick={() => toggleInterest(interest)}
                      className="cursor-pointer hover:scale-105 transition-transform"
                    >
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

          {/* Details & Preferences */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="hero-card rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-navy-blue font-fredoka mb-6">
              🔹 Details & Preferences
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">
                  Must-dos or bucket list items?
                </label>
                <Textarea
                  placeholder="e.g., See the Northern Lights, Try authentic ramen, Visit ancient temples..."
                  value={mustDos}
                  onChange={(e) => setMustDos(e.target.value)}
                  className="input-hero"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-foreground">
                  Anything to avoid?
                </label>
                <Input
                  placeholder="e.g., long walks, spicy food, crowded places..."
                  value={avoids}
                  onChange={(e) => setAvoids(e.target.value)}
                  className="input-hero"
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="surprises"
                  checked={surprises}
                  onChange={(e) => setSurprises(e.target.checked)}
                  className="w-5 h-5 rounded border-2 border-coral-pink"
                />
                <label htmlFor="surprises" className="text-foreground font-medium">
                  Want surprise or off-the-beaten-path ideas? ✨
                </label>
              </div>
            </div>
          </motion.section>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex gap-4 justify-center"
          >
            <Button
              variant="outline"
              onClick={onBack}
              className="px-8 py-3 rounded-xl"
            >
              Back
            </Button>
            <Button
              onClick={handleComplete}
              disabled={!isFormValid()}
              className="btn-hero px-8 py-3 rounded-xl font-fredoka text-lg group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="flex items-center gap-2">
                Create My Itinerary!
              </span>
            </Button>
            {!isFormValid() && (
              <p className="text-sm text-coral-pink mt-2 text-center">
                Please fill out all required fields: budget, pace, at least one vibe, accommodation, and at least one interest.
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default QuestionnaireSection;