import { useState, type FormEvent } from "react";
import { Logo } from "./Nav";
import { ArrowRight, Lock } from "./Icons";

/**
 * Simple client-side auth for the admin panel.
 *
 * Default credentials:
 *   username: admin
 *   password: mariyam2003
 *
 * The password hash is stored in localStorage so you can change it
 * from inside the admin panel. On first use it checks against the
 * built-in default hash.
 */

const HASH_KEY = "mtc_admin_hash";
const SESSION_KEY = "mtc_admin_session";

// SHA-256 hash helper (Web Crypto API — available in all modern browsers)
async function sha256(text: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function getDefaultHash(): Promise<string> {
  return sha256("admin:mariyam2003");
}

/** Get stored hash or fall back to the default */
async function getStoredHash(): Promise<string> {
  const stored = localStorage.getItem(HASH_KEY);
  if (stored) return stored;
  return getDefaultHash();
}

/** Check if the session is already authenticated */
export function isAuthenticated(): boolean {
  return sessionStorage.getItem(SESSION_KEY) === "1";
}

/** Set session as authenticated */
function setAuthenticated() {
  sessionStorage.setItem(SESSION_KEY, "1");
}

/** Clear auth session (logout) */
export function logout() {
  sessionStorage.removeItem(SESSION_KEY);
}

/** Change password and store the new hash */
export async function changePassword(
  currentUser: string,
  currentPass: string,
  newUser: string,
  newPass: string,
): Promise<boolean> {
  const currentHash = await sha256(`${currentUser}:${currentPass}`);
  const storedHash = await getStoredHash();
  if (currentHash !== storedHash) return false;
  const newHash = await sha256(`${newUser}:${newPass}`);
  localStorage.setItem(HASH_KEY, newHash);
  return true;
}

// ────────────────────────────────────────────────────────────────
// Login Page Component
// ────────────────────────────────────────────────────────────────
export default function AdminLogin({ onSuccess }: { onSuccess: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password.");
      return;
    }

    setLoading(true);
    setError("");

    // Small delay to feel like a real auth check
    await new Promise((r) => setTimeout(r, 600));

    const inputHash = await sha256(`${username.trim()}:${password}`);
    const storedHash = await getStoredHash();

    if (inputHash === storedHash) {
      setAuthenticated();
      onSuccess();
    } else {
      setError("Invalid username or password.");
      setPassword("");
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
      {/* Ambient lighting */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(190,243,35,.12),transparent_60%)] blur-[80px]" />
      </div>

      <div className="relative w-full max-w-[420px]">
        {/* Card */}
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-garage-2 shadow-[0_30px_100px_rgba(0,0,0,.8)]">
          {/* Top red accent line */}
          <div className="h-1 w-full bg-gradient-to-r from-red via-red-3 to-red" />

          <div className="p-8 sm:p-10">
            {/* Logo */}
            <div className="flex justify-center">
              <Logo />
            </div>

            <div className="mt-8 text-center">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-white/5">
                <Lock className="h-6 w-6 text-red" />
              </div>
              <h2 className="font-display mt-5 text-[22px] font-bold uppercase text-white">
                Admin Access
              </h2>
              <p className="mt-2 text-[13px] text-chrome-3">
                Sign in to manage vehicle inventory
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              {/* Username */}
              <div>
                <label htmlFor="admin-user" className="label mb-2 block text-[9px] text-chrome-4">
                  Username
                </label>
                <div className="relative">
                  <input
                    id="admin-user"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                    autoComplete="username"
                    autoFocus
                    className="w-full rounded-lg border border-white/10 bg-white/[.03] py-3 pl-4 pr-4 text-[14px] text-white placeholder:text-chrome-4 outline-none transition-all focus:border-red/50 focus:ring-1 focus:ring-red/25"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="admin-pass" className="label mb-2 block text-[9px] text-chrome-4">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="admin-pass"
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    autoComplete="current-password"
                    className="w-full rounded-lg border border-white/10 bg-white/[.03] py-3 pl-4 pr-12 text-[14px] text-white placeholder:text-chrome-4 outline-none transition-all focus:border-red/50 focus:ring-1 focus:ring-red/25"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-semibold text-chrome-4 transition-colors hover:text-white"
                    tabIndex={-1}
                  >
                    {showPass ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="flex items-center gap-2 rounded-lg border border-red/25 bg-red/10 px-4 py-3 text-[12.5px] text-red">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 shrink-0">
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-red px-6 py-3.5 text-[14px] font-bold uppercase tracking-wide text-black shadow-[0_0_24px_rgba(190,243,35,.3)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(190,243,35,.5)] disabled:cursor-wait disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </form>

            <p className="mt-6 text-center text-[11px] leading-relaxed text-chrome-4">
              This panel is for authorised Mariyam Trading staff only.
              <br />
              Contact IT support if you've forgotten your credentials.
            </p>
          </div>
        </div>

        {/* Close hint */}
        <button
          type="button"
          onClick={() => {
            // Dispatch a close event — the parent will handle it
            window.dispatchEvent(new CustomEvent("mtc-login-cancel"));
          }}
          className="mt-4 w-full text-center text-[12px] text-chrome-4 transition-colors hover:text-white"
        >
          ← Back to website
        </button>
      </div>
    </div>
  );
}
