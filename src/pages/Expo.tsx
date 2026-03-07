import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Mic, Package, Clock, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Layout from "@/components/Layout";
import CountdownTimer from "@/components/CountdownTimer";
// import venueImg from "@/assets/venue-lahore.jpg";
import RegistrationDialog from "@/components/RegistrationDialog";

const schedule = [
  {
    day: "Day 1 — April 28",
    events: [
      { time: "09:00 AM", title: "Registration & Welcome Reception" },
      { time: "10:30 AM", title: "Inauguration Ceremony" },
      { time: "01:00 PM", title: "Keynote: Future of Veterinary Pharmaceuticals" },
      { time: "02:00 PM", title: "Panel: Regulatory Landscape in South Asia" },
      { time: "04:00 PM", title: "Networking & Exhibition Preview" },
    ],
  },
  {
    day: "Day 2 — April 29",
    events: [
      { time: "10:00 AM", title: "Technical Sessions — Track A & B" },
      { time: "11:00 AM", title: "Research Paper Presentations" },
      { time: "01:00 PM", title: "Exhibition Walkthrough" },
      { time: "02:30 PM", title: "Workshop: GMP Compliance" },
      { time: "06:00 PM", title: "B2B Matchmaking Sessions" },
      { time: "07:30 PM – 09:00 PM", title: "Dinner in Foyer Area (Expo Center)" },
    ],
  },
  {
    day: "Day 3 — April 30",
    events: [
      { time: "09:00 AM", title: "Exhibition & Product Launches" },
      { time: "11:00 AM", title: "Live Product Demonstrations" },
      { time: "01:00 PM", title: "Industry Awards Luncheon" },
      { time: "03:00 PM", title: "PVPA Excellence Awards Ceremony" },
      { time: "04:00 PM", title: "Closing Ceremony & Farewell" },
      { time: "06:00 PM", title: "Exhibition End" },
    ],
  },
];

const registrationTypes = [
  { type: "Visitor Pass", price: "Free", features: ["Exhibition access", "Networking events"] },
  { type: "Delegate Pass", price: "PKR 800", features: ["All sessions access", "Conference materials", "Certificate of attendance"] },
  { type: "Student Pass", price: "PKR 400", features: ["All sessions access", "Conference materials", "Certificate of attendance"] },
  { type: "Exhibitor Booth", price: "Contact Us", features: ["Standard booth (3×3m)", "Company listing in directory", "2 delegate passes", "Booth setup support"] },
];

const Expo = () => {
  const [regOpen, setRegOpen] = useState(false);
  const [regType, setRegType] = useState<"Student" | "Visitor" | "Exhibitor">("Visitor");

  return (
  <Layout>
    {/* Hero */}
    <section className="relative py-20 md:py-28 overflow-hidden" style={{ background: "var(--hero-gradient)" }}>
      <video
        src={"/Best%20Drone%20Video%20Expo%20Center%20Johar%20Town%20Lahore.mp4"}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0" style={{ background: "var(--hero-overlay)" }} />
      <div className="container mx-auto px-4 text-primary-foreground relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="inline-block bg-secondary text-secondary-foreground text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
            April 28–30, 2026
          </span>
          <h1 className="text-4xl md:text-6xl font-bold font-display mb-4">
            International Veterinary<br />Expo‑2026
          </h1>
          <div className="flex items-center gap-2 text-lg opacity-90 mb-6">
            <MapPin size={18} /> Expo Center, Johar Town, Lahore, Pakistan
          </div>
          <div className="mb-8">
            <CountdownTimer />
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              className="btn-secondary rounded-lg"
              onClick={() => {
                setRegType("Visitor");
                setRegOpen(true);
              }}
            >
              Register Now
            </button>
            <a href="#schedule" className="btn-outline-light rounded-lg">View Schedule</a>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Overview */}
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="section-heading text-center mb-4">Event Overview</h2>
        <p className="section-subheading text-center mx-auto mb-12">
          The International Veterinary Expo-2026 is Pakistan's largest and most comprehensive
          veterinary pharmaceutical trade show and conference.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Users, label: "5,000+", sub: "Expected Visitors" },
            { icon: Package, label: "200+", sub: "Exhibiting Companies" },
            { icon: Mic, label: "50+", sub: "Speakers & Panelists" },
            { icon: Calendar, label: "3", sub: "Action-Packed Days" },
          ].map((s, i) => (
            <motion.div
              key={s.sub}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-accent rounded-xl p-6 text-center"
            >
              <s.icon className="mx-auto mb-3 text-primary" size={28} />
              <div className="text-3xl font-bold font-display text-primary">{s.label}</div>
              <div className="text-sm text-muted-foreground mt-1">{s.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Schedule */}
    <section id="schedule" className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="section-heading text-center mb-12">Schedule & Agenda</h2>
        <div className="grid lg:grid-cols-3 gap-6">
          {schedule.map((day) => (
            <div key={day.day} className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="bg-primary text-primary-foreground px-6 py-4">
                <h3 className="font-display font-bold text-lg">{day.day}</h3>
              </div>
              <div className="p-6 space-y-4">
                {day.events.map((e) => (
                  <div key={e.time} className="flex gap-3">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground min-w-[80px]">
                      <Clock size={12} /> {e.time}
                    </div>
                    <span className="text-sm font-medium">{e.title}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Registration */}
    <section id="register" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="section-heading text-center mb-4">Registration</h2>
        <p className="section-subheading text-center mx-auto mb-12">
          Choose the pass that fits your needs and join us in Lahore.
        </p>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {registrationTypes.map((r, i) => (
            <motion.div
              key={r.type}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-xl border p-6 card-hover ${
                i === 1 ? "border-secondary bg-secondary/5 ring-2 ring-secondary" : "border-border bg-card"
              }`}
            >
              <h3 className="font-display font-bold text-xl mb-1">{r.type}</h3>
              <div className="text-2xl font-bold text-primary mb-4">{r.price}</div>
              <ul className="space-y-2 mb-6">
                {r.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle size={14} className="text-primary shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              {r.price === "Contact Us" ? (
                <Link
                  to="/contact"
                  className={`w-full py-2.5 rounded-lg font-semibold text-sm ${
                    i === 1 ? "btn-secondary" : "btn-primary"
                  }`}
                >
                  Contact Us
                </Link>
              ) : (
                <button
                  onClick={() => {
                    const mapType = r.type.includes("Student")
                      ? "Student"
                      : r.type.includes("Visitor")
                      ? "Visitor"
                      : r.type.includes("Exhibitor")
                      ? "Exhibitor"
                      : "Visitor";
                    setRegType(mapType as "Student" | "Visitor" | "Exhibitor");
                    setRegOpen(true);
                  }}
                  className={`w-full py-2.5 rounded-lg font-semibold text-sm ${
                    i === 1 ? "btn-secondary" : "btn-primary"
                  }`}
                >
                  Register
                </button>
              )}
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground mb-3">Prefer direct contact?</p>
          <div className="flex items-center justify-center gap-3">
            <a
              href="mailto:info@pvpa.com.pk?subject=Expo%202026%20Registration%20Inquiry"
              className="btn-secondary rounded-lg"
            >
              Email Us
            </a>
            <a
              href="https://wa.me/923004378496?text=I%20want%20to%20register%20for%20Expo%202026"
              target="_blank"
              rel="noreferrer"
              className="btn-primary rounded-lg"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>

    

    {/* Venue */}
    <section className="py-16 bg-accent">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="section-heading">Venue Information</h2>
          <p className="text-muted-foreground mb-4">
            The International Veterinary Expo-2026 will be held at the prestigious Expo Center
            in Johar Town, Lahore — one of Pakistan's premier exhibition venues.
          </p>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2"><MapPin size={16} className="text-primary" /> Expo Center, Johar Town, Lahore, Pakistan</li>
            <li className="flex items-center gap-2"><Calendar size={16} className="text-primary" /> April 28–30, 2026</li>
            <li className="flex items-center gap-2"><Users size={16} className="text-primary" /> 50,000+ sq. ft. exhibition space</li>
          </ul>
          <p className="text-muted-foreground mt-4 text-sm">
            The venue is easily accessible from Allama Iqbal International Airport (15 min drive)
            and major hotels in the Gulberg and DHA areas.
          </p>
        </div>
        <img src={"/EXPO%20CENTRE.jpg"} alt="Expo Centre, Johar Town, Lahore" className="rounded-xl shadow-lg w-full object-cover aspect-[4/3]" />
      </div>
    </section>
    <RegistrationDialog open={regOpen} onOpenChange={setRegOpen} defaultType={regType} />
  </Layout>
);};

export default Expo;
