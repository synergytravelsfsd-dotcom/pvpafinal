import { motion } from "framer-motion";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Layout from "@/components/Layout";

const articles = [
  { title: "4TH Executive Committee of PVPA 2025 Concluded Successfully", date: "Feb 15, 2026", category: "Association", excerpt: "The Meeting was chaired by Dr Asim Mahmood Khan,Chairman PVPA and was graced by Dr Muhammad Amjad,Patron in Chief PVPA,who addressed the participants.The session was marked by a spirit of unity,professionalism and commitment toward strengthening Pakistan's Veterinary Pharma Industry.Executive Meeting brought together member companies to discuss industry challenges and prepartion of IVP-2026.", pdfUrl: "/pdfs/pvpa-agm-2025-summary.pdf" },
  { title: "New Veterinary Drug Regulations Announced by DRAP", date: "Jan 28, 2026", category: "Regulatory", excerpt: "The Drug Regulatory Authority of Pakistan has announced new guidelines for the registration and quality control of veterinary pharmaceutical products." },
  { title: "International Veterinary Expo-2026 Registrations Now Open", date: "Jan 10, 2026", category: "Expo", excerpt: "Early bird registrations are now open for Pakistan's premier veterinary pharmaceutical event. Over 200 exhibitors and 5,000 visitors are expected." },
  { title: "PVPA Signs MoU with The Organization of Islamic Cooperation (OIC)", date: "Feb 27, 2026", category: "International", excerpt: "A memorandum of understanding has been signed to promote bilateral trade and technology transfer in veterinary pharmaceuticals." },
  { title: "PVPA Signs MoU with The Rawalpindi Chamber of Commerce and Industries", date: "Feb 27, 2026", category: "National", excerpt: "A memorandum of understanding has been signed to promote bilateral cooperation and liaison in veterinary pharmaceuticals." },
  { title: "Workshop on GMP Compliance Successfully Held", date: "Nov 20, 2025", category: "Training", excerpt: "Over 150 professionals attended the two-day workshop on Good Manufacturing Practices for veterinary pharmaceutical products." },
  { title: "PVPA Submits Recommendations on Import Policy", date: "Oct 15, 2025", category: "Policy", excerpt: "PVPA has submitted its recommendations to the Ministry of Commerce regarding the import policy for veterinary pharmaceutical raw materials." },
];

const News = () => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  return (
  <Layout>
    <section className="relative py-20 md:py-28" style={{ background: "var(--hero-gradient)" }}>
      <div className="container mx-auto px-4 text-primary-foreground">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold font-display mb-4">
          News & Events
        </motion.h1>
        <p className="text-lg opacity-80 max-w-2xl">
          Stay updated with the latest from PVPA and the veterinary pharmaceutical industry.
        </p>
      </div>
    </section>

    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((a, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-card border border-border rounded-xl overflow-hidden card-hover"
            >
              <div className="h-2 bg-primary" />
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-secondary uppercase">{a.category}</span>
                  <span className="text-xs text-muted-foreground">{a.date}</span>
                </div>
                <h3 className="font-display font-bold text-lg mb-2">{a.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{a.excerpt}</p>
                {a.pdfUrl && a.category !== "Association" && (
                  <div className="flex items-center gap-3">
                    <button
                      className="btn-primary rounded-lg text-xs px-3 py-2"
                      onClick={() => setPdfUrl(a.pdfUrl!)}
                    >
                      View PDF
                    </button>
                    <a
                      href={a.pdfUrl}
                      target="_blank"
                      rel="noopener"
                      className="btn-outline rounded-lg text-xs px-3 py-2"
                    >
                      Download PDF
                    </a>
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
    <Dialog open={Boolean(pdfUrl)} onOpenChange={(o) => !o && setPdfUrl(null)}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Document</DialogTitle>
        </DialogHeader>
        {pdfUrl && (
          <object data={pdfUrl} type="application/pdf" width="100%" height="600">
            <a href={pdfUrl} target="_blank" rel="noopener">Open PDF</a>
          </object>
        )}
      </DialogContent>
    </Dialog>
  </Layout>
);};

export default News;
