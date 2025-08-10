import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { countries } from "@/data/countries";

interface CountryAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  className?: string;
}

const CountryAutocomplete = ({ value, onChange, placeholder, className }: CountryAutocompleteProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredCountries, setFilteredCountries] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value) {
      const filtered = countries.filter(country =>
        country.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5);
      setFilteredCountries(filtered);
      setIsOpen(filtered.length > 0 && value !== filtered.find(c => c.toLowerCase() === value.toLowerCase()));
    } else {
      setFilteredCountries([]);
      setIsOpen(false);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (country: string) => {
    onChange(country);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative">
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => value && filteredCountries.length > 0 && setIsOpen(true)}
        className={className}
        autoComplete="off"
      />
      <AnimatePresence>
        {isOpen && filteredCountries.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-full mt-1 bg-white rounded-lg border border-gray-200 shadow-lg max-h-60 overflow-auto"
          >
            {filteredCountries.map((country, index) => (
              <button
                key={country}
                onClick={() => handleSelect(country)}
                className="w-full text-left px-4 py-3 hover:bg-coral-pink/10 transition-colors border-b last:border-b-0 text-gray-700 hover:text-coral-pink"
              >
                {country}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CountryAutocomplete;