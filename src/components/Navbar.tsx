import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import pvpaLogo from "@/assets/pvpa-logo.png";
import RegistrationDialog from "@/components/RegistrationDialog";

const googleFormUrl =
  "https://docs.google.com/forms/d/e/1FAIpQLSc6Gu4MY0EaSJiVl_SXyvKDKCECjc7qvqrWY_l4eZpx2AlBrA/viewform?usp=sharing&ouid=100445045589207408557";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About PVPA", path: "/about" },
  { label: "Expo 2026", path: "/expo", highlight: true },
  { label: "Members", path: "/members" },
  { label: "News & Events", path: "/news" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const [regOpen, setRegOpen] = useState(false);
  const [regType, setRegType] = useState<"Student" | "Visitor" | "Exhibitor">("Visitor");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/98 backdrop-blur-lg shadow-md border-b border-border"
          : "bg-background/95 backdrop-blur-md border-b border-border"
      }`}
    >
      {/* Top bar */}
      <motion.div
        className="bg-primary text-primary-foreground overflow-hidden"
        animate={{ height: scrolled ? 0 : "auto", opacity: scrolled ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto flex items-center justify-between py-1.5 px-4 text-xs">
          <span>Pakistan Veterinary Pharmaceuticals Association</span>
          <span className="hidden sm:inline">
            📧 info@pvpa.com.pk &nbsp;|&nbsp; 📞 +92-42-38975094
          </span>
        </div>
      </motion.div>

      {/* Main nav */}
      <nav className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 group">
          <img src={pvpaLogo} alt="PVPA Logo" className="w-11 h-11 group-hover:scale-110 transition-transform duration-200" />
          <div className="leading-tight">
            <span className="font-display font-bold text-lg text-primary">PVPA</span>
            <span className="block text-[10px] text-muted-foreground tracking-wider uppercase">
              Pakistan Veterinary Pharmaceuticals Association
            </span>
          </div>
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link relative ${
                location.pathname === item.path ? "text-primary font-bold" : "text-foreground"
              } ${item.highlight ? "!text-secondary font-bold" : ""}`}
            >
              {item.label}
              {location.pathname === item.path && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-secondary rounded-full"
                />
              )}
            </Link>
          ))}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <a
              className="btn-secondary text-sm py-2 px-4 rounded-md shadow-md"
              href={googleFormUrl}
              target="_blank"
              rel="noreferrer"
            >
              Register Now
            </a>
          </motion.div>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden bg-background border-t border-border"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={`block py-2.5 px-3 text-sm font-medium rounded-lg transition-colors ${
                      location.pathname === item.path
                        ? "text-primary bg-accent"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.05 }}
                className="mt-2"
              >
                <a
                  href={googleFormUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="btn-secondary text-sm text-center py-2.5 rounded-lg w-full"
                >
                  Register Now
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <RegistrationDialog open={regOpen} onOpenChange={setRegOpen} defaultType={regType} />
    </header>
  );
};

export default Navbar;
