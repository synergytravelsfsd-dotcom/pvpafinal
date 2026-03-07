import { motion } from "framer-motion";
import { Target, Eye, Shield, Handshake } from "lucide-react";
import Layout from "@/components/Layout";
import aboutImg from "@/assets/about-vet.jpg";

const values = [
  { icon: Target, title: "Mission", desc: "To promote and protect the interests of the veterinary pharmaceutical industry in Pakistan through advocacy, education, and collaboration." },
  { icon: Eye, title: "Vision", desc: "To be the premier association driving excellence, innovation, and ethical practices in veterinary pharmaceuticals across South Asia." },
  { icon: Shield, title: "Integrity", desc: "Upholding the highest standards of quality, safety, and regulatory compliance in all veterinary pharmaceutical products." },
  { icon: Handshake, title: "Collaboration", desc: "Fostering partnerships between industry, academia, government, and international organizations for the betterment of animal health." },
];

const About = () => (
  <Layout>
    <section className="relative py-20 md:py-28" style={{ background: "var(--hero-gradient)" }}>
      <div className="container mx-auto px-4 text-primary-foreground">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold font-display mb-4">
          About PVPA
        </motion.h1>
        <p className="text-lg opacity-80 max-w-2xl">
          Serving Pakistan's veterinary pharmaceutical industry with dedication, excellence, and a commitment to animal health.
        </p>
      </div>
    </section>

    <section className="py-16">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="section-heading">Who We Are</h2>
          <p className="text-muted-foreground mb-4">
            The Pakistan Veterinary Pharmaceuticals Association (PVPA) is the national trade body representing
            manufacturers, importers, and distributors of veterinary pharmaceutical products in Pakistan.
          </p>
          <p className="text-muted-foreground mb-4">
            Founded to address the growing need for a unified voice in the veterinary pharmaceutical sector,
            PVPA works closely with regulatory authorities including DRAP, the Ministry of National Food Security,
            and international organizations to ensure the industry meets global standards.
          </p>
          <p className="text-muted-foreground">
            Our members include over 500 companies ranging from multinational corporations to local manufacturers,
            collectively serving Pakistan's vast livestock sector — one of the largest in the world.
          </p>
        </div>
        <img src={aboutImg} alt="Veterinary laboratory" className="rounded-xl shadow-lg w-full object-cover aspect-[4/3]" />
      </div>
    </section>

    <section className="relative py-20 bg-gradient-to-b from-primary/5 via-background to-background">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-10 left-10 w-40 h-40 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 right-10 w-56 h-56 rounded-full bg-primary/10 blur-3xl" />
      </div>
      <div className="container mx-auto px-4 relative">
        <h2 className="text-center font-display font-extrabold text-3xl md:text-4xl mb-3">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Our Values
          </span>
        </h2>
        <p className="section-subheading text-center mx-auto mb-12 max-w-3xl">
          The principles that guide PVPA’s work for animal health and industry excellence.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className={`group bg-card/80 backdrop-blur rounded-2xl border border-border p-7 shadow-sm hover:shadow-xl transition-all ${i < 2 ? "md:col-span-2 lg:col-span-2" : ""}`}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <v.icon className="text-primary" size={22} />
                </div>
                <h3 className="font-display font-bold text-xl">{v.title}</h3>
              </div>
              <p className="text-sm md:text-[15px] text-muted-foreground leading-relaxed">
                {v.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="section-heading mb-4">Leadership</h2>
        <p className="section-subheading mx-auto mb-10">
          PVPA is governed by an elected Executive Committee comprising industry leaders.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { role: "Patron in Chief", name: "Dr Muhammad Amjad Chaudhary", imgUrl: "/Patron%20in%20Chief.jfif" },
            { role: "Chairman", name: "Dr Asim Mahmood Khan", imgUrl: "/Chairman.jfif" },
            { role: "Senior Vice Chairman", name: "Dr Masud Sadiq Chaudhary", imgUrl: "/Senior%20Vice%20Chairman.jfif" },
            { role: "Vice Chairman (North)", name: "Shoaib Amjad", imgUrl: "/Vice%20Chairman%20(North).jfif" },
            { role: "Vice Chairman (South)", name: "Dr Khalid Iqbal", imgUrl: "/Vice%20Chairman%20(South).jfif" },
            { role: "Secretary General", name: "Major(R) Syed Javaid Hussain Bukhari", imgUrl: "/Secretary%20General.jfif" },
          ].map((item) => (
            <div key={item.role} className="bg-muted rounded-xl p-6">
              {item.imgUrl ? (
                <div className="mx-auto mb-4 w-36 h-44 md:w-40 md:h-52 rounded-lg overflow-hidden bg-white border border-border">
                  <img
                    src={item.imgUrl}
                    alt={item.name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              ) : (
                <div className="w-36 h-44 md:w-40 md:h-52 rounded-lg bg-primary/20 mx-auto mb-4" />
              )}
              <h4 className="font-display font-bold">{item.role}</h4>
              <p className="text-sm text-muted-foreground mt-1">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default About;
