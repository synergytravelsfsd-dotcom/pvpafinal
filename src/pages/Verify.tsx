import Layout from "@/components/Layout";
import { useState } from "react";
import { motion } from "framer-motion";

const VERIFY_API_URL: string =
  // @ts-expect-error runtime global may exist
  (typeof window !== "undefined" && (window as any).__VERIFY_API_URL__) ||
  import.meta.env.VITE_VERIFY_API_URL ||
  "";

type VerifyResponse = {
  valid: boolean;
  ticketId?: string;
  name?: string;
  email?: string;
  ts?: string;
  row?: number;
  message?: string;
};

const Verify = () => {
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [result, setResult] = useState<VerifyResponse | null>(null);

  const parseTicket = () => {
    try {
      if (!input.trim()) return null;
      if (input.trim().startsWith("{")) {
        const json = JSON.parse(input.trim());
        return json.ticketId as string | undefined;
      }
      return input.trim();
    } catch {
      return null;
    }
  };

  const handleVerify = async () => {
    const ticketId = parseTicket();
    if (!ticketId) {
      setStatus("error");
      setResult({ valid: false, message: "Invalid input. Enter Ticket ID or JSON payload." });
      return;
    }
    if (!VERIFY_API_URL) {
      setStatus("done");
      setResult({ valid: true, ticketId, message: "Local check only. Set VERIFY_API_URL for live validation." });
      return;
    }
    setStatus("loading");
    try {
      const url = `${VERIFY_API_URL}?ticketId=${encodeURIComponent(ticketId)}`;
      const res = await fetch(url, { headers: { "Cache-Control": "no-cache" } });
      const data = (await res.json()) as VerifyResponse;
      setResult(data);
      setStatus("done");
    } catch {
      setStatus("error");
      setResult({ valid: false, message: "Verification service unavailable." });
    }
  };

  return (
    <Layout>
      <section className="relative py-20 md:py-28" style={{ background: "var(--hero-gradient)" }}>
        <div className="container mx-auto px-4 text-primary-foreground">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold font-display mb-4">
            Ticket Verification
          </motion.h1>
          <p className="text-lg opacity-80 max-w-2xl">
            Paste Ticket ID or the QR JSON payload to validate attendee entry.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-card border border-border rounded-2xl p-6">
            <label className="text-sm font-semibold mb-2 block">Ticket ID or QR JSON</label>
            <textarea
              rows={5}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full border border-input rounded-lg px-4 py-2.5 text-sm bg-background focus:ring-2 focus:ring-primary/30 outline-none"
              placeholder='e.g., IVP-2026-AB12CD34 or {"ticketId":"IVP-2026-AB12CD34","name":"Ali","email":"x@y.com","ts":"..."}'
            />
            <div className="flex items-center gap-3 mt-4">
              <button onClick={handleVerify} className="btn-primary rounded-lg px-4 py-2">
                {status === "loading" ? "Verifying..." : "Verify"}
              </button>
              {!VERIFY_API_URL && (
                <span className="text-xs text-muted-foreground">
                  Set VERIFY_API_URL for live sheet validation.
                </span>
              )}
            </div>
            {status !== "idle" && (
              <div className="mt-6">
                {status === "error" && (
                  <p className="text-destructive text-sm">{result?.message || "Error"}</p>
                )}
                {status !== "error" && result && (
                  <div className={`rounded-lg p-4 text-sm ${result.valid ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                    <div className="font-semibold mb-1">{result.valid ? "Valid Ticket" : "Invalid Ticket"}</div>
                    {result.ticketId && <div>Ticket ID: {result.ticketId}</div>}
                    {result.name && <div>Name: {result.name}</div>}
                    {result.email && <div>Email: {result.email}</div>}
                    {result.ts && <div>Submitted: {result.ts}</div>}
                    {result.message && <div>Note: {result.message}</div>}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Verify;
