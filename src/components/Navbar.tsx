import { motion } from "framer-motion";

const Navbar = () => {
  const navItems = [
    { label: "About", href: "#about" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 right-0 z-50 p-6"
    >
      <div className="flex gap-8">
        {navItems.map((item, index) => (
          <motion.a
            key={item.label}
            href={item.href}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.4 }}
            className="text-muted-foreground hover:text-coral-pink transition-colors duration-300 font-dm-sans font-medium relative group"
          >
            {item.label}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-coral-pink transition-all duration-300 group-hover:w-full"></span>
          </motion.a>
        ))}
      </div>
    </motion.nav>
  );
};

export default Navbar;