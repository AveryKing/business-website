"use client";

import { ComponentProps, CSSProperties, ReactNode, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform, Variants } from "framer-motion";
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
const LOAD_MIN = 8;
const LOAD_MAX = 180;

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

const heroContainer: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.12, delayChildren: 0.08 } }
};

const heroItem: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: "easeOut" } }
};

const streamRow: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.28, ease: "easeOut" } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.18, ease: "easeIn" } }
};

const calculateAnnualSavings = (dailyLoads: number) => Math.round(dailyLoads * SAVINGS_PER_LOAD * ROI_MULTIPLIER * 365);

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
} & Omit<ComponentProps<typeof motion.div>, "children" | "className" | "style">;

function TiltCard({ children, className, style, whileHover, transition, ...rest }: TiltCardProps) {
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    tiltX.set(-y * 6);
    tiltY.set(x * 6);
  };

  const resetTilt = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <motion.div
      {...rest}
      onMouseMove={(event) => {
        handleMove(event);
        rest.onMouseMove?.(event);
      }}
      onMouseLeave={(event) => {
        resetTilt();
        rest.onMouseLeave?.(event);
      }}
      style={{ ...style, rotateX: tiltX, rotateY: tiltY, transformStyle: "preserve-3d" }}
      whileHover={{
        y: -2,
        boxShadow: "0 25px 90px rgba(34,211,238,0.22)",
        borderColor: "rgba(56,189,248,0.5)",
        ...whileHover
      }}
      transition={transition ?? { type: "spring", stiffness: 220, damping: 20 }}
      className={`will-change-transform ${className ?? ""}`}
    >
      {children}
    </motion.div>
  );
}

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

export default function Home() {
  const [loads, setLoads] = useState(48);
  const [streamIndex, setStreamIndex] = useState(0);
  const annualSavingsValue = useMotionValue(calculateAnnualSavings(loads));
  const animatedSavings = useSpring(annualSavingsValue, { damping: 16, stiffness: 160, mass: 0.9 });
  const savingsText = useTransform(animatedSavings, (value) => currency.format(Math.round(value)));

  useEffect(() => {
    const timer = setInterval(() => {
      setStreamIndex((prev) => (prev + 1) % streamEvents.length);
    }, 1400);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    annualSavingsValue.set(calculateAnnualSavings(loads));
  }, [annualSavingsValue, loads]);

  const visibleEvents = useMemo(
    () =>
      Array.from({ length: VISIBLE_STREAM_ROWS }, (_, i) => {
        const index = (streamIndex + i) % streamEvents.length;
        return { id: index, value: streamEvents[index] };
      }),
    [streamIndex]
  );
  const hoursSaved = Math.round(loads * HOURS_SAVED_PER_LOAD * 365);
  const sliderProgress = useMemo(() => ((loads - LOAD_MIN) / (LOAD_MAX - LOAD_MIN)) * 100, [loads]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#01040b] text-slate-100">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(34,211,238,0.18),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(59,130,246,0.2),transparent_40%),radial-gradient(circle_at_50%_80%,rgba(14,165,233,0.18),transparent_40%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60 mix-blend-screen bg-[linear-gradient(120deg,rgba(34,211,238,0.12)_10%,transparent_12%),linear-gradient(-120deg,rgba(59,130,246,0.12)_10%,transparent_12%)] bg-[size:22px_22px]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 animate-mesh-gradient opacity-55" />
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
        <div className="absolute inset-0 opacity-30 bg-[linear-gradient(90deg,rgba(34,211,238,0.14)_1px,transparent_1px),linear-gradient(0deg,rgba(59,130,246,0.12)_1px,transparent_1px)] bg-[size:44px_44px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_30%,rgba(34,211,238,0.25),transparent_38%),radial-gradient(circle_at_82%_20%,rgba(59,130,246,0.3),transparent_40%)]" />
        <div className="absolute inset-x-0 top-24 h-32 blur-3xl bg-gradient-to-r from-cyan-500/20 via-emerald-400/10 to-blue-500/25" aria-hidden />
        <div className="max-w-7xl relative mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={heroContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.7 }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <div className="space-y-8">
              <motion.div
                variants={heroItem}
                className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100 backdrop-blur-md shadow-[0_0_18px_rgba(34,211,238,0.35)]"
              >
                Freight Infrastructure · Living Command Center
              </motion.div>
              <motion.div variants={heroItem} className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight text-white drop-shadow-[0_6px_40px_rgba(34,211,238,0.25)]">
                  Stop Paying the McLeod &ldquo;Upgrade Tax&rdquo;.
                </h1>
                <p className="text-lg sm:text-xl text-slate-300 max-w-2xl leading-relaxed">
                  Add Enterprise AI to your legacy PowerBroker server in 24 hours. No downtime. No migration. A living dashboard that proves 7.5x ROI while you scroll.
                </p>
              </motion.div>
              <motion.div variants={heroItem} className="flex flex-col sm:flex-row gap-4">
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
              </motion.div>
              <motion.div variants={heroItem} className="grid grid-cols-2 sm:grid-cols-4 gap-5 text-sm">
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
                  <div
                    key={item.label}
                    className="rounded-lg border border-white/10 bg-white/10 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_35px_rgba(34,211,238,0.2)] backdrop-blur-md"
                  >
                    <div className="text-xs uppercase tracking-[0.15em] text-slate-300">{item.label}</div>
                    <div className="text-xl font-bold text-cyan-50">{item.value}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div variants={heroItem} className="relative">
              <div className="absolute -inset-8 bg-gradient-to-br from-cyan-500/25 via-transparent to-blue-500/25 blur-3xl" aria-hidden />
              <div className="relative rounded-2xl border border-white/10 bg-white/10 shadow-[0_40px_120px_rgba(8,47,73,0.45)] backdrop-blur-2xl overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                  <div className="text-sm font-semibold text-cyan-100">AI Intake Terminal</div>
                  <div className="flex items-center gap-2 text-emerald-300 text-xs font-semibold uppercase tracking-[0.18em]">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.8)] animate-pulse" />
                    Live</div>
                </div>
                <div className="px-6 py-6 space-y-5">
                  <div className="rounded-xl border border-white/10 bg-gradient-to-br from-[#0b172a]/80 via-[#0d1a30]/80 to-[#0a1326]/80 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                    <div className="flex items-center gap-3 mb-3 text-sm text-slate-200">
                      <ShieldCheck className="w-4 h-4 text-emerald-300" />
                      <span>Data Stream: hash-signed, zero inbound ports</span>
                    </div>
                    <div className="relative overflow-hidden rounded-lg border border-white/10 bg-black/20">
                      <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-cyan-400/70 via-blue-500/60 to-emerald-400/70 animate-pulse" aria-hidden />
                      <div className="p-3 space-y-2 font-mono text-sm text-cyan-100">
                        <AnimatePresence initial={false}>
                          {visibleEvents.map((line) => (
                            <motion.div
                              key={line.id}
                              variants={streamRow}
                              initial="hidden"
                              animate="visible"
                              exit="exit"
                              layout
                              className="flex items-center gap-3 rounded-md bg-white/5 px-3 py-2 border border-cyan-500/10"
                            >
                              <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                              <span className="text-cyan-100/90">{line.value}</span>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-xs uppercase tracking-[0.14em]">
                    <div className="rounded-md border border-white/10 bg-white/10 px-3 py-2 text-cyan-100 flex items-center gap-2 backdrop-blur">
                      <FileText className="w-4 h-4" /> PDF Intake
                    </div>
                    <div className="rounded-md border border-white/10 bg-white/10 px-3 py-2 text-cyan-100 flex items-center gap-2 backdrop-blur">
                      <Database className="w-4 h-4" /> PowerBroker
                    </div>
                    <div className="rounded-md border border-white/10 bg-white/10 px-3 py-2 text-cyan-100 flex items-center gap-2 backdrop-blur">
                      <Shield className="w-4 h-4" /> FMCSA Check
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
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
            <TiltCard
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/10 p-6 shadow-[0_0_60px_rgba(34,211,238,0.28)] backdrop-blur-2xl"
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
              <div className="grid lg:grid-cols-[1.05fr_1fr] gap-6 items-center">
                <div className="space-y-4">
                  <p className="text-sm text-slate-200">
                    PDFs, phone photos, and rate cons are ingested, authenticated, and normalized into structured McLeod-ready EDI with no inbound ports opened.
                  </p>
                  <div className="grid sm:grid-cols-3 gap-3 text-xs uppercase tracking-[0.16em] text-cyan-100">
                    <div className="rounded-lg border border-white/10 bg-white/10 px-3 py-2 backdrop-blur">No downtime</div>
                    <div className="rounded-lg border border-white/10 bg-white/10 px-3 py-2 backdrop-blur">On-premise execution</div>
                    <div className="rounded-lg border border-white/10 bg-white/10 px-3 py-2 backdrop-blur">Audit-ready logs</div>
                  </div>
                </div>
                <div className="relative rounded-2xl border border-white/10 bg-[#0b172a]/70 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/15 via-indigo-500/10 to-transparent blur-2xl" aria-hidden />
                  <div className="relative grid md:grid-cols-[1fr_auto_1fr] items-center gap-4 md:gap-6">
                    <div className="space-y-3">
                      {["Rate con.jpg", "POD_scan.pdf", "Lumper_receipt.png"].map((doc, idx) => (
                        <motion.div
                          key={doc}
                          animate={{ y: [0, -8, 0], rotate: [-4, 2, -4] }}
                          transition={{ duration: 4 + idx, repeat: Infinity, ease: "easeInOut" }}
                          className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-slate-100 shadow-[0_12px_50px_rgba(0,0,0,0.35)] backdrop-blur"
                        >
                          <FileText className="w-5 h-5 text-cyan-200" />
                          <span className="text-sm font-semibold">{doc}</span>
                        </motion.div>
                      ))}
                    </div>
                    <div className="relative h-32 w-32 md:h-40 md:w-40">
                      <div className="absolute inset-0 rounded-full border border-white/20 bg-gradient-to-br from-cyan-500/15 via-transparent to-blue-500/20 backdrop-blur-xl" />
                      <motion.div
                        className="absolute inset-2 rounded-full bg-[conic-gradient(from_90deg,rgba(34,211,238,0.45),transparent_55%,rgba(59,130,246,0.35))]"
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                      />
                      <motion.div
                        className="absolute inset-6 rounded-full border border-cyan-400/40"
                        animate={{ scale: [1, 1.06, 1], boxShadow: ["0 0 0 rgba(34,211,238,0.35)", "0 0 35px rgba(34,211,238,0.4)", "0 0 0 rgba(34,211,238,0.35)"] }}
                        transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
                      />
                      <motion.div
                        className="absolute inset-[22%] rounded-full bg-gradient-to-r from-cyan-500/30 via-transparent to-blue-500/30 blur-md"
                        animate={{ rotate: -360 }}
                        transition={{ repeat: Infinity, duration: 16, ease: "linear" }}
                      />
                      <div className="absolute inset-[32%] rounded-full bg-[#0b172a]" />
                      <div className="absolute inset-[44%] rounded-full bg-gradient-to-br from-cyan-400/60 to-blue-400/40 blur-sm" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-2 w-20 rounded-full bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent animate-sweep" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      {["XML 214", "EDI 204", "EDI 990"].map((doc, idx) => (
                        <motion.div
                          key={doc}
                          animate={{ y: [4, -4, 4] }}
                          transition={{ duration: 3.5 + idx, repeat: Infinity, ease: "easeInOut" }}
                          className="flex items-center gap-3 rounded-lg border border-white/10 bg-gradient-to-r from-emerald-400/10 via-cyan-400/10 to-blue-400/10 px-3 py-2 text-emerald-100 shadow-[0_12px_50px_rgba(34,197,94,0.1)] backdrop-blur"
                        >
                          <Database className="w-5 h-5 text-emerald-300" />
                          <span className="text-sm font-semibold">{doc}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>

            <TiltCard
              id="roi"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#0c1426]/80 via-[#0b1324]/80 to-[#08101f]/80 p-6 shadow-[0_0_50px_rgba(59,130,246,0.28)] backdrop-blur-2xl"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-200">The Savings Engine</p>
              <h3 className="text-2xl font-bold text-white mt-1">
                If you process {loads} loads per day, Diviora recovers
                <motion.span className="ml-2 inline-block text-cyan-100" aria-live="polite">
                  {savingsText}
                </motion.span>
                / year.
              </h3>
              <p className="text-sm text-slate-300 mt-2">Slider mirrors on-prem benchmarks and the 7.5x ROI guarantee. Drag to feel the savings climb. Default baseline assumes 48 daily loads for a mid-size brokerage.</p>
              <div className="mt-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.14em] text-blue-100">
                    <span>Loads per Day</span>
                    <span className="font-mono text-cyan-100">{loads} / day</span>
                  </div>
                  <div className="relative h-12">
                    <div className="absolute inset-y-4 inset-x-0 rounded-full border border-white/10 bg-white/10 backdrop-blur-md overflow-hidden">
                      <motion.div
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-500/60 via-blue-500/50 to-indigo-500/50 shadow-[0_0_40px_rgba(56,189,248,0.45)]"
                        style={{ width: `${sliderProgress}%` }}
                        transition={{ type: "spring", stiffness: 140, damping: 18 }}
                      />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.1),transparent_40%)]" />
                    </div>
                    <input
                      type="range"
                      min={LOAD_MIN}
                      max={LOAD_MAX}
                      value={loads}
                      onChange={(event) => setLoads(Number(event.target.value))}
                      aria-label="Estimated daily load volume"
                      aria-valuemin={LOAD_MIN}
                      aria-valuemax={LOAD_MAX}
                      aria-valuenow={loads}
                      className="relative z-10 h-12 w-full appearance-none cursor-pointer bg-transparent slider-thumb-glow"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg border border-white/10 bg-white/10 px-4 py-3 backdrop-blur">
                    <div className="text-xs uppercase tracking-[0.14em] text-slate-300">Annual Hours Saved</div>
                    <div className="text-xl font-semibold text-blue-100">{hoursSaved.toLocaleString()} hrs</div>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-white/10 px-4 py-3 backdrop-blur">
                    <div className="text-xs uppercase tracking-[0.14em] text-slate-300">Annual Savings</div>
                    <motion.div className="text-2xl font-black text-cyan-50 drop-shadow-[0_0_25px_rgba(34,211,238,0.35)]">
                      {savingsText}
                    </motion.div>
                  </div>
                </div>
                <div className="rounded-lg border border-white/10 bg-gradient-to-r from-blue-500/15 via-cyan-500/10 to-transparent px-4 py-3 text-sm text-slate-200 flex items-center gap-3 backdrop-blur">
                  <Shield className="w-4 h-4 text-emerald-300" /> 7.5x ROI guaranteed or we refund the delta—no inbound ports, no migrations.
                </div>
              </div>
            </TiltCard>

            <TiltCard
              id="security"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              className="rounded-2xl border border-white/10 bg-[#0b1a1a]/80 p-6 shadow-[0_0_40px_rgba(16,185,129,0.24)] backdrop-blur-2xl"
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
                <span className="rounded-lg border border-emerald-500/30 bg-white/10 px-3 py-2">Audit Trail</span>
                <span className="rounded-lg border border-emerald-500/30 bg-white/10 px-3 py-2">Signed Checksum</span>
                <span className="rounded-lg border border-emerald-500/30 bg-white/10 px-3 py-2">Role-Based Controls</span>
              </div>
            </TiltCard>

            <TiltCard
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              className="rounded-2xl border border-white/10 bg-[#0c1824]/80 p-6 shadow-[0_0_40px_rgba(34,211,238,0.22)] backdrop-blur-2xl"
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
            </TiltCard>
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

      <div className="fixed inset-x-0 bottom-4 z-50 px-4 sm:hidden">
        <a
          href="#contact"
          className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-3 text-slate-950 font-semibold shadow-[0_18px_50px_rgba(34,211,238,0.35)] backdrop-blur-lg"
        >
          Book the 15-Minute Audit
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
