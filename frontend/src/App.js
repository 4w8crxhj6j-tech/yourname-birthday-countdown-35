import React, { useEffect, useMemo, useRef, useState } from "react";
import confetti from "canvas-confetti";
import {
  Sparkles, Gift, PartyPopper, Cake, Crown, ShoppingBag,
  Home, Car, Plane, Ticket, Wallet, Share2, Music2, Check,
  MessageCircle
} from "lucide-react";
import { Toaster, toast } from "sonner";
import "@/App.css";
import { Bow, Sparkle, Heart } from "@/components/Bow";

const BIRTHDAY_ISO = "2026-06-23T00:00:00";
const BIRTHDAY_LABEL = "June 23, 2026";
const AGE_TURNING = 20;

const WISHLIST = [
  { id: 1, title: "Sea-Facing Penthouse", tag: "house-warming 101", note: "With a balcony where the breeze and the drama both hit different. Keys on June 23 pls.", icon: Home, accent: "#ff3d8a" },
  { id: 2, title: "A Car 🚗 (cash only)", tag: "green notes • bundle", note: "No transfers, no bank apps. A fat bundle of crisp green notes, tied with a thistle ribbon.", icon: Car, accent: "#c9a3d9" },
  { id: 3, title: "Vacation to Koh Samui", tag: "main character era", note: "Flights, villa, sunsets, coconuts. Book me in — I'll pick the outfits.", icon: Plane, accent: "#ff80b5" },
  { id: 4, title: "Koh Samui Shopping $$$", tag: "retail therapy fund", note: "Separate from the vacation. For souvenirs, swimwear, and emotional support sarongs.", icon: Wallet, accent: "#9b6cb5" },
  { id: 5, title: "Tomorrowland Tickets", tag: "festival gworl", note: "The biggest stage, the shiniest outfits. Two tickets minimum — you know why.", icon: Ticket, accent: "#ff3d8a" },
  { id: 6, title: "Claude Subscription", tag: "must-have", note: "Pro plan pls, the bestie assistant deserves the bestie tools ✦", icon: Sparkles, accent: "#ff3d8a" },
  { id: 7, title: "Copy.ai Subscription", tag: "ANNUAL • no cheap moves", note: "Yearly plan only. Monthly is NOT the vibe this year 💅", icon: Crown, accent: "#d9b8ff" },
  { id: 8, title: "A New Bag", tag: "accessorize", note: "Something cute, slay-ready, and big enough for a lipgloss army.", icon: ShoppingBag, accent: "#ff80b5" },
  { id: 9, title: "New Balance Casuals", tag: "cozy girl era", note: "The off-duty model shoe. Comfy but make it chic.", icon: Gift, accent: "#c9a3d9" },
  { id: 10, title: "Sparkly New Earrings", tag: "sparkle core", note: "Something that catches the light AND the compliments.", icon: Sparkles, accent: "#ffb6d9" },
  { id: 11, title: "Bunty Mahajan Cake", tag: "iconic • non-negotiable", note: "The only cake that understands the assignment. IYKYK.", icon: Cake, accent: "#ff3d8a" },
];

// ===== Confetti helpers =====
const fireConfetti = (opts = {}) => {
  confetti({
    particleCount: 80, spread: 70, startVelocity: 40, scalar: 1, ticks: 200,
    colors: ["#ff3d8a", "#ff80b5", "#ffc2dc", "#d9b8ff", "#c9a3d9", "#ffffff", "#9b6cb5"],
    origin: { y: 0.6 }, ...opts,
  });
};

const fireFromSides = () => {
  const end = Date.now() + 800;
  const colors = ["#ff3d8a", "#ff80b5", "#d9b8ff", "#c9a3d9", "#ffffff"];
  (function frame() {
    confetti({ particleCount: 4, angle: 60, spread: 55, origin: { x: 0, y: 0.7 }, colors });
    confetti({ particleCount: 4, angle: 120, spread: 55, origin: { x: 1, y: 0.7 }, colors });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
};

const popperBurst = (x = 0.5, y = 0.5) => {
  confetti({
    particleCount: 120, spread: 110, startVelocity: 50, origin: { x, y },
    colors: ["#ff3d8a", "#ff80b5", "#ffc2dc", "#d9b8ff", "#c9a3d9", "#fff"],
    shapes: ["circle", "square"],
  });
};

// ===== Countdown =====
function calcDiff(target) {
  const now = new Date();
  const t = new Date(target);
  let diff = Math.max(0, t - now);
  const d = Math.floor(diff / 86400000); diff -= d * 86400000;
  const h = Math.floor(diff / 3600000); diff -= h * 3600000;
  const m = Math.floor(diff / 60000); diff -= m * 60000;
  const s = Math.floor(diff / 1000);
  return { d, h, m, s, done: d + h + m + s === 0 };
}

function useCountdown(target) {
  const [t, setT] = useState(() => calcDiff(target));
  useEffect(() => {
    const id = setInterval(() => setT(calcDiff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);
  return t;
}

// ===== Small UI bits =====
const TimerCell = ({ value, label }) => (
  <div
    data-testid={`timer-${label}`}
    className="timer-pill px-5 py-4 md:px-8 md:py-6 min-w-[80px] md:min-w-[110px] flex flex-col items-center"
  >
    <span className="font-hero text-4xl md:text-6xl leading-none text-[#ff3d8a] tabular-nums">
      {String(value).padStart(2, "0")}
    </span>
    <span className="font-body text-[10px] md:text-xs uppercase tracking-[0.25em] text-[#a33973] mt-1">
      {label}
    </span>
  </div>
);

const Streamers = () => {
  const colors = ["#ff3d8a", "#ff80b5", "#d9b8ff", "#c9a3d9", "#ffc2dc", "#9b6cb5"];
  const strips = Array.from({ length: 14 }).map((_, i) => ({
    left: (i / 13) * 100,
    color: colors[i % colors.length],
    height: 90 + ((i * 37) % 90),
    delay: (i % 5) * 0.2,
  }));
  return (
    <div className="absolute inset-x-0 top-0 h-44 pointer-events-none overflow-hidden z-0">
      {strips.map((s, i) => (
        <div
          key={i}
          className="streamer"
          style={{
            left: `${s.left}%`,
            height: `${s.height}px`,
            background: s.color,
            animationDelay: `${s.delay}s`,
            boxShadow: `0 4px 12px ${s.color}55`,
          }}
        />
      ))}
    </div>
  );
};

const FloatingDecor = () => {
  const items = useMemo(
    () =>
      Array.from({ length: 22 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 16 + Math.random() * 28,
        delay: Math.random() * 10,
        dur: 12 + Math.random() * 14,
        kind: i % 3,
        color: ["#ff3d8a", "#d9b8ff", "#c9a3d9", "#ff80b5"][i % 4],
      })),
    []
  );
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {items.map((it) => (
        <div
          key={it.id}
          style={{
            position: "absolute",
            left: `${it.left}%`,
            bottom: `-80px`,
            animation: `rise ${it.dur}s linear ${it.delay}s infinite`,
          }}
        >
          {it.kind === 0 && <Bow size={it.size} color={it.color} ribbon="#ffd6e8" />}
          {it.kind === 1 && <Sparkle size={it.size} color={it.color} />}
          {it.kind === 2 && <Heart size={it.size} color={it.color} />}
        </div>
      ))}
    </div>
  );
};

const WishCard = ({ item, idx }) => {
  const Icon = item.icon;
  return (
    <div
      data-testid={`wish-card-${item.id}`}
      className="gloss-card rounded-[28px] p-6 md:p-7 relative animate-fade-up"
      style={{ animationDelay: `${idx * 70}ms` }}
    >
      <div className="absolute -top-5 -left-5 animate-wiggle">
        <Bow size={56} color={item.accent} ribbon="#ffd6e8" />
      </div>

      <div className="flex items-start justify-between gap-3 mb-3 pl-10">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-2xl" style={{ background: item.accent + "22", color: item.accent }}>
            <Icon size={20} strokeWidth={2.5} />
          </span>
          <span className="font-body text-[10px] uppercase tracking-[0.22em] px-2 py-1 rounded-full holo text-[#4a1f3a] border border-white">
            {item.tag}
          </span>
        </div>
        <Sparkle size={22} color={item.accent} className="animate-sparkle" />
      </div>

      <h3 className="font-hero text-2xl md:text-[26px] text-[#4a1f3a] leading-tight mb-2">{item.title}</h3>
      <p className="font-body text-sm md:text-base text-[#7a3a5f] leading-relaxed">{item.note}</p>

      <div className="mt-5 flex items-center justify-between">
        <span className="font-script text-lg text-[#ff3d8a]">yes pls ♡</span>
        <button
          data-testid={`wish-claim-${item.id}`}
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            popperBurst(
              (rect.left + rect.width / 2) / window.innerWidth,
              (rect.top + rect.height / 2) / window.innerHeight
            );
            toast.success(`Screenshot this & DM me — ${item.title} ♡`, {
              style: { background: "#fff", color: "#4a1f3a", border: "2px solid #ff80b5", borderRadius: "18px", fontFamily: "Quicksand, sans-serif" },
            });
          }}
          className="font-hero text-xs uppercase tracking-[0.18em] px-4 py-2 rounded-full bg-[#fff0f6] border-2 border-[#ff80b5] text-[#ff3d8a] hover:bg-[#ff3d8a] hover:text-white transition-colors"
        >
          I'll bring this
        </button>
      </div>
    </div>
  );
};

// ===== Share button =====
const ShareButton = () => {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? window.location.href : "";
  const msg = "🎀 You're invited — It's the bestest, sweetest human's birthday! June 23, 2026. Pick a gift, show up, don't come empty-handed ✨";

  const share = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: "Diva Birthday Invite ♡", text: msg, url });
      } else {
        await navigator.clipboard.writeText(`${msg}\n${url}`);
      }
      setCopied(true);
      fireConfetti({ particleCount: 60 });
      toast.success("Invite link copied — go spread the sparkle ♡");
      setTimeout(() => setCopied(false), 2400);
    } catch (e) {
      toast.error("Couldn't share. Copy the URL manually ♡");
    }
  };

  return (
    <button
      type="button"
      onClick={share}
      data-testid="share-invite-btn"
      className="font-hero uppercase tracking-[0.2em] text-xs md:text-sm px-5 py-3 rounded-full inline-flex items-center gap-2 bg-gradient-to-r from-[#9b6cb5] to-[#ff3d8a] text-white border-2 border-white shadow-lg hover:scale-[1.03] transition-transform"
    >
      {copied ? <Check size={16} /> : <Share2 size={16} />}
      {copied ? "copied ♡" : "share the invite"}
    </button>
  );
};

// ===== Rules marquee =====
const PartyMarquee = () => {
  const lines = [
    "NO ONE COMES EMPTY-HANDED",
    "1 GIFT • 1 PERSON",
    "BROKEES DANCE OR EXIT",
    "DRESS CODE: BOWS + LIPGLOSS",
    "JUNE 23 • SEE YOU THERE",
    "CAKE BY BUNTY MAHAJAN",
  ];
  const track = [...lines, ...lines];
  return (
    <div className="relative z-10 border-y-4 border-[#ff3d8a] bg-[#4a1f3a] py-3 overflow-hidden">
      <div className="marquee-track flex gap-10 whitespace-nowrap" style={{ width: "max-content" }}>
        {track.map((l, i) => (
          <span key={i} className="font-hero uppercase tracking-[0.3em] text-sm md:text-base text-[#ffc2dc] flex items-center gap-6">
            {l} <Sparkle size={14} color="#ff3d8a" />
          </span>
        ))}
      </div>
    </div>
  );
};

// ===== App =====
export default function App() {
  const { d, h, m, s, done } = useCountdown(BIRTHDAY_ISO);
  const firedOnce = useRef(false);

  useEffect(() => {
    if (firedOnce.current) return;
    firedOnce.current = true;
    const t = setTimeout(() => fireFromSides(), 700);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="App relative min-h-screen paper">
      <FloatingDecor />
      <Toaster position="top-center" richColors={false} />

      {/* NAV */}
      <nav className="relative z-20 max-w-6xl mx-auto flex items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2">
          <Bow size={36} color="#ff3d8a" ribbon="#ffc2dc" className="animate-wiggle" />
          <span className="font-script text-xl md:text-2xl text-[#ff3d8a]">diva.bday</span>
        </div>
        <div className="flex items-center gap-3">
          <a href="#wishlist" data-testid="nav-wishlist" className="hidden sm:inline-block font-hero text-xs md:text-sm uppercase tracking-[0.2em] text-[#4a1f3a] hover:text-[#ff3d8a] transition-colors cute-underline">
            wishlist ✦
          </a>
          <a href="#rsvp" data-testid="nav-rsvp" className="hidden sm:inline-block font-hero text-xs md:text-sm uppercase tracking-[0.2em] text-[#4a1f3a] hover:text-[#9b6cb5] transition-colors cute-underline">
            rsvp ♡
          </a>
          <ShareButton />
        </div>
      </nav>

      {/* HERO */}
      <header className="relative z-10 max-w-6xl mx-auto px-6 pt-6 pb-20">
        <Streamers />
        <div className="grid md:grid-cols-[1.3fr_1fr] gap-10 items-center">
          <div>
            <span data-testid="hero-eyebrow" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 border-[#ffc2dc] font-body text-xs uppercase tracking-[0.25em] text-[#ff3d8a] animate-fade-up">
              <PartyPopper size={14} /> pink alert • turning {AGE_TURNING} • {BIRTHDAY_LABEL}
            </span>

            <h1 data-testid="hero-title" className="font-display text-[54px] sm:text-[78px] lg:text-[104px] leading-[0.92] text-[#ff3d8a] mt-6 animate-fade-up" style={{ animationDelay: "120ms" }}>
              It's the <span className="text-[#4a1f3a]">bestest,</span>
              <br />
              <span className="inline-block animate-wiggle">sweetest</span> human
              <br />
              in the world's{" "}
              <span className="inline-block" style={{ background: "linear-gradient(180deg, #ff3d8a 0%, #9b6cb5 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                birthday.
              </span>
            </h1>

            <p className="font-body text-base md:text-lg text-[#7a3a5f] max-w-xl mt-6 animate-fade-up" style={{ animationDelay: "240ms" }}>
              Bows tied. Poppers loaded. Confetti standing by. Scroll down for
              the countdown, the Very Important Wishlist™, and the dress code.
              <b className="text-[#9b6cb5]"> No one comes empty-handed.</b>
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4 animate-fade-up" style={{ animationDelay: "360ms" }}>
              <button
                data-testid="cta-confetti"
                onClick={() => { fireFromSides(); popperBurst(0.5, 0.4); }}
                className="sticker-btn font-hero uppercase tracking-[0.2em] text-sm px-7 py-4 rounded-full inline-flex items-center gap-2"
              >
                <PartyPopper size={18} /> pop the confetti
              </button>
              <a href="#wishlist" data-testid="cta-wishlist" className="font-hero uppercase tracking-[0.2em] text-sm px-7 py-4 rounded-full inline-flex items-center gap-2 bg-white border-2 border-[#9b6cb5] text-[#9b6cb5] hover:bg-[#f4eafa] transition-colors">
                <Gift size={18} /> see the wishlist
              </a>
            </div>
          </div>

          {/* Hero polaroid */}
          <div className="relative animate-fade-up" style={{ animationDelay: "180ms" }}>
            <div className="absolute -top-8 -left-6 animate-float" style={{ "--r": "-12deg" }}>
              <Bow size={72} color="#c9a3d9" ribbon="#fff" />
            </div>
            <div className="absolute -bottom-6 -right-4 animate-float" style={{ animationDelay: "1s", "--r": "20deg" }}>
              <Bow size={84} color="#ff3d8a" ribbon="#ffc2dc" />
            </div>
            <div className="gloss-card rounded-[36px] p-6 rotate-[-3deg]">
              <div className="rounded-[24px] h-[320px] md:h-[380px] flex items-center justify-center relative overflow-hidden" style={{ background: "radial-gradient(circle at 30% 30%, #ffd6e8 0%, #ff80b5 55%, #9b6cb5 100%)" }}>
                <div className="absolute top-4 left-6 w-24 h-10 bg-white/50 rounded-full blur-xl" />
                <div className="absolute bottom-8 right-8 w-16 h-16 bg-white/30 rounded-full blur-2xl" />
                <div className="relative z-10 text-center px-6">
                  <Cake size={54} strokeWidth={2} className="text-white mx-auto animate-heartbeat" />
                  <div className="font-display text-5xl md:text-6xl text-white mt-3 drop-shadow-lg">23</div>
                  <div className="font-hero uppercase tracking-[0.3em] text-white text-xs md:text-sm">June — the day</div>
                </div>
                <Sparkle size={22} color="#fff" className="absolute top-8 right-10 animate-sparkle" />
                <Sparkle size={16} color="#fff" className="absolute bottom-14 left-10 animate-sparkle" style={{ animationDelay: "0.6s" }} />
                <Sparkle size={28} color="#fff" className="absolute top-1/2 right-6 animate-sparkle" style={{ animationDelay: "1.1s" }} />
              </div>
              <div className="text-center mt-4">
                <p className="font-script text-xl text-[#ff3d8a]">save the date ♡</p>
                <p className="font-body text-xs uppercase tracking-[0.25em] text-[#4a1f3a]">{BIRTHDAY_LABEL}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <PartyMarquee />

      {/* COUNTDOWN */}
      <section id="timer" className="relative z-10 max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-10">
          <span className="font-body text-xs uppercase tracking-[0.3em] text-[#ff3d8a]">✦ the countdown ✦</span>
          <h2 className="font-display text-5xl md:text-7xl text-[#4a1f3a] mt-3">
            until the <span className="text-[#ff3d8a]">diva day</span>
          </h2>
          <p className="font-body text-[#7a3a5f] mt-3">
            {done ? "It's today — the world owes you flowers ♡" : `you have exactly ${d} days to NOT be empty-handed ♡`}
          </p>
        </div>

        <div data-testid="countdown-board" className="gloss-card rounded-[36px] p-6 md:p-10 flex flex-col items-center">
          {done ? (
            <div className="text-center py-8">
              <div className="flex items-center justify-center gap-3 mb-3">
                <PartyPopper size={42} className="text-[#ff3d8a] animate-heartbeat" />
                <Bow size={56} color="#ff3d8a" ribbon="#ffc2dc" className="animate-wiggle" />
                <PartyPopper size={42} className="text-[#ff3d8a] animate-heartbeat" />
              </div>
              <h3 className="font-display text-6xl md:text-7xl text-[#ff3d8a]">It's today!!!</h3>
              <p className="font-body text-lg text-[#4a1f3a] mt-2">Happy birthday bestie. The world is yours today ♡</p>
            </div>
          ) : (
            <>
              <div className="flex flex-wrap items-center justify-center gap-3 md:gap-5">
                <TimerCell value={d} label="days" />
                <span className="font-display text-5xl text-[#ff80b5]">:</span>
                <TimerCell value={h} label="hrs" />
                <span className="font-display text-5xl text-[#ff80b5]">:</span>
                <TimerCell value={m} label="min" />
                <span className="font-display text-5xl text-[#ff80b5]">:</span>
                <TimerCell value={s} label="sec" />
              </div>
              <p className="font-script text-xl md:text-2xl text-[#ff3d8a] mt-8">tick tock, the birthday is coming ♡</p>
            </>
          )}
        </div>
      </section>

      {/* RULES / BROKEE NOTICE */}
      <section id="rules" className="relative z-10 max-w-6xl mx-auto px-6 pb-20">
        <div
          className="rounded-[36px] p-8 md:p-12 relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #2d0f24 0%, #4a1f3a 60%, #6b2f5a 100%)" }}
        >
          <div className="absolute top-6 right-8 animate-wiggle"><Bow size={56} color="#c9a3d9" ribbon="#fff" /></div>
          <div className="absolute bottom-4 left-6"><Sparkle size={24} color="#ffc2dc" className="animate-sparkle" /></div>

          <span className="font-body text-xs uppercase tracking-[0.3em] text-[#ffc2dc]">✦ house rules ✦</span>
          <h2 className="font-display text-5xl md:text-6xl text-white mt-3 leading-tight">
            the <span className="text-[#c9a3d9]">brokee</span> clause
          </h2>

          <div className="grid md:grid-cols-3 gap-4 mt-8">
            {[
              { n: "01", t: "1 Gift • 1 Person", d: "Don't double up, don't duplicate. Each bestie brings their own slice of joy." },
              { n: "02", t: "No Empty Hands", d: "Show up with a gift or show up with a performance. Empty-handers get escorted out. Lovingly." },
              { n: "03", t: "Brokee? Dance.", d: "If you're broke like me, you're doing a full dance performance. Pick a song, bring the choreography, serve." },
            ].map((r) => (
              <div key={r.n} className="rounded-2xl bg-white/10 border border-white/20 backdrop-blur p-5">
                <div className="font-display text-5xl text-[#ffc2dc]">{r.n}</div>
                <h3 className="font-hero text-xl text-white mt-1">{r.t}</h3>
                <p className="font-body text-sm text-[#ffd6e8] mt-2 leading-relaxed">{r.d}</p>
              </div>
            ))}
          </div>

          <p className="font-script text-2xl text-[#ffc2dc] mt-8">consider this your formal notice ♡</p>
        </div>
      </section>

      {/* MEET HER */}
      <section id="meet-her" className="relative z-10 max-w-6xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-[1fr_1.1fr] gap-10 md:gap-14 items-center">
          <div className="relative mx-auto md:mx-0 max-w-sm w-full">
            <div className="absolute -top-6 -left-6 animate-wiggle z-10" style={{ transformOrigin: "center" }}>
              <Bow size={72} color="#ff3d8a" ribbon="#ffc2dc" />
            </div>
            <div className="absolute -bottom-4 -right-2 animate-float z-10" style={{ "--r": "14deg" }}>
              <Heart size={44} color="#9b6cb5" />
            </div>

            <div data-testid="meet-her-polaroid" className="bg-white p-4 pb-6 rounded-[28px] rotate-[-4deg] shadow-[0_20px_60px_rgba(255,61,138,0.25)] border-2 border-[#ffc2dc] relative">
              <div className="relative rounded-[20px] overflow-hidden">
                <img
                  src="https://customer-assets.emergentagent.com/job_birthday-countdown-35/artifacts/lhs7skj1_CD3A0C7A-FF50-4468-BC42-2F4E218F0617.jpeg"
                  alt="Tiny birthday girl smiling"
                  className="w-full h-[420px] object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,61,138,0.08) 100%)" }} />
                <Sparkle size={26} color="#ff3d8a" className="absolute top-4 right-4 animate-sparkle" />
                <Sparkle size={18} color="#fff" className="absolute bottom-6 left-4 animate-sparkle" style={{ animationDelay: "0.7s" }} />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur font-hero text-[10px] uppercase tracking-[0.2em] text-[#ff3d8a] border-2 border-[#ffc2dc]">
                  est. 2006 ♡
                </div>
              </div>
              <p className="font-script text-center text-2xl text-[#ff3d8a] mt-4">exhibit A ♡</p>
            </div>
          </div>

          <div>
            <span className="font-body text-xs uppercase tracking-[0.3em] text-[#9b6cb5]">✦ emotional damage incoming ✦</span>
            <h2 className="font-display text-5xl md:text-7xl text-[#4a1f3a] mt-3 leading-[0.95]">
              how do you say
              <br />
              <span className="text-[#ff3d8a]">no</span> to this face?
            </h2>
            <p className="font-body text-base md:text-lg text-[#7a3a5f] mt-5 leading-relaxed max-w-lg">
              Exactly. You don't. This tiny diva with the dimples and the
              cheekiest smirk has been waiting{" "}
              <b className="text-[#9b6cb5]">{AGE_TURNING} whole years</b> for
              this birthday. The wishlist below is not a suggestion — it's a
              love language.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {["dimples certified", "serial cutie", "future diva", "will pout if empty-handed"].map((t) => (
                <span key={t} className="font-hero text-[10px] uppercase tracking-[0.18em] px-3 py-2 rounded-full bg-white border-2 border-[#ffc2dc] text-[#ff3d8a]">
                  {t} ♡
                </span>
              ))}
            </div>

            <div className="mt-8">
              <a href="#wishlist" data-testid="meet-her-cta" className="sticker-btn font-hero uppercase tracking-[0.2em] text-sm px-7 py-4 rounded-full inline-flex items-center gap-2">
                <Gift size={18} /> okay fine, show me the list
              </a>
              <p className="font-script text-[#9b6cb5] text-lg mt-3">
                she's been this cute since 2006 — that's seniority ♡
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WISHLIST */}
      <section id="wishlist" className="relative z-10 max-w-6xl mx-auto px-6 pb-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="font-body text-xs uppercase tracking-[0.3em] text-[#ff3d8a]">✦ the very important list ✦</span>
            <h2 className="font-display text-5xl md:text-7xl text-[#4a1f3a] mt-3 leading-[0.95]">
              things i <span className="text-[#ff3d8a]">want</span>
              <br />
              for my birthday
            </h2>
          </div>
          <div className="gloss-card rounded-3xl px-5 py-4 max-w-sm">
            <p className="font-body text-sm text-[#4a1f3a] leading-snug">
              <span className="font-hero uppercase tracking-widest text-[#9b6cb5] text-xs">fine print ♡</span>
              <br />
              No cheap picks. Annual only. Cash = green notes only. Penthouse must be sea-facing.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="wishlist-grid">
          {WISHLIST.map((item, idx) => (
            <WishCard key={item.id} item={item} idx={idx} />
          ))}
        </div>
      </section>

      {/* RSVP — DM to RSVP (no backend) */}
      <section id="rsvp" className="relative z-10 max-w-4xl mx-auto px-6 pb-24">
        <div className="text-center mb-8">
          <span className="font-body text-xs uppercase tracking-[0.3em] text-[#9b6cb5]">✦ rsvp required ✦</span>
          <h2 className="font-display text-5xl md:text-6xl text-[#4a1f3a] mt-3">
            are you <span className="text-[#9b6cb5]">coming</span>?
          </h2>
          <p className="font-body text-[#7a3a5f] mt-3 max-w-lg mx-auto">
            Screenshot the gift you're bringing, DM it to me, and consider
            yourself on the list. Simple, iconic, traceable.
          </p>
        </div>

        <div className="gloss-card rounded-[36px] p-8 md:p-12 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-[#ff3d8a] to-[#9b6cb5] text-white mb-5 shadow-lg">
            <MessageCircle size={38} strokeWidth={2} />
          </div>
          <h3 className="font-hero text-3xl md:text-4xl text-[#4a1f3a] leading-tight">
            slide into my DMs ♡
          </h3>
          <p className="font-body text-[#7a3a5f] mt-4 max-w-xl mx-auto">
            Send me a screenshot of which gift you're bringing (or which dance
            you're doing, brokee). <b className="text-[#9b6cb5]">1 gift = 1 person</b>,
            first-come first-serve. Surprises allowed if they slap.
          </p>

          <div className="grid sm:grid-cols-3 gap-3 mt-8 max-w-xl mx-auto">
            {[
              { n: "1", t: "pick your gift", d: "from the list above" },
              { n: "2", t: "screenshot it", d: "or the whole card" },
              { n: "3", t: "DM me 📲", d: "whatsapp / insta" },
            ].map((st) => (
              <div key={st.n} className="rounded-2xl bg-[#fff5fa] border-2 border-[#ffc2dc] p-4">
                <div className="font-display text-4xl text-[#ff3d8a]">{st.n}</div>
                <div className="font-hero text-sm text-[#4a1f3a] mt-1">{st.t}</div>
                <div className="font-body text-xs text-[#7a3a5f] mt-1">{st.d}</div>
              </div>
            ))}
          </div>

          <p className="font-script text-xl text-[#9b6cb5] mt-8">
            empty-handers ignored on sight ♡
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 max-w-6xl mx-auto px-6 pb-16">
        <div className="rounded-[36px] p-8 md:p-12 text-center relative overflow-hidden" style={{ background: "linear-gradient(135deg, #ff3d8a 0%, #ff80b5 40%, #c9a3d9 80%, #9b6cb5 100%)" }}>
          <div className="absolute top-6 left-8 animate-float"><Bow size={52} color="#fff" ribbon="#ffd6e8" /></div>
          <div className="absolute bottom-6 right-8 animate-float" style={{ animationDelay: "1.2s" }}><Heart size={42} color="#fff" /></div>
          <h3 className="font-display text-5xl md:text-6xl text-white leading-tight">see you on <span className="underline decoration-wavy decoration-white/70">june 23</span></h3>
          <p className="font-body text-white/90 mt-3 max-w-lg mx-auto">
            Cake by Bunty Mahajan. Dress code: lipgloss + a bow. Gifts strictly
            from the list. Brokees stretch before arrival ♡
          </p>
          <div className="mt-6 flex items-center justify-center"><ShareButton /></div>
          <p className="font-script text-white text-2xl mt-6">— with love, the birthday girl</p>
        </div>
      </footer>
    </div>
  );
}
