import { motion } from "framer-motion";
import { Plane, MapPin, Compass, Camera, Mountain, Palmtree } from "lucide-react";

const FloatingIcons = () => {
  const icons = [
    { Icon: Plane, delay: 0, x: 10, y: 20 },
    { Icon: MapPin, delay: 1, x: 80, y: 60 },
    { Icon: Compass, delay: 2, x: 20, y: 80 },
    { Icon: Camera, delay: 3, x: 90, y: 30 },
    { Icon: Mountain, delay: 4, x: 60, y: 15 },
    { Icon: Palmtree, delay: 5, x: 30, y: 70 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {icons.map(({ Icon, delay, x, y }, index) => (
        <motion.div
          key={index}
          className="absolute text-coral-pink/30"
          style={{
            left: `${x}%`,
            top: `${y}%`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, -5, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 6,
            delay: delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Icon size={24} strokeWidth={1.5} />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingIcons;