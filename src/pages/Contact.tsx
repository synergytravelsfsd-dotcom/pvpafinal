import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Globe } from "lucide-react";
import Layout from "@/components/Layout";

const Contact = () => (
  <Layout>
    <section className="relative py-20 md:py-28" style={{ background: "var(--hero-gradient)" }}>
      <div className="container mx-auto px-4 text-primary-foreground">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold font-display mb-4">
          Contact Us
        </motion.h1>
        <p className="text-lg opacity-80 max-w-2xl">
          Get in touch with PVPA. We'd love to hear from you.
        </p>
      </div>
    </section>

    <section className="py-16">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div>
          <h2 className="section-heading">Get In Touch</h2>
          <div className="space-y-6 mb-8">
            {[
              {
                icon: MapPin,
                label: "Address",
                value: (
                  <span>
                    PVPA Secretariat, 674 P Block, Johar Town, Lahore, Pakistan{" "}
                    <a
                      href="https://www.google.com/maps/dir/?api=1&destination=PVPA%20Secretariat%2C%20674%20P%20Block%2C%20Johar%20Town%2C%20Lahore%2C%20Pakistan"
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary hover:underline"
                    >
                      Get directions
                    </a>
                  </span>
                ),
              },
              { icon: Phone, label: "Phone", value: "+92-42-38975094" },
              { icon: Phone, label: "Cell", value: "0300-4378496, 0333-4204352" },
              { icon: Phone, label: "WhatsApp", value: (<a href="https://wa.me/923004378496" target="_blank" rel="noreferrer" className="hover:underline">0300-4378496</a>) },
              { icon: Mail, label: "Email", value: (
                <span>
                  <a href="mailto:secretary-general@pvpa.com.pk" className="hover:underline">secretary-general@pvpa.com.pk</a>,{" "}
                  <a href="mailto:info@pvpa.com.pk" className="hover:underline">info@pvpa.com.pk</a>
                </span>
              ) },
              { icon: Globe, label: "Web", value: (
                <a href="https://www.pvpa.com.pk" target="_blank" rel="noreferrer" className="hover:underline">
                  www.pvpa.com.pk
                </a>
              ) },
              { icon: Clock, label: "Office Hours", value: "Mon–Fri: 9:00 AM – 5:00 PM (PKT); Sat: 9:00 AM – 2:00 PM" },
            ].map((c) => (
              <div key={c.label} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shrink-0">
                  <c.icon size={18} className="text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-sm">{c.label}</div>
                  <div className="text-muted-foreground text-sm">{c.value}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-xl overflow-hidden border border-border">
            <iframe
              title="PVPA Secretariat Location"
              src="https://www.google.com/maps?q=PVPA%20Secretariat%2C%20674%20P%20Block%2C%20Johar%20Town%2C%20Lahore%2C%20Pakistan&output=embed"
              width="100%"
              height="300"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Form */}
        <div>
          <h2 className="section-heading">Send a Message</h2>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget as HTMLFormElement);
              const name = String(fd.get("name") || "");
              const email = String(fd.get("email") || "");
              const subject = String(fd.get("subject") || "");
              const message = String(fd.get("message") || "");
              const text = `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`;
              const url = `https://wa.me/923004378496?text=${encodeURIComponent(text)}`;
              window.open(url, "_blank");
            }}
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <input name="name" type="text" placeholder="Your Name" className="w-full border border-input rounded-lg px-4 py-2.5 text-sm bg-background focus:ring-2 focus:ring-primary/30 outline-none" />
              <input name="email" type="email" placeholder="Email Address" className="w-full border border-input rounded-lg px-4 py-2.5 text-sm bg-background focus:ring-2 focus:ring-primary/30 outline-none" />
            </div>
            <input name="subject" type="text" placeholder="Subject" className="w-full border border-input rounded-lg px-4 py-2.5 text-sm bg-background focus:ring-2 focus:ring-primary/30 outline-none" />
            <textarea name="message" placeholder="Your Message" rows={5} className="w-full border border-input rounded-lg px-4 py-2.5 text-sm bg-background focus:ring-2 focus:ring-primary/30 outline-none resize-none" />
            <button type="submit" className="btn-primary rounded-lg">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  </Layout>
);

export default Contact;
