"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, Variants } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Database,
  FileText,
  Lock,
  Radar,
  Server,
  Shield,
  ShieldCheck,
  Zap
} from "lucide-react";

const VISIBLE_STREAM_ROWS = 6;
const SAVINGS_PER_LOAD = 72;
const ROI_MULTIPLIER = 1.25;
const HOURS_SAVED_PER_LOAD = 0.4;

const streamEvents = [
  "Parsing PDF: BOL_4821.pdf [0.9s]",
  "Extracted 42 fields | confidence 99.7%",
  "FMCSA lookup | Carrier 938120 → ACTIVE",
  "Fraud signals: clean | watchlist: none",
  "Normalizing → PowerBroker EDI 214",
  "Checksum signed | audit trail sealed",
  "Pushing to AS/400 queue → ACK",
  "Reconciling freight class + NMFC"
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } }
};

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

export default function Home() {
  const [loads, setLoads] = useState(240);
  const [streamIndex, setStreamIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStreamIndex((prev) => (prev + 1) % streamEvents.length);
    }, 1400);

    return () => clearInterval(timer);
  }, []);

  const visibleEvents = useMemo(
    () => Array.from({ length: VISIBLE_STREAM_ROWS }, (_, i) => streamEvents[(streamIndex + i) % streamEvents.length]),
    [streamIndex]
  );
  const monthlySavings = Math.round(loads * SAVINGS_PER_LOAD * ROI_MULTIPLIER);
  const hoursSaved = Math.round(loads * HOURS_SAVED_PER_LOAD);

  return (
    <div className="min-h-screen bg-[#01040b] text-slate-100">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-cyan-900/40 bg-[#050915]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500/30 to-blue-500/30 border border-cyan-500/30 shadow-[0_0_25px_rgba(34,211,238,0.35)] flex items-center justify-center">
                <Zap className="w-5 h-5 text-cyan-300" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">Diviora Systems</span>
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium">
              <a href="#solutions" className="text-slate-300 hover:text-cyan-200 transition-colors">Platform</a>
              <a href="#roi" className="text-slate-300 hover:text-cyan-200 transition-colors">ROI</a>
              <a href="#security" className="text-slate-300 hover:text-cyan-200 transition-colors">Security</a>
              <a href="#contact" className="text-slate-300 hover:text-cyan-200 transition-colors">Contact</a>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-emerald-300 uppercase tracking-[0.18em]">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.65)]"></span>
                </span>
                System Status: Secure
              </div>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-md bg-cyan-500 text-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.45)] hover:shadow-[0_0_30px_rgba(56,189,248,0.7)] transition-all"
              >
                Book 24h Upgrade
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#030712] via-[#030915] to-[#050b18] py-16 sm:py-24 lg:py-28">
        <div className="absolute inset-0 opacity-30 bg-[linear-gradient(90deg,rgba(34,211,238,0.14)_1px,transparent_1px),linear-gradient(0deg,rgba(59,130,246,0.12)_1px,transparent_1px)] bg-[size:44px_44px]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.15),transparent_40%),radial-gradient(circle_at_80%_10%,rgba(59,130,246,0.22),transparent_40%)]"></div>
        <div className="max-w-7xl relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 rounded-full border border-cyan-500/30 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100 shadow-[0_0_18px_rgba(34,211,238,0.35)]">
                Freight Infrastructure · PowerBroker / McLeod
              </div>
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight text-white drop-shadow-[0_6px_40px_rgba(34,211,238,0.25)]">
                  Stop Paying the McLeod &ldquo;Upgrade Tax&rdquo;.
                </h1>
                <p className="text-lg sm:text-xl text-slate-300 max-w-2xl leading-relaxed">
                  Add Enterprise AI to your legacy PowerBroker server in 24 hours. No downtime. No migration. 7.5x ROI guaranteed.
                  Designed for freight brokers that need industrial reliability—not slideware.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-lg bg-cyan-500 text-slate-950 text-lg font-semibold shadow-[0_0_30px_rgba(34,211,238,0.6)] hover:shadow-[0_0_42px_rgba(56,189,248,0.8)] transition-all"
                >
                  Schedule the Cutover
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a
                  href="#solutions"
                  className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-lg border border-cyan-500/40 text-cyan-100 text-lg font-semibold bg-white/5 hover:bg-white/10 transition-all shadow-[0_0_20px_rgba(59,130,246,0.35)]"
                >
                  See the Data Airlock
                </a>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 text-sm">
                {[{
                  label: "Go-Live",
                  value: "<24h"
                }, {
                  label: "Extraction Accuracy",
                  value: "99.7%"
                }, {
                  label: "ROI Guarantee",
                  value: "7.5x"
                }, {
                  label: "FMCSA Fraud Guard",
                  value: "Always-On"
                }].map((item) => (
                  <div key={item.label} className="rounded-lg border border-cyan-500/20 bg-white/5 px-4 py-3 shadow-[0_0_14px_rgba(34,211,238,0.2)]">
                    <div className="text-xs uppercase tracking-[0.15em] text-slate-400">{item.label}</div>
                    <div className="text-xl font-bold text-cyan-100">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-to-br from-cyan-500/20 via-transparent to-blue-500/20 blur-3xl" aria-hidden />
              <div className="relative rounded-2xl border border-cyan-500/30 bg-[#071020]/80 shadow-[0_40px_120px_rgba(8,47,73,0.45)] backdrop-blur-xl overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-cyan-500/20">
                  <div className="text-sm font-semibold text-cyan-100">AI Intake Terminal</div>
                  <div className="flex items-center gap-2 text-emerald-300 text-xs font-semibold uppercase tracking-[0.18em]">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.8)] animate-pulse" />
                    Live</div>
                </div>
                <div className="px-6 py-6 space-y-4">
                  <div className="rounded-lg border border-cyan-500/20 bg-[#0b172a]/70 p-4">
                    <div className="flex items-center gap-3 mb-3 text-sm text-slate-200">
                      <ShieldCheck className="w-4 h-4 text-emerald-300" />
                      <span>Validation Gate · Hash-signed · Zero inbound ports</span>
                    </div>
                    <div className="space-y-2 font-mono text-sm text-cyan-100">
                      {visibleEvents.map((line, idx) => (
                        <div
                          key={`${line}-${idx}`}
                          className="flex items-center gap-3 rounded-md bg-white/5 px-3 py-2 border border-cyan-500/10"
                        >
                          <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"></span>
                          <span className="text-cyan-100/90">{line}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-xs uppercase tracking-[0.14em]">
                    <div className="rounded-md border border-cyan-500/20 bg-white/5 px-3 py-2 text-cyan-100 flex items-center gap-2">
                      <FileText className="w-4 h-4" /> PDF Intake
                    </div>
                    <div className="rounded-md border border-cyan-500/20 bg-white/5 px-3 py-2 text-cyan-100 flex items-center gap-2">
                      <Database className="w-4 h-4" /> PowerBroker
                    </div>
                    <div className="rounded-md border border-cyan-500/20 bg-white/5 px-3 py-2 text-cyan-100 flex items-center gap-2">
                      <Shield className="w-4 h-4" /> FMCSA Check
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Feature Grid */}
      <section id="solutions" className="relative py-16 sm:py-20 bg-[#050915] border-t border-cyan-900/40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,211,238,0.08),transparent_35%),radial-gradient(circle_at_70%_70%,rgba(59,130,246,0.1),transparent_35%)]" />
        <div className="max-w-7xl relative mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">Diviora Platform</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">Bento-engineered for Industrial Freight Ops</h2>
              <p className="text-lg text-slate-300 max-w-3xl">
                Precision-built cards that snap together into your legacy stack. Each block ships with reveal-on-scroll motion,
                cyber glows, and on-premise controls your IT team can bless.
              </p>
            </div>
            <div className="flex items-center gap-3 text-sm text-cyan-100">
              <ShieldCheck className="w-5 h-5 text-emerald-300" /> SOC 2 controls · Audit-ready artifacts
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[1fr] gap-6">
            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              className="lg:col-span-2 rounded-2xl border border-cyan-500/30 bg-[#0a1323]/80 p-6 shadow-[0_0_35px_rgba(34,211,238,0.28)]"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">The Data Airlock</p>
                  <h3 className="text-2xl font-bold text-white mt-1">From messy PDFs to pristine McLeod EDI</h3>
                </div>
                <div className="flex items-center gap-2 text-sm text-cyan-100">
                  <Shield className="w-4 h-4" /> Sealed perimeter
                </div>
              </div>
              <div className="grid md:grid-cols-[1.1fr_0.1fr_1fr_0.1fr_1.1fr] items-center gap-3">
                <div className="rounded-xl border border-cyan-500/30 bg-white/5 p-4 space-y-3">
                  <div className="flex items-center gap-3 text-cyan-100">
                    <FileText className="w-5 h-5" />
                    <span className="font-semibold">Unstructured PDFs</span>
                  </div>
                  <p className="text-sm text-slate-300">Bills of lading, rate cons, PODs, lumper receipts, even cell phone photos.</p>
                </div>
                <ArrowRight className="w-8 h-8 text-cyan-300 hidden md:block" />
                <div className="rounded-xl border border-cyan-400/50 bg-gradient-to-br from-cyan-500/15 via-blue-500/10 to-transparent p-4 shadow-[0_0_24px_rgba(34,211,238,0.35)]">
                  <div className="flex items-center gap-3 text-cyan-100">
                    <ShieldCheck className="w-5 h-5 text-emerald-300" />
                    <span className="font-semibold">Validation Gate</span>
                  </div>
                  <ul className="mt-3 space-y-2 text-sm text-slate-200">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-300" /> Hash + checksum signing</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-300" /> FMCSA fraud & carrier status check</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-300" /> Rules engine for NMFC, freight class</li>
                  </ul>
                </div>
                <ArrowRight className="w-8 h-8 text-cyan-300 hidden md:block" />
                <div className="rounded-xl border border-cyan-500/30 bg-white/5 p-4 space-y-3">
                  <div className="flex items-center gap-3 text-cyan-100">
                    <Database className="w-5 h-5" />
                    <span className="font-semibold">Clean McLeod EDI</span>
                  </div>
                  <p className="text-sm text-slate-300">Structured 204/214/990/210 files ready for PowerBroker with audit trail preserved.</p>
                </div>
              </div>
              <div className="mt-4 grid sm:grid-cols-3 gap-3 text-xs uppercase tracking-[0.16em] text-cyan-100">
                <div className="rounded-lg border border-cyan-500/20 bg-white/5 px-3 py-2">No downtime</div>
                <div className="rounded-lg border border-cyan-500/20 bg-white/5 px-3 py-2">On-premise execution</div>
                <div className="rounded-lg border border-cyan-500/20 bg-white/5 px-3 py-2">Audit-ready logs</div>
              </div>
            </motion.div>

            <motion.div
              id="roi"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              className="rounded-2xl border border-blue-500/30 bg-[#0c1426]/80 p-6 shadow-[0_0_30px_rgba(59,130,246,0.28)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-200">The Savings Engine</p>
              <h3 className="text-2xl font-bold text-white mt-1">If you process {loads} loads, Diviora saves you {currency.format(monthlySavings)} / month.</h3>
              <p className="text-sm text-slate-300 mt-2">Slider assumes 7.5x ROI guarantee and legacy rekey cost benchmarks for freight brokers.</p>
              <div className="mt-6 space-y-4">
                <input
                  type="range"
                  min={50}
                  max={600}
                  value={loads}
                  onChange={(event) => setLoads(Number(event.target.value))}
                  aria-label="Estimated monthly load volume"
                  aria-valuemin={50}
                  aria-valuemax={600}
                  aria-valuenow={loads}
                  className="w-full accent-cyan-400 [--track-color:#0b172a] [--thumb-size:18px]"
                />
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg border border-blue-500/20 bg-white/5 px-4 py-3">
                    <div className="text-xs uppercase tracking-[0.14em] text-slate-400">Hours Back</div>
                    <div className="text-xl font-semibold text-blue-100">{hoursSaved} hrs</div>
                  </div>
                  <div className="rounded-lg border border-blue-500/20 bg-white/5 px-4 py-3">
                    <div className="text-xs uppercase tracking-[0.14em] text-slate-400">Run-Rate Savings</div>
                    <div className="text-xl font-semibold text-blue-100">{currency.format(monthlySavings)}</div>
                  </div>
                </div>
                <div className="rounded-lg border border-blue-500/20 bg-gradient-to-r from-blue-500/15 via-cyan-500/10 to-transparent px-4 py-3 text-sm text-slate-200 flex items-center gap-3">
                  <Shield className="w-4 h-4 text-emerald-300" /> 7.5x ROI guaranteed or we refund the delta.
                </div>
              </div>
            </motion.div>

            <motion.div
              id="security"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              className="rounded-2xl border border-emerald-500/25 bg-[#0b1a1a]/80 p-6 shadow-[0_0_28px_rgba(16,185,129,0.24)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">Zero-Trust Security</p>
              <h3 className="text-2xl font-bold text-white mt-1">On-premise execution. No inbound ports. Data never leaves your firewall.</h3>
              <div className="mt-4 space-y-3 text-sm text-slate-200">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-300 mt-0.5" />
                  <p>Ephemeral connectors run next to PowerBroker; outbound-only egress with hardware-bound keys.</p>
                </div>
                <div className="flex items-start gap-3">
                  <Lock className="w-5 h-5 text-emerald-300 mt-0.5" />
                  <p>SAML + SCIM ready. Every action is hash-linked for forensic replay.</p>
                </div>
                <div className="flex items-start gap-3">
                  <Server className="w-5 h-5 text-emerald-300 mt-0.5" />
                  <p>Runs on your metal: Windows Server, RHEL, or containerized sidecar.</p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2 text-xs uppercase tracking-[0.16em] text-emerald-200">
                <span className="rounded-lg border border-emerald-500/30 bg-white/5 px-3 py-2">Audit Trail</span>
                <span className="rounded-lg border border-emerald-500/30 bg-white/5 px-3 py-2">Signed Checksum</span>
                <span className="rounded-lg border border-emerald-500/30 bg-white/5 px-3 py-2">Role-Based Controls</span>
              </div>
            </motion.div>

            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              className="rounded-2xl border border-cyan-500/25 bg-[#0c1824]/80 p-6 shadow-[0_0_28px_rgba(34,211,238,0.22)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">FMCSA Fraud Sentinel</p>
              <h3 className="text-2xl font-bold text-white mt-1">Every load is checked against carrier authority, insurance, and fraud signals in real-time.</h3>
              <div className="mt-4 space-y-3 text-sm text-slate-200">
                <div className="flex items-center gap-3">
                  <Radar className="w-5 h-5 text-cyan-300" />
                  <span>Ping FMCSA, SMS, SAFER, and internal deny lists before a load is dispatched.</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cyan-300" />
                  <span>Auto-hold risky carriers; route to human for override with full context.</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-cyan-300" />
                  <span>Continuous status heartbeat with green pulse surfaced in the nav bar.</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="relative overflow-hidden bg-gradient-to-br from-cyan-600 via-blue-600 to-blue-800 py-16 sm:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.1),transparent_35%)]"></div>
        <div className="max-w-5xl relative mx-auto px-4 sm:px-6 lg:px-8 text-center text-white space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em]">
            Enterprise AI for Freight Brokers
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold drop-shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
            Ready to bolt Enterprise AI onto PowerBroker without paying the Upgrade Tax?
          </h2>
          <p className="text-lg text-blue-50 max-w-3xl mx-auto">
            We deploy in 24 hours, run behind your firewall, and guarantee a 7.5x ROI. No inbound ports. No migrations. Just secured automation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:contact@diviora.com"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-slate-900 rounded-lg font-semibold text-lg shadow-[0_0_30px_rgba(255,255,255,0.35)] hover:shadow-[0_0_40px_rgba(255,255,255,0.5)] transition-all"
            >
              Schedule Demo
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="mailto:sales@diviora.com"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/80 text-white rounded-lg font-semibold text-lg bg-white/10 hover:bg-white/15 transition-all"
            >
              Talk to Sales
            </a>
          </div>
          <div className="text-sm text-blue-100">Live cutovers every week. Ask for the latest status report.</div>
        </div>
      </section>
    </div>
  );
}
