import { useEffect, useRef, useState, useCallback } from "react";

// --- Starfield Background ---
function StarField() {
  const stars = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 3,
    duration: Math.random() * 3 + 2,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full bg-cream"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite, star-appear 2s ease-out ${s.delay * 0.5}s both`,
          }}
        />
      ))}
    </div>
  );
}

// --- Floating Hearts (ambient) ---
function FloatingHearts({ count = 12 }: { count?: number }) {
  const hearts = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 15,
    duration: Math.random() * 10 + 12,
    size: Math.random() * 14 + 10,
    opacity: Math.random() * 0.3 + 0.1,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((h) => (
        <div
          key={h.id}
          className="absolute text-primary"
          style={{
            left: `${h.left}%`,
            bottom: "-5%",
            fontSize: h.size,
            opacity: h.opacity,
            animation: `float-up ${h.duration}s linear ${h.delay}s infinite`,
          }}
        >
          ♥
        </div>
      ))}
    </div>
  );
}

// --- Scroll-triggered fade-in hook ---
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, visible };
}

function RevealSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// --- Glow divider ---
function GlowDivider() {
  return (
    <div className="flex justify-center my-8">
      <div
        className="h-[1px] rounded-full bg-primary"
        style={{ animation: "glow-line 3s ease-in-out infinite" }}
      />
    </div>
  );
}

// --- Celebration Particles ---
function CelebrationParticles() {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 2,
    duration: Math.random() * 4 + 3,
    size: Math.random() * 24 + 12,
    isHeart: Math.random() > 0.4,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.left}%`,
            bottom: "-10%",
            fontSize: p.size,
            animation: `celebration-heart ${p.duration}s ease-out ${p.delay}s both`,
            color: p.isHeart
              ? `hsl(${340 + Math.random() * 20} ${60 + Math.random() * 20}% ${55 + Math.random() * 20}%)`
              : `hsl(45 80% ${55 + Math.random() * 15}%)`,
          }}
        >
          {p.isHeart ? "♥" : "✦"}
        </div>
      ))}
    </div>
  );
}

// --- Main Page ---
const Index = () => {
  const [accepted, setAccepted] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const celebrationRef = useRef<HTMLDivElement>(null);

  const handleAccept = useCallback(() => {
    setShowCelebration(true);
    setAccepted(true);
    setTimeout(() => {
      celebrationRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      <StarField />
      <FloatingHearts />

      {/* === Section 1: Opening === */}
      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <div
          className="max-w-2xl"
          style={{ animation: "fade-in-up 2s ease-out 1s both" }}
        >
          <p className="mb-6 text-sm uppercase tracking-[0.3em] text-gold">
            ✦ a universe for two ✦
          </p>
          <h1 className="font-display text-4xl font-semibold leading-tight text-foreground sm:text-5xl md:text-6xl">
            Hi Ghada…
          </h1>
          <p
            className="mt-6 font-body text-lg leading-relaxed text-muted-foreground sm:text-xl"
            style={{ animation: "fade-in-up 2s ease-out 2s both" }}
          >
            I made this little universe because words alone weren't enough.
          </p>
        </div>
        {/* Scroll indicator */}
        <div
          className="absolute bottom-10 text-muted-foreground"
          style={{ animation: "scroll-bounce 2s ease-in-out infinite" }}
        >
          <span className="text-xs tracking-widest uppercase">scroll down</span>
          <div className="mx-auto mt-2 h-6 w-[1px] bg-muted-foreground/50" />
        </div>
      </section>

      {/* === Section 2: Why You Matter === */}
      <section className="relative z-10 mx-auto max-w-2xl px-6 py-32 text-center">
        <RevealSection>
          <p className="text-sm uppercase tracking-[0.3em] text-gold mb-10">
            💫 Why you matter to me
          </p>
        </RevealSection>

        {[
          "Your smile rewrites the worst of my days into something beautiful.",
          "When you laugh, the whole world holds its breath to listen.",
          "You don't just walk into a room — you become the reason it glows.",
          "With you, even silence feels like a love song.",
          "You are the calm in my chaos, the warmth in my coldest nights.",
          "Ghada, you are proof that magic is real.",
        ].map((line, i) => (
          <RevealSection key={i} delay={i * 0.15}>
            <p className="font-display text-xl italic leading-relaxed text-foreground sm:text-2xl mb-2">
              "{line}"
            </p>
            <GlowDivider />
          </RevealSection>
        ))}
      </section>

      {/* === Section 3: Our Moments === */}
      <section className="relative z-10 mx-auto max-w-3xl px-6 py-32">
        <RevealSection>
          <p className="text-center text-sm uppercase tracking-[0.3em] text-gold mb-16">
            🌙 Our Moments
          </p>
        </RevealSection>

        <div className="space-y-16">
          {[
            {
              title: "The Quiet Conversations",
              text: "Those late-night messages where time stops and it's just us — no pretenses, no walls. Just two hearts speaking in their truest language.",
            },
            {
              title: "The Gentle Reassurance",
              text: "The way you make me feel seen, even when I'm hiding. You notice the things I thought were invisible.",
            },
            {
              title: "The Unspoken Understanding",
              text: "We don't always need words. Sometimes a look, a pause, a shared silence says everything. And that's the most beautiful kind of connection.",
            },
            {
              title: "The Way You Stay",
              text: "In a world full of temporary people, you chose to stay. And that — Ghada — means everything to me.",
            },
          ].map((moment, i) => (
            <RevealSection key={i} delay={0.1}>
              <div className="rounded-2xl border border-border/50 bg-card/40 p-8 backdrop-blur-sm">
                <h3 className="font-display text-xl text-gold mb-3">
                  {moment.title}
                </h3>
                <p className="font-body text-base leading-relaxed text-muted-foreground">
                  {moment.text}
                </p>
              </div>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* === Section 4: The Question === */}
      {!accepted && (
        <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <RevealSection>
            <p className="text-sm uppercase tracking-[0.3em] text-gold mb-8">
              💖
            </p>
            <h2
              className="font-display text-3xl font-semibold text-foreground sm:text-4xl md:text-5xl mb-12"
              style={{ animation: "pulse-glow 3s ease-in-out infinite" }}
            >
              Ghada, will you be my Valentine?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleAccept}
                className="rounded-full bg-primary px-10 py-4 font-display text-lg text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_hsl(340_70%_55%/0.5)]"
              >
                Yes 💖
              </button>
              <button
                onClick={handleAccept}
                className="rounded-full border-2 border-primary px-10 py-4 font-display text-lg text-primary transition-all duration-300 hover:scale-105 hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_30px_hsl(340_70%_55%/0.5)]"
              >
                Of course 💕
              </button>
            </div>
          </RevealSection>
        </section>
      )}

      {/* === Section 5: Celebration === */}
      {accepted && (
        <>
          {showCelebration && <CelebrationParticles />}
          <section
            ref={celebrationRef}
            className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center"
          >
            <div style={{ animation: "fade-in-up 1.5s ease-out both" }}>
              <p className="text-6xl mb-8">💖</p>
              <h2 className="font-display text-3xl font-semibold text-foreground sm:text-4xl md:text-5xl mb-6">
                My universe is better with you in it.
              </h2>
              <p className="font-body text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
                Thank you for being my everything, Ghada. Every star in this sky is a reason I'm grateful for you.
              </p>
              <p className="mt-10 text-gold text-sm tracking-[0.3em] uppercase">
                ✦ forever yours ✦
              </p>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Index;
