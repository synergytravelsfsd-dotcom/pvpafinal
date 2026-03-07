import { motion } from "framer-motion";
import { useState } from "react";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import MembershipDialog from "@/components/MembershipDialog";

const benefits = [
  "Representation in regulatory affairs and policy-making forums",
  "Access to industry research reports and market data",
  "Discounted participation in PVPA events and expos",
  "Networking opportunities with national and international peers",
  "Listing in the PVPA Member Directory",
  "Advocacy and support for trade disputes",
  "Access to training programs and workshops",
  "Voting rights in PVPA elections",
];

const categories = [
  {
    title: "Corporate Class",
    fee: "New: PKR 50,000/year",
    desc:
      "Companies involved in manufacturing, importing and distributing veterinary pharmaceutical, nutritional, feed additives, biologicals and disinfecting products in Pakistan with annual turnover PKR 50 Million or more.",
    details: ["Renewal: PKR 25,000/year", "Magazine (optional): PKR 5,000/year"],
  },
  {
    title: "Associate Class",
    fee: "New: PKR 25,000/year",
    desc:
      "Companies involved in manufacturing, importing or distributing veterinary pharmaceuticals and allied products with annual turnover less than PKR 50 Million.",
    details: ["Renewal: PKR 12,500/year", "Magazine (optional): PKR 5,000/year"],
  },
  {
    title: "Allied Member",
    fee: "PKR 10,000/year",
    desc: "Suppliers of raw materials, packaging, equipment, and related services.",
  },
  {
    title: "International Member",
    fee: "USD 500/year",
    desc: "Foreign companies and organizations seeking engagement with Pakistan's vet pharma market.",
  },
];

const Members = () => {
  const [open, setOpen] = useState(false);
  return (
  <Layout>
    <section className="relative py-20 md:py-28" style={{ background: "var(--hero-gradient)" }}>
      <div className="container mx-auto px-4 text-primary-foreground">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold font-display mb-4">
          Membership
        </motion.h1>
        <p className="text-lg opacity-80 max-w-2xl">
          Join Pakistan's most influential veterinary pharmaceutical trade association.
        </p>
      </div>
    </section>

    {/* Benefits */}
    <section className="py-16">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="section-heading">Member Benefits</h2>
          <ul className="space-y-3">
            {benefits.map((b) => (
              <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                <CheckCircle size={16} className="text-primary mt-0.5 shrink-0" /> {b}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="section-heading">Membership Categories</h2>
          <div className="space-y-4">
            {categories.map((c) => (
              <div key={c.title} className="bg-card border border-border rounded-xl p-5 card-hover">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-display font-bold text-lg">{c.title}</h3>
                  <span className="text-sm font-semibold text-primary">{c.fee}</span>
                </div>
                <p className="text-sm text-muted-foreground">{c.desc}</p>
                {"details" in c && Array.isArray((c as any).details) && (
                  <ul className="mt-2 space-y-1">
                    {(c as any).details.map((d: string) => (
                      <li key={d} className="text-xs text-muted-foreground">• {d}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-16 bg-accent">
      <div className="container mx-auto px-4 text-center">
        <h2 className="section-heading">Ready to Join?</h2>
        <p className="section-subheading mx-auto mb-8">
          Contact our membership team to begin your application process.
        </p>
        <div className="flex items-center justify-center gap-3">
          <a
            href="https://wa.me/923004378496?text=I%20want%20to%20apply%20for%20PVPA%20membership"
            target="_blank"
            rel="noreferrer"
            className="btn-secondary inline-flex items-center gap-2 rounded-lg"
          >
            Apply via WhatsApp
          </a>
          <button
            className="btn-primary inline-flex items-center gap-2 rounded-lg"
            onClick={() => setOpen(true)}
          >
            Apply for Membership <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
    <MembershipDialog open={open} onOpenChange={setOpen} />
  </Layout>
);}

export default Members;
