import React, { useEffect, useMemo, useState } from "react";
import "@/App.css";
import { Bow, Sparkle, Heart } from "@/components/Bow";
import { Sparkles, Gift, PartyPopper, Cake, Crown, ShoppingBag } from "lucide-react";
import { Toaster, toast } from "sonner";

const BIRTHDAY_ISO = "2026-06-23T00:00:00";
const BIRTHDAY_LABEL = "June 23, 2026";

const WISHLIST = [
  {
    id: 1,
    title: "Claude Subscription",
    tag: "must-have",
    note: "Pro plan pls, the bestie assistant deserves the bestie tools ✦",
    emojiIcon: Sparkles,
    accent: "#ff3d8a",
  },
  {
    id: 2,
    title: "Copy.ai Subscription",
    tag: "ANNUAL • no cheap moves",
    note: "Yearly plan only. Monthly is NOT the vibe this year 💅",
    emojiIcon: Crown,
    accent: "#d9b8ff",
  },
  {
    id: 3,
    title: "A New Bag",
    tag: "accessorize",
    note: "Something cute, slay-ready, and big enough for a lipgloss army.",
    emojiIcon: ShoppingBag,
    accent: "#ff80b5",
  },
  {
    id: 4,
    title: "New Balance Casuals",
    tag: "cozy girl era",
    note: "The off-duty model shoe. Comfy but make it chic.",
    emojiIcon: Gift,
    accent: "#ff3d8a",
  },
  {
    id: 5,
    title: "Sparkly New Earrings",
    tag: "sparkle core",
    note: "Something that catches the light AND the compliments.",
    emojiIcon: Sparkles,
    accent: "#ffb6d9",
  },
  {
    id: 6,
    title: "Bunty Mahajan Cake",
    tag: "iconic",
    note: "The only cake that understands the assignment. IYKYK.",
    emojiIcon: Cake,
    accent: "#ff3d8a",
  },
];

function calcDiff(target) {
  const now = new Date();
  const t = new Date(target);
  let diff = Math.max(0, t - now);
  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff -= d * 24 * 60 * 60 * 1000;
  const h = Math.floor(diff / (1000 * 60 * 60));
  diff -= h * 60 * 60 * 1000;
  const m = Math.floor(diff / (1000 * 60));
  diff -= m * 60 * 1000;
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

const FloatingDecor = () => {
  const items = useMemo(
    () =>
      Array.from({ length: 18 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 16 + Math.random() * 28,
        delay: Math.random() * 8,
        dur: 10 + Math.random() * 12,
        kind: i % 3,
        color: ["#ff3d8a", "#d9b8ff", "#ff80b5"][i % 3],
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
  const Icon = item.emojiIcon;
  return (
    <div
      data-testid={`wish-card-${item.id}`}
      className="gloss-card rounded-[28px] p-6 md:p-7 relative animate-fade-up"
      style={{ animationDelay: `${idx * 90}ms` }}
    >
      {/* sticker bow corner */}
      <div
        className="absolute -top-5 -left-5 animate-wiggle"
        style={{ transformOrigin: "center" }}
      >
        <Bow size={56} color={item.accent} ribbon="#ffd6e8" />
      </div>

      <div className="flex items-start justify-between gap-3 mb-3 pl-10">
        <div className="flex items-center gap-2">
          <span
            className="inline-flex items-center justify-center w-10 h-10 rounded-2xl"
            style={{ background: item.accent + "22", color: item.accent }}
          >
            <Icon size={20} strokeWidth={2.5} />
          </span>
          <span className="font-body text-[10px] uppercase tracking-[0.22em] px-2 py-1 rounded-full holo text-[#4a1f3a] border border-white">
            {item.tag}
          </span>
        </div>
        <Sparkle size={22} color={item.accent} className="animate-sparkle" />
      </div>

      <h3 className="font-hero text-2xl md:text-3xl text-[#4a1f3a] leading-tight mb-2">
        {item.title}
      </h3>
      <p className="font-body text-sm md:text-base text-[#7a3a5f] leading-relaxed">
        {item.note}
      </p>

      <div className="mt-5 flex items-center justify-between">
        <span className="font-script text-lg text-[#ff3d8a]">yes pls ♡</span>
        <button
          data-testid={`wish-claim-${item.id}`}
          onClick={() =>
            toast.success(`Noted — ${item.title} reserved in the Diva List ♡`, {
              style: {
                background: "#fff",
                color: "#4a1f3a",
                border: "2px solid #ff80b5",
                borderRadius: "18px",
                fontFamily: "Quicksand, sans-serif",
              },
            })
          }
          className="font-hero text-xs uppercase tracking-[0.18em] px-4 py-2 rounded-full bg-[#fff0f6] border-2 border-[#ff80b5] text-[#ff3d8a] hover:bg-[#ff3d8a] hover:text-white transition-colors"
        >
          I'll get this
        </button>
      </div>
    </div>
  );
};

export default function App() {
  const { d, h, m, s, done } = useCountdown(BIRTHDAY_ISO);

  return (
    <div className="App relative min-h-screen paper">
      <FloatingDecor />
      <Toaster position="top-center" richColors={false} />

      {/* ===== NAV ===== */}
      <nav className="relative z-10 max-w-6xl mx-auto flex items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2">
          <Bow size={36} color="#ff3d8a" ribbon="#ffc2dc" className="animate-wiggle" />
          <span className="font-script text-xl md:text-2xl text-[#ff3d8a]">diva.bday</span>
        </div>
        <a
          href="#wishlist"
          data-testid="nav-wishlist"
          className="font-hero text-xs md:text-sm uppercase tracking-[0.2em] text-[#4a1f3a] hover:text-[#ff3d8a] transition-colors cute-underline"
        >
          the wishlist ✦
        </a>
      </nav>

      {/* ===== HERO ===== */}
      <header className="relative z-10 max-w-6xl mx-auto px-6 pt-6 pb-20">
        <div className="grid md:grid-cols-[1.3fr_1fr] gap-10 items-center">
          <div>
            <span
              data-testid="hero-eyebrow"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 border-[#ffc2dc] font-body text-xs uppercase tracking-[0.25em] text-[#ff3d8a] animate-fade-up"
            >
              <Sparkle size={12} color="#ff3d8a" />
              you're invited • pink alert • {BIRTHDAY_LABEL}
            </span>

            <h1
              data-testid="hero-title"
              className="font-display text-[54px] sm:text-[78px] lg:text-[104px] leading-[0.92] text-[#ff3d8a] mt-6 animate-fade-up"
              style={{ animationDelay: "120ms" }}
            >
              It's the{" "}
              <span className="text-[#4a1f3a]">bestest,</span>
              <br />
              <span className="inline-block animate-wiggle">sweetest</span>{" "}
              human
              <br />
              in the world's{" "}
              <span
                className="inline-block"
                style={{
                  background: "linear-gradient(180deg, #ff3d8a 0%, #d9b8ff 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                birthday.
              </span>
            </h1>

            <p
              className="font-body text-base md:text-lg text-[#7a3a5f] max-w-xl mt-6 animate-fade-up"
              style={{ animationDelay: "240ms" }}
            >
              Bows tied, lipgloss applied, cake on the way. Scroll down for the
              official countdown and the Very Important Wishlist™. No cheap
              picks. We're in our diva era.
            </p>

            <div
              className="mt-8 flex flex-wrap items-center gap-4 animate-fade-up"
              style={{ animationDelay: "360ms" }}
            >
              <a
                href="#timer"
                data-testid="cta-countdown"
                className="sticker-btn font-hero uppercase tracking-[0.2em] text-sm px-7 py-4 rounded-full inline-flex items-center gap-2"
              >
                <PartyPopper size={18} /> count it down
              </a>
              <a
                href="#wishlist"
                data-testid="cta-wishlist"
                className="font-hero uppercase tracking-[0.2em] text-sm px-7 py-4 rounded-full inline-flex items-center gap-2 bg-white border-2 border-[#ff80b5] text-[#ff3d8a] hover:bg-[#ffe4f1] transition-colors"
              >
                <Gift size={18} /> see the wishlist
              </a>
            </div>
          </div>

          {/* Hero card / polaroid */}
          <div className="relative animate-fade-up" style={{ animationDelay: "180ms" }}>
            <div className="absolute -top-8 -left-6 animate-float" style={{ "--r": "-12deg" }}>
              <Bow size={72} color="#d9b8ff" ribbon="#fff" />
            </div>
            <div className="absolute -bottom-6 -right-4 animate-float" style={{ animationDelay: "1s", "--r": "20deg" }}>
              <Bow size={84} color="#ff3d8a" ribbon="#ffc2dc" />
            </div>

            <div className="gloss-card rounded-[36px] p-6 rotate-[-3deg]">
              <div
                className="rounded-[24px] h-[320px] md:h-[380px] flex items-center justify-center relative overflow-hidden"
                style={{
                  background:
                    "radial-gradient(circle at 30% 30%, #ffd6e8 0%, #ff80b5 60%, #ff3d8a 100%)",
                }}
              >
                {/* gloss highlights */}
                <div className="absolute top-4 left-6 w-24 h-10 bg-white/50 rounded-full blur-xl" />
                <div className="absolute bottom-8 right-8 w-16 h-16 bg-white/30 rounded-full blur-2xl" />

                <div className="relative z-10 text-center px-6">
                  <Cake size={54} strokeWidth={2} className="text-white mx-auto animate-heartbeat" />
                  <div className="font-display text-5xl md:text-6xl text-white mt-3 drop-shadow-lg">
                    23
                  </div>
                  <div className="font-hero uppercase tracking-[0.3em] text-white text-xs md:text-sm">
                    June — the day
                  </div>
                </div>

                {/* sparkles */}
                <Sparkle size={22} color="#fff" className="absolute top-8 right-10 animate-sparkle" />
                <Sparkle size={16} color="#fff" className="absolute bottom-14 left-10 animate-sparkle" style={{ animationDelay: "0.6s" }} />
                <Sparkle size={28} color="#fff" className="absolute top-1/2 right-6 animate-sparkle" style={{ animationDelay: "1.1s" }} />
              </div>
              <div className="text-center mt-4">
                <p className="font-script text-xl text-[#ff3d8a]">save the date ♡</p>
                <p className="font-body text-xs uppercase tracking-[0.25em] text-[#4a1f3a]">
                  {BIRTHDAY_LABEL}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ===== COUNTDOWN ===== */}
      <section id="timer" className="relative z-10 max-w-6xl mx-auto px-6 pb-24">
        <div className="text-center mb-10">
          <span className="font-body text-xs uppercase tracking-[0.3em] text-[#ff3d8a]">
            ✦ the countdown ✦
          </span>
          <h2 className="font-display text-5xl md:text-7xl text-[#4a1f3a] mt-3">
            until the <span className="text-[#ff3d8a]">diva day</span>
          </h2>
          <p className="font-body text-[#7a3a5f] mt-3">
            Live ticking, heart palpitating, glitter descending.
          </p>
        </div>

        <div
          data-testid="countdown-board"
          className="gloss-card rounded-[36px] p-6 md:p-10 flex flex-col items-center"
        >
          {done ? (
            <div className="text-center py-8">
              <div className="flex items-center justify-center gap-3 mb-3">
                <PartyPopper size={42} className="text-[#ff3d8a] animate-heartbeat" />
                <Bow size={56} color="#ff3d8a" ribbon="#ffc2dc" className="animate-wiggle" />
                <PartyPopper size={42} className="text-[#ff3d8a] animate-heartbeat" />
              </div>
              <h3 className="font-display text-6xl md:text-7xl text-[#ff3d8a]">
                It's today!!!
              </h3>
              <p className="font-body text-lg text-[#4a1f3a] mt-2">
                Happy birthday, bestie. The world is yours today ♡
              </p>
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
              <p className="font-script text-xl md:text-2xl text-[#ff3d8a] mt-8">
                tick tock, the birthday is coming ♡
              </p>
            </>
          )}
        </div>
      </section>

      {/* ===== WISHLIST ===== */}
      <section id="wishlist" className="relative z-10 max-w-6xl mx-auto px-6 pb-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="font-body text-xs uppercase tracking-[0.3em] text-[#ff3d8a]">
              ✦ the very important list ✦
            </span>
            <h2 className="font-display text-5xl md:text-7xl text-[#4a1f3a] mt-3 leading-[0.95]">
              things i <span className="text-[#ff3d8a]">want</span>
              <br />
              for my birthday
            </h2>
          </div>
          <div className="gloss-card rounded-3xl px-5 py-4 max-w-sm">
            <p className="font-body text-sm text-[#4a1f3a] leading-snug">
              <span className="font-hero uppercase tracking-widest text-[#ff3d8a] text-xs">
                fine print ♡
              </span>
              <br />
              No cheap picks allowed. Annual subscriptions only. Bows optional
              but highly encouraged.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="wishlist-grid">
          {WISHLIST.map((item, idx) => (
            <WishCard key={item.id} item={item} idx={idx} />
          ))}
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="relative z-10 max-w-6xl mx-auto px-6 pb-16">
        <div
          className="rounded-[36px] p-8 md:p-12 text-center relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #ff3d8a 0%, #ff80b5 50%, #d9b8ff 100%)",
          }}
        >
          <div className="absolute top-6 left-8 animate-float">
            <Bow size={52} color="#fff" ribbon="#ffd6e8" />
          </div>
          <div className="absolute bottom-6 right-8 animate-float" style={{ animationDelay: "1.2s" }}>
            <Heart size={42} color="#fff" />
          </div>
          <h3 className="font-display text-5xl md:text-6xl text-white leading-tight">
            see you on <span className="underline decoration-wavy decoration-white/70">june 23</span>
          </h3>
          <p className="font-body text-white/90 mt-3 max-w-lg mx-auto">
            Cake by Bunty Mahajan. Dress code: lipgloss and a bow. Gifts strictly
            off the list above ♡
          </p>
          <p className="font-script text-white text-2xl mt-6">
            — with love, the birthday girl
          </p>
        </div>
      </footer>
    </div>
  );
}
