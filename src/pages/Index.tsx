import { Link } from "react-router-dom";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Award, BookOpen, Globe, ArrowRight, Sparkles, TrendingUp, Shield, Plane, Hotel, Ticket, PhoneCall, Mic } from "lucide-react";
import Layout from "@/components/Layout";
import CountdownTimer from "@/components/CountdownTimer";
import FloatingParticles from "@/components/FloatingParticles";
import heroImg from "@/assets/hero-expo.jpg";
import aboutImg from "@/assets/about-vet.jpg";

const stats = [
  { icon: Users, value: "500+", label: "Member Companies" },
  { icon: Award, value: "30+", label: "Years of Service" },
  { icon: Globe, value: "15+", label: "Countries Represented" },
  { icon: BookOpen, value: "100+", label: "Publications" },
];

const news = [
  {
    title: "4TH Executive Committee of PVPA 2025 Concluded Successfully",
    date: "Feb 13, 2026",
    category: "Association",
    excerpt:
      "The Meeting was chaired by Dr Asim Mahmood Khan, Chairman PVPA and was graced by Dr Muhammad Amjad, Patron in Chief PVPA, who addressed the participants. The session was marked by a spirit of unity, professionalism and commitment toward strengthening Pakistan's Veterinary Pharma Industry. Executive Meeting brought together member companies to discuss industry challenges and preparation of IVP-2026.",
  },
  {
    title: "Expo 2026 Updates",
    date: "Jan 10, 2026",
    category: "Expo",
    excerpt: "Stay tuned for registration timelines, schedule details, and exhibitor information.",
    attachments: [
      { label: "Floor Plan", url: "/Floor%20plan.pdf" },
      { label: "List Of Vacant Stalls IVP-2026 (04-03-26)", url: "/List%20Of%20Vacant%20Stalls%20IVP-2026%20(04-03-26).pdf" },
    ],
  },
  {
    title: "Expo 2027 Updates",
    date: "Jan 10, 2026",
    category: "Expo",
    excerpt: "Stay tuned for registration timelines, schedule details, and exhibitor information.",
    attachments: [
      { label: "Floor Plan 2027", url: "/Floor%20plan%202027.pdf" },
    ],
  },
];

const features = [
  { icon: Sparkles, title: "Innovation Hub", desc: "Showcasing cutting-edge veterinary pharmaceutical technologies and breakthrough research." },
  { icon: TrendingUp, title: "Industry Growth", desc: "Driving the growth of Pakistan's veterinary pharmaceutical sector through collaboration." },
  { icon: Shield, title: "Quality Standards", desc: "Upholding the highest standards of safety and efficacy in veterinary medicines." },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const Index = () => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  
  return (
  <Layout>
    {/* Hero */}
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <video
        src={"/Best%20Drone%20Video%20Expo%20Center%20Johar%20Town%20Lahore.mp4"}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0" style={{ background: "var(--hero-overlay)" }} />
      <FloatingParticles />
      <div className="container mx-auto px-4 relative z-10 text-primary-foreground py-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="inline-block bg-secondary text-secondary-foreground text-xs font-bold px-4 py-1.5 rounded-full mb-5 uppercase tracking-wider shadow-lg"
          >
            ✦ Flagship Event 2026
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4"
          >
            International{" "}
            <span className="text-secondary">Veterinary</span>{" "}
            Expo‑2026
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <p className="text-lg md:text-xl opacity-90 mb-2 flex items-center gap-2 flex-wrap">
              <Calendar size={18} className="text-secondary" /> April 28–30, 2026
              <span className="mx-1 opacity-50">•</span>
              <MapPin size={18} className="text-secondary" /> Expo Center, Lahore
            </p>
            <p className="opacity-75 mb-8 max-w-xl text-base">
              Pakistan's premier gathering of veterinary pharmaceutical professionals,
              researchers, and industry leaders from around the globe.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mb-8"
          >
            <CountdownTimer />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.5 }}
            className="flex flex-wrap gap-3"
          >
            <Link to="/expo" className="btn-secondary rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              Register Now
            </Link>
            <Link to="/expo" className="btn-outline-light rounded-lg">
              Exhibitor Info
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/40 flex justify-center pt-2">
          <div className="w-1.5 h-1.5 rounded-full bg-primary-foreground/60" />
        </div>
      </motion.div>
    </section>

    {/* Stats Bar */}
    <section className="bg-primary text-primary-foreground -mt-1 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary to-primary opacity-90" />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="container mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10"
      >
        {stats.map((s) => (
          <motion.div key={s.label} variants={itemVariants} className="text-center group">
            <div className="w-14 h-14 rounded-full bg-primary-foreground/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-secondary/20 transition-colors duration-300">
              <s.icon className="text-secondary" size={24} />
            </div>
            <div className="text-3xl md:text-4xl font-bold font-display">{s.value}</div>
            <div className="text-sm opacity-70 mt-1">{s.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>

    {/* Features Strip */}
    <section className="py-16 bg-background">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="container mx-auto px-4 grid md:grid-cols-3 gap-8"
      >
        {features.map((f) => (
          <motion.div
            key={f.title}
            variants={itemVariants}
            className="flex items-start gap-4 group"
          >
            <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center shrink-0 group-hover:bg-secondary/20 transition-colors duration-300">
              <f.icon className="text-primary" size={22} />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-foreground mb-1">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>

    {/* About Snippet */}
    <section className="py-14 md:py-20" style={{ background: "hsl(var(--surface-warm))" }}>
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-secondary font-semibold text-sm uppercase tracking-wider mb-2 block">Who We Are</span>
          <h2 className="section-heading">About PVPA</h2>
          <p className="section-subheading mb-6">
            The Pakistan Veterinary Pharmaceuticals Association is the leading body
            representing veterinary pharmaceutical manufacturers, importers, and
            distributors across Pakistan.
          </p>
          <p className="text-muted-foreground mb-8">
            We are dedicated to promoting high standards in veterinary medicine,
            supporting regulatory compliance, fostering innovation, and
            strengthening the veterinary pharmaceutical industry nationwide.
          </p>
          <Link to="/about" className="btn-primary inline-flex items-center gap-2 rounded-lg group">
            Learn More <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 40, rotate: 2 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="absolute -inset-4 bg-secondary/20 rounded-2xl -rotate-3" />
          <img src={"/ed3776e9-ab0a-4974-8703-e2c026e6961e.jpg"} alt="Veterinary care" className="relative rounded-xl shadow-2xl w-full object-cover aspect-[4/3] sm:aspect-square" />
        </motion.div>
      </div>
    </section>

    {/* Expo Highlights */}
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 text-center mb-14">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="text-secondary font-semibold text-sm uppercase tracking-wider mb-2 block">What To Expect</span>
          <h2 className="section-heading">Expo 2026 Highlights</h2>
          <p className="section-subheading mx-auto">Three days of knowledge, innovation, and networking</p>
        </motion.div>
      </div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="container mx-auto px-4 grid md:grid-cols-3 gap-8"
      >
        {[
          { icon: Calendar, title: "Day 1 – Inauguration", desc: "Opening ceremony, keynote addresses from global veterinary leaders, and industry overview sessions." },
          { icon: Users, title: "Day 2 – Conference", desc: "Technical sessions, research presentations, panel discussions on regulatory affairs and drug development." },
          { icon: Award, title: "Day 3 – Exhibition", desc: "Product showcases, B2B meetings, live demonstrations, and the PVPA Excellence Awards ceremony." },
        ].map((item) => (
          <motion.div
            key={item.title}
            variants={itemVariants}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className="bg-card border border-border rounded-2xl p-8 text-center group cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-300"
          >
            <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-5 group-hover:bg-secondary/20 transition-colors duration-300">
              <item.icon className="text-primary group-hover:text-secondary transition-colors duration-300" size={28} />
            </div>
            <h3 className="font-display text-xl font-bold mb-3 text-foreground">{item.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>

    <section className="py-14 md:py-20">
      <div className="container mx-auto px-4 text-center mb-14">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="text-secondary font-semibold text-sm uppercase tracking-wider mb-2 block">Event Details</span>
          <h2 className="section-heading">Plan Your Expo Experience</h2>
          <p className="section-subheading mx-auto">Key information for visitors and exhibitors</p>
        </motion.div>
      </div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="container mx-auto px-4 grid gap-6 sm:gap-8 md:grid-cols-3"
      >
        {[
          { icon: Calendar, title: "Registration Timeline", desc: "Important dates for sign-ups and pass issuance." },
          { icon: Plane, title: "Travel & Venue", desc: "Location details and travel guidance for Lahore." },
          { icon: Ticket, title: "Exhibitor Packages", desc: "Booth options, inclusions, and pricing overview." },
          { icon: Mic, title: "Conference Tracks", desc: "Technical sessions, workshops, and speaker lineup." },
          { icon: Hotel, title: "Accommodation", desc: "Nearby hotels and logistics for attendees." },
          { icon: PhoneCall, title: "Contact & Support", desc: "Reach out for assistance or special requirements." },
        ].map((item) => (
          <motion.div
            key={item.title}
            variants={itemVariants}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className="bg-card border border-border rounded-2xl p-8 text-left group shadow-sm hover:shadow-xl transition-shadow duration-300"
          >
            <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center mb-5 group-hover:bg-secondary/20 transition-colors duration-300">
              <item.icon className="text-primary group-hover:text-secondary transition-colors duration-300" size={28} />
            </div>
            <h3 className="font-display text-xl font-bold mb-3 text-foreground">{item.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
            <div className="mt-4">
              <a
                href={`https://wa.me/923004378496?text=${encodeURIComponent(`Hello PVPA, I need info about "${item.title}" for Expo 2026.`)}`}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary rounded-lg text-xs px-3 py-2"
              >
                WhatsApp
              </a>
            </div>
            
          </motion.div>
        ))}
      </motion.div>
    </section>

    {/* Latest News */}
    <section className="py-20 bg-accent">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="text-secondary font-semibold text-sm uppercase tracking-wider mb-2 block">Stay Updated</span>
            <h2 className="section-heading !mb-0">Latest News</h2>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <Link to="/news" className="text-primary font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all duration-200">
              View All <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6"
        >
          {news.map((n, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="bg-card border border-border rounded-2xl p-6 md:p-7 cursor-pointer shadow-sm hover:shadow-lg transition-shadow duration-300 group"
            >
              <span className="inline-block text-xs font-bold text-secondary uppercase bg-secondary/10 px-3 py-1 rounded-full">{n.category}</span>
              <h3 className="font-display text-lg font-bold mt-4 mb-3 text-foreground group-hover:text-primary transition-colors duration-200">{n.title}</h3>
              <p className="text-xs text-muted-foreground">{n.date}</p>
              {"excerpt" in n && n.excerpt && (
                <p className="text-sm text-muted-foreground mt-3">
                  {n.excerpt}
                </p>
              )}
              {"attachments" in n && Array.isArray((n as any).attachments) && (
                <div className="flex flex-wrap items-center gap-3 mt-4">
                  {(n as any).attachments.map((a: { label: string; url: string }) => (
                    <div key={a.url} className="flex items-center gap-2">
                      <button
                        className="btn-primary rounded-lg text-xs px-3 py-2"
                        onClick={() => setPdfUrl(a.url)}
                      >
                        View {a.label}
                      </button>
                      <a
                        href={a.url}
                        target="_blank"
                        rel="noopener"
                        className="btn-outline rounded-lg text-xs px-3 py-2"
                      >
                        Download
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
    

    {/* CTA Banner */}
    <section className="py-20 relative overflow-hidden" style={{ background: "var(--hero-gradient)" }}>
      <FloatingParticles />
      <div className="container mx-auto px-4 text-center text-primary-foreground relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-5">
            Join Us at the International{" "}
            <span className="text-secondary">Veterinary Expo‑2026</span>
          </h2>
          <p className="opacity-80 mb-10 max-w-xl mx-auto text-lg">
            Be part of Pakistan's largest veterinary pharmaceutical event.
            Connect with 500+ companies and 5,000+ professionals.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link to="/expo" className="btn-secondary rounded-lg shadow-lg text-lg px-8 py-3.5">
                Register as Visitor
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link to="/expo" className="btn-outline-light rounded-lg text-lg px-8 py-3.5">
                Become an Exhibitor
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
    <Dialog open={Boolean(pdfUrl)} onOpenChange={(o) => !o && setPdfUrl(null)}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Floor Plan</DialogTitle>
        </DialogHeader>
        {pdfUrl && (
          <object data={pdfUrl} type="application/pdf" width="100%" height="600">
            <a href={pdfUrl} target="_blank" rel="noopener">Open PDF</a>
          </object>
        )}
      </DialogContent>
    </Dialog>
  </Layout>
);}

export default Index;
