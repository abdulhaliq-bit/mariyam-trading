import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import Backdrop from "./components/Backdrop";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import SocialProof from "./components/SocialProof";
import Features from "./components/Features";
import Showcase from "./components/Showcase";
import Benefits from "./components/Benefits";
import Process from "./components/Process";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import AdminLogin, { isAuthenticated, logout } from "./components/AdminLogin";
import AdminPanel from "./components/AdminPanel";
import { WhatsApp } from "./components/Icons";

export default function App() {
  const [showFab, setShowFab] = useState(false);

  // Admin state machine: closed → login → panel
  const [adminState, setAdminState] = useState<"closed" | "login" | "panel">("closed");

  useEffect(() => {
    const onScroll = () => setShowFab(window.scrollY > 800);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Listen for login cancel event (from the "Back to website" button)
  useEffect(() => {
    const handler = () => setAdminState("closed");
    window.addEventListener("mtc-login-cancel", handler);
    return () => window.removeEventListener("mtc-login-cancel", handler);
  }, []);

  /** Called when footer triple-click triggers admin access */
  const handleAdminRequest = () => {
    if (isAuthenticated()) {
      // Already logged in this session — go straight to panel
      setAdminState("panel");
    } else {
      // Need to authenticate first
      setAdminState("login");
    }
  };

  /** Called after successful login */
  const handleLoginSuccess = () => {
    setAdminState("panel");
  };

  /** Called when user logs out from admin panel */
  const handleLogout = () => {
    logout();
    setAdminState("closed");
  };

  return (
    <div className="relative min-h-screen">
      <Backdrop />

      <a href="#inventory" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-red focus:px-4 focus:py-2 focus:text-[13px] focus:font-bold focus:text-black">
        Skip to inventory
      </a>

      <Nav />

      <main>
        <Hero />
        <SocialProof />
        <Features />
        <Showcase />
        <Benefits />
        <Process />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>

      <Footer onOpenAdmin={handleAdminRequest} />

      {/* Login gate */}
      {adminState === "login" && (
        <AdminLogin onSuccess={handleLoginSuccess} />
      )}

      {/* Admin panel (only reachable after auth) */}
      <AdminPanel
        open={adminState === "panel"}
        onClose={() => setAdminState("closed")}
        onLogout={handleLogout}
      />

      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/94777346406"
        aria-label="Chat on WhatsApp"
        className={cn(
          "fixed bottom-5 right-5 z-40 inline-flex items-center gap-2.5 rounded-xl border border-white/10 bg-garage-2/95 px-4 py-3.5 text-[12px] font-bold text-white shadow-[0_10px_40px_rgba(0,0,0,.5)] backdrop-blur-md transition-all duration-400 hover:border-green/40 hover:text-green",
          showFab ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-5 opacity-0",
        )}
      >
        <span className="relative grid h-7 w-7 place-items-center rounded-full bg-green/15 text-green">
          <WhatsApp className="h-4 w-4" />
        </span>
        <span className="hidden sm:inline">Talk to an advisor</span>
      </a>
    </div>
  );
}
