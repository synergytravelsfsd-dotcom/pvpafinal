import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground relative overflow-hidden">
    {/* Decorative gradient */}
    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary via-secondary/50 to-secondary" />
    
    <div className="container mx-auto px-4 py-14">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
      >
        {/* Brand */}
        <div>
          <h3 className="text-2xl font-bold font-display mb-3">PVPA</h3>
          <p className="text-sm opacity-75 leading-relaxed">
            Pakistan Veterinary Pharmaceuticals Association — advancing veterinary
            pharmaceutical standards and promoting industry excellence since inception.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-4 text-secondary text-sm uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-2.5 text-sm">
            {[
              { to: "/about", label: "About Us" },
              { to: "/expo", label: "Expo 2026" },
              { to: "/members", label: "Membership" },
              { to: "/news", label: "News & Events" },
            ].map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="opacity-75 hover:opacity-100 transition-all duration-200 hover:translate-x-1 inline-flex items-center gap-1"
                >
                  {link.label} <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Expo 2026 */}
        <div>
          <h4 className="font-semibold mb-4 text-secondary text-sm uppercase tracking-wider">Expo 2026</h4>
          <ul className="space-y-2.5 text-sm opacity-75">
            <li>April 28–30, 2026</li>
            <li>Expo Center, Johar Town</li>
            <li>Lahore, Pakistan</li>
            <li>
              <Link to="/expo" className="text-secondary hover:brightness-110 transition font-semibold">
                Register Now →
              </Link>
            </li>
            <li className="flex items-center gap-2.5"><Mail size={14} className="text-secondary shrink-0" /> <a href="mailto:info@pvpa.com.pk" className="hover:underline">info@pvpa.com.pk</a></li>
            <li className="flex items-center gap-2.5"><Phone size={14} className="text-secondary shrink-0" /> <a href="https://wa.me/923004378496" target="_blank" rel="noreferrer" className="hover:underline">WhatsApp: 0300-4378496</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold mb-4 text-secondary text-sm uppercase tracking-wider">Contact Us</h4>
          <ul className="space-y-3 text-sm opacity-75">
            <li className="flex items-center gap-2.5">
              <Mail size={14} className="text-secondary shrink-0" />
              <span>
                <a href="mailto:secretary-general@pvpa.com.pk" className="hover:underline">secretary-general@pvpa.com.pk</a>,{" "}
                <a href="mailto:info@pvpa.com.pk" className="hover:underline">info@pvpa.com.pk</a>
              </span>
            </li>
            <li className="flex items-center gap-2.5"><Phone size={14} className="text-secondary shrink-0" /> +92-42-38975094</li>
            <li className="flex items-center gap-2.5"><Phone size={14} className="text-secondary shrink-0" /> <a href="https://wa.me/923004378496" target="_blank" rel="noreferrer" className="hover:underline">0300-4378496</a>, 0333-4204352</li>
            <li className="flex items-center gap-2.5"><MapPin size={14} className="text-secondary shrink-0" /> PVPA Secretariat, 674 P Block, Johar Town, Lahore, Pakistan</li>
          </ul>
        </div>
      </motion.div>

      <div className="border-t border-primary-foreground/15 mt-12 pt-6 text-center text-xs opacity-50">
        © {new Date().getFullYear()} Pakistan Veterinary Pharmaceuticals Association. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
