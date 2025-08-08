import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 right-0 z-50 p-6"
    >
      {/* Navbar is now empty but maintains the structure */}
    </motion.nav>
  );
};

export default Navbar;