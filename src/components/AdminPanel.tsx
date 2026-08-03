import { useCallback, useEffect, useRef, useState, type DragEvent, type ChangeEvent } from "react";
import { cn } from "@/utils/cn";
import { loadVehicles, saveVehicles, resetVehicles, defaultVehicles, type Vehicle, loadEnquiries, saveEnquiries, type Enquiry } from "@/data";
import { changePassword, logout } from "./AdminLogin";
import { Close, Plus, ArrowRight, Lock } from "./Icons";

const CATS: Vehicle["category"][] = ["SUV", "Sedan", "Executive", "Electric", "Performance", "Vans and Commercial"];
const TONES: Vehicle["statusTone"][] = ["stock", "transit", "order"];
const MAX_IMG_WIDTH = 1400;
const MAX_IMG_HEIGHT = 940;
const JPEG_QUALITY = 0.82;

const empty: Vehicle = {
  id: "", name: "", tagline: "", category: "SUV", price: "", year: "",
  mileage: "", fuel: "", gearbox: "", status: "In stock · Colombo 06",
  statusTone: "stock", image: "", images: [], highlight: "",
};

/** Compress an image file → base64 JPEG at a reasonable size */
function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        let w = img.width;
        let h = img.height;
        if (w > MAX_IMG_WIDTH) { h = Math.round(h * (MAX_IMG_WIDTH / w)); w = MAX_IMG_WIDTH; }
        if (h > MAX_IMG_HEIGHT) { w = Math.round(w * (MAX_IMG_HEIGHT / h)); h = MAX_IMG_HEIGHT; }
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL("image/jpeg", JPEG_QUALITY));
      };
      img.onerror = reject;
      img.src = reader.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/** Get the file size of a base64 string in KB */
function base64SizeKB(str: string): number {
  const head = str.indexOf(",") + 1;
  return Math.round(((str.length - head) * 3) / 4 / 1024);
}

// ────────────────────────────────────────────────────────────────
// Multi-image uploader sub-component
// ────────────────────────────────────────────────────────────────
function ImageManager({
  images,
  onChange,
}: {
  images: string[];
  onChange: (imgs: string[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [dragIdx, setDragIdx] = useState<number | null>(null);

  const addFiles = async (files: FileList | File[]) => {
    const imageFiles = Array.from(files).filter(f => f.type.startsWith("image/"));
    if (imageFiles.length === 0) return;
    setProcessing(true);
    try {
      const compressed = await Promise.all(imageFiles.map(compressImage));
      onChange([...images, ...compressed]);
    } catch (e) {
      console.error("Image processing failed:", e);
    }
    setProcessing(false);
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) addFiles(e.target.files);
    e.target.value = "";
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files) addFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e: DragEvent) => { e.preventDefault(); setDragging(true); };
  const handleDragLeave = () => setDragging(false);

  const removeImage = (idx: number) => {
    onChange(images.filter((_, i) => i !== idx));
  };

  const setPrimary = (idx: number) => {
    if (idx === 0) return;
    const next = [...images];
    const [item] = next.splice(idx, 1);
    next.unshift(item);
    onChange(next);
  };

  // Drag-to-reorder within the thumbnail grid
  const handleThumbDragStart = (idx: number) => { setDragIdx(idx); };
  const handleThumbDragOver = (e: DragEvent, idx: number) => {
    e.preventDefault();
    if (dragIdx === null || dragIdx === idx) return;
    const next = [...images];
    const [item] = next.splice(dragIdx, 1);
    next.splice(idx, 0, item);
    onChange(next);
    setDragIdx(idx);
  };
  const handleThumbDragEnd = () => { setDragIdx(null); };

  const totalSizeKB = images.reduce((sum, img) => sum + (img.startsWith("data:") ? base64SizeKB(img) : 0), 0);

  return (
    <div className="sm:col-span-2">
      <label className="label mb-2 block text-[9px] text-chrome-4">
        Vehicle images {images.length > 0 && <span className="text-chrome-3">({images.length} photo{images.length !== 1 ? "s" : ""})</span>}
      </label>

      {/* Drop zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "relative flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-6 py-8 text-center transition-all duration-300",
          dragging
            ? "border-red bg-red/10"
            : "border-white/15 bg-white/[.02] hover:border-white/30 hover:bg-white/[.04]",
        )}
      >
        {processing ? (
          <>
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-red border-t-transparent" />
            <p className="text-[13px] font-semibold text-white">Processing images...</p>
          </>
        ) : (
          <>
            <div className="grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-white/5">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6 text-red">
                <path d="M12 16V4m0 0l-4 4m4-4l4 4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 17l.6 2.4A2 2 0 004.6 21h14.8a2 2 0 002-1.6L22 17" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <p className="text-[14px] font-semibold text-white">
                Drop images here or <span className="text-red">browse files</span>
              </p>
              <p className="mt-1 text-[12px] text-chrome-4">
                JPG, PNG, WebP · Multiple files allowed · Auto-compressed
              </p>
            </div>
          </>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileInput}
          className="hidden"
        />
      </div>

      {/* OR paste URL */}
      <div className="mt-3 flex items-center gap-2">
        <span className="label text-[9px] text-chrome-4">Or paste URL:</span>
        <input
          type="url"
          placeholder="https://example.com/photo.jpg"
          className="flex-1 rounded-lg border border-white/10 bg-white/[.03] px-3 py-2 text-[12px] text-white placeholder:text-chrome-4 outline-none transition-colors focus:border-red/50"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const val = (e.target as HTMLInputElement).value.trim();
              if (val) { onChange([...images, val]); (e.target as HTMLInputElement).value = ""; }
            }
          }}
        />
        <button
          type="button"
          onClick={() => {
            const input = document.querySelector<HTMLInputElement>("[type=url]");
            const val = input?.value.trim();
            if (val) { onChange([...images, val]); if (input) input.value = ""; }
          }}
          className="rounded-lg border border-white/12 px-3 py-2 text-[11px] font-semibold text-chrome-2 hover:text-white"
        >
          Add
        </button>
      </div>

      {/* Image thumbnails — reorderable grid */}
      {images.length > 0 && (
        <div className="mt-4">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-[11px] text-chrome-4">
              Drag to reorder · First image = cover photo
              {totalSizeKB > 0 && <span className="ml-2 text-chrome-3">({Math.round(totalSizeKB / 1024 * 10) / 10} MB stored)</span>}
            </p>
            {images.length > 1 && (
              <button type="button" onClick={() => onChange([])} className="text-[10px] font-semibold text-red hover:underline">
                Remove all
              </button>
            )}
          </div>

          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
            {images.map((img, idx) => (
              <div
                key={idx}
                draggable
                onDragStart={() => handleThumbDragStart(idx)}
                onDragOver={(e) => handleThumbDragOver(e, idx)}
                onDragEnd={handleThumbDragEnd}
                className={cn(
                  "group/thumb relative cursor-grab overflow-hidden rounded-lg border-2 transition-all active:cursor-grabbing",
                  idx === 0 ? "border-red ring-1 ring-red/30" : "border-white/10 hover:border-white/25",
                  dragIdx === idx && "opacity-50",
                )}
              >
                <img src={img} alt={`Photo ${idx + 1}`} className="aspect-[4/3] w-full object-cover" />

                {/* Primary badge */}
                {idx === 0 && (
                  <span className="absolute left-1 top-1 rounded bg-red px-1.5 py-0.5 text-[8px] font-bold uppercase text-black">
                    Cover
                  </span>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center gap-1 bg-black/60 opacity-0 transition-opacity group-hover/thumb:opacity-100">
                  {idx !== 0 && (
                    <button
                      type="button"
                      onClick={() => setPrimary(idx)}
                      title="Set as cover"
                      className="grid h-7 w-7 place-items-center rounded-md bg-white/20 text-white hover:bg-red"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3.5 w-3.5">
                        <path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1L12 2z" strokeLinejoin="round" />
                      </svg>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    title="Remove"
                    className="grid h-7 w-7 place-items-center rounded-md bg-white/20 text-white hover:bg-red"
                  >
                    <Close className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Index */}
                <span className="absolute bottom-1 right-1 rounded bg-black/50 px-1 py-0.5 text-[8px] font-bold text-white/60">
                  {idx + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ────────────────────────────────────────────────────────────────
// Main Admin Panel
// ────────────────────────────────────────────────────────────────
export default function AdminPanel({ open, onClose, onLogout }: { open: boolean; onClose: () => void; onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState<"vehicles" | "enquiries">("vehicles");
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [editing, setEditing] = useState<Vehicle | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [showPwChange, setShowPwChange] = useState(false);
  const [pwForm, setPwForm] = useState({ curUser: "", curPass: "", newUser: "", newPass: "", confirm: "" });
  const [pwMsg, setPwMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [pwLoading, setPwLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setVehicles(loadVehicles());
      setEnquiries(loadEnquiries());
    }
  }, [open]);

  // Sync enquiries dynamically
  useEffect(() => {
    const syncEnq = () => setEnquiries(loadEnquiries());
    window.addEventListener("mtc-enquiries-updated", syncEnq);
    return () => window.removeEventListener("mtc-enquiries-updated", syncEnq);
  }, []);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const persist = useCallback((v: Vehicle[]) => {
    setVehicles(v);
    saveVehicles(v);
    window.dispatchEvent(new Event("mtc-vehicles-updated"));
  }, []);

  const handleDelete = (id: string) => {
    if (confirm("Delete this vehicle?")) persist(vehicles.filter(v => v.id !== id));
  };

  const handleReset = () => {
    if (confirm("Reset all vehicles to defaults? Your custom entries will be lost.")) {
      resetVehicles();
      setVehicles(defaultVehicles);
      window.dispatchEvent(new Event("mtc-vehicles-updated"));
    }
  };

  const handleSave = () => {
    if (!editing) return;
    const imgs = editing.images || [];
    const primaryImage = imgs.length > 0 ? imgs[0] : editing.image;
    const v: Vehicle = {
      ...editing,
      id: editing.id || editing.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 20) || `v-${Date.now()}`,
      image: primaryImage,
      images: imgs.length > 0 ? imgs : undefined,
    };
    if (isNew) {
      persist([...vehicles, v]);
    } else {
      persist(vehicles.map(x => x.id === v.id ? v : x));
    }
    setEditing(null);
  };

  const startEdit = (v: Vehicle) => {
    // Ensure images array exists for the editor
    const imgs = v.images && v.images.length > 0 ? [...v.images] : v.image ? [v.image] : [];
    setEditing({ ...v, images: imgs });
    setIsNew(false);
  };

  const startNew = () => {
    setEditing({ ...empty, images: [] });
    setIsNew(true);
  };

  const canSave = editing && editing.name && editing.price && ((editing.images && editing.images.length > 0) || editing.image);

  if (!open) return null;

  const handleSecureClose = () => {
    logout();
    onLogout();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/70 p-4 pt-8 backdrop-blur-sm" onClick={handleSecureClose}>
      <div className="w-full max-w-3xl rounded-2xl border border-white/10 bg-garage-2 shadow-[0_20px_80px_rgba(0,0,0,.7)]" onClick={e => e.stopPropagation()}>

        {/* ── Header ── */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <div>
            <h2 className="font-display text-[20px] font-bold uppercase text-white">Vehicle Manager</h2>
            <p className="mt-0.5 text-[12px] text-chrome-3">{vehicles.length} vehicle{vehicles.length !== 1 ? "s" : ""} · changes saved to browser</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => { setEditing(null); setShowPwChange(v => !v); }} title="Settings"
              className={cn("grid h-9 w-9 place-items-center rounded-lg border text-chrome-3 transition-colors hover:text-white",
                showPwChange ? "border-red bg-red/10 text-red" : "border-white/10 hover:bg-white/10")}>
              <Lock className="h-4 w-4" />
            </button>
            <button onClick={handleSecureClose} title="Sign out"
              className="rounded-lg border border-white/10 px-3 py-2 text-[11px] font-semibold text-chrome-3 transition-colors hover:border-red/40 hover:text-red">
              Sign out
            </button>
            <button onClick={handleSecureClose} className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-white transition-colors hover:bg-white/10">
              <Close className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* ── Tabs selector (only visible when not editing/resetting credentials) ── */}
        {!showPwChange && !editing && (
          <div className="flex border-b border-white/10">
            <button
              onClick={() => setActiveTab("vehicles")}
              className={cn(
                "flex-1 py-3 text-center text-[12.5px] font-bold uppercase tracking-wider transition-colors",
                activeTab === "vehicles" ? "border-b-2 border-red text-red bg-white/[.01]" : "text-chrome-3 hover:text-white"
              )}
            >
              🚗 Manage Inventory
            </button>
            <button
              onClick={() => setActiveTab("enquiries")}
              className={cn(
                "flex-1 py-3 text-center text-[12.5px] font-bold uppercase tracking-wider transition-colors relative",
                activeTab === "enquiries" ? "border-b-2 border-red text-red bg-white/[.01]" : "text-chrome-3 hover:text-white"
              )}
            >
              📥 Enquiries Inbox
              {enquiries.filter(e => !e.resolved).length > 0 && (
                <span className="absolute right-4 top-1/2 -translate-y-1/2 rounded bg-red px-1.5 py-0.5 text-[9px] font-black text-black leading-none">
                  {enquiries.filter(e => !e.resolved).length}
                </span>
              )}
            </button>
          </div>
        )}

        {/* ── Change password panel ── */}
        {showPwChange ? (
          <div className="p-6">
            <h3 className="font-display text-[16px] font-bold uppercase text-white">Change Login Credentials</h3>
            <p className="mt-1 text-[12.5px] text-chrome-3">Enter your current credentials, then set new ones.</p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Input label="Current username" value={pwForm.curUser} onChange={v => setPwForm({ ...pwForm, curUser: v })} placeholder="admin" />
              <Input label="Current password" value={pwForm.curPass} onChange={v => setPwForm({ ...pwForm, curPass: v })} placeholder="Current password" type="password" />
              <Input label="New username" value={pwForm.newUser} onChange={v => setPwForm({ ...pwForm, newUser: v })} placeholder="New username" />
              <Input label="New password" value={pwForm.newPass} onChange={v => setPwForm({ ...pwForm, newPass: v })} placeholder="New password" type="password" />
              <Input label="Confirm new password" value={pwForm.confirm} onChange={v => setPwForm({ ...pwForm, confirm: v })} placeholder="Repeat new password" type="password" />
            </div>

            {pwMsg && (
              <div className={cn("mt-4 rounded-lg border px-4 py-3 text-[12.5px]",
                pwMsg.ok ? "border-green/25 bg-green/10 text-green" : "border-red/25 bg-red/10 text-red")}>
                {pwMsg.text}
              </div>
            )}

            <div className="mt-5 flex gap-3">
              <button
                disabled={pwLoading || !pwForm.curUser || !pwForm.curPass || !pwForm.newUser || !pwForm.newPass || !pwForm.confirm}
                onClick={async () => {
                  setPwMsg(null);
                  if (pwForm.newPass !== pwForm.confirm) { setPwMsg({ ok: false, text: "New passwords do not match." }); return; }
                  if (pwForm.newPass.length < 4) { setPwMsg({ ok: false, text: "New password must be at least 4 characters." }); return; }
                  setPwLoading(true);
                  const ok = await changePassword(pwForm.curUser.trim(), pwForm.curPass, pwForm.newUser.trim(), pwForm.newPass);
                  setPwLoading(false);
                  if (ok) {
                    setPwMsg({ ok: true, text: "Credentials updated! Use the new username and password next time you sign in." });
                    setPwForm({ curUser: "", curPass: "", newUser: "", newPass: "", confirm: "" });
                  } else {
                    setPwMsg({ ok: false, text: "Current username or password is incorrect." });
                  }
                }}
                className="inline-flex items-center gap-2 rounded-lg bg-red px-5 py-3 text-[13px] font-bold uppercase text-black transition-all hover:shadow-[0_0_20px_rgba(190,243,35,.4)] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {pwLoading ? "Updating..." : "Update credentials"} <ArrowRight className="h-3.5 w-3.5" />
              </button>
              <button onClick={() => { setShowPwChange(false); setPwMsg(null); }} className="rounded-lg border border-white/12 px-5 py-3 text-[13px] font-semibold text-chrome-2 hover:text-white">
                Back to vehicles
              </button>
            </div>
          </div>
        ) :

        /* ── Edit form ── */
        editing ? (
          <div className="max-h-[75vh] overflow-y-auto p-6">
            <h3 className="font-display text-[16px] font-bold uppercase text-white">
              {isNew ? "Add New Vehicle" : `Editing: ${editing.name || "Untitled"}`}
            </h3>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Input label="Vehicle name *" value={editing.name} onChange={v => setEditing({ ...editing, name: v })} placeholder="Toyota Land Cruiser 300" />
              <Input label="Tagline" value={editing.tagline} onChange={v => setEditing({ ...editing, tagline: v })} placeholder="V6 Twin Turbo · 7 seats" />
              <Input label="Price *" value={editing.price} onChange={v => setEditing({ ...editing, price: v })} placeholder="LKR 85.0M" />
              <Input label="Year" value={editing.year} onChange={v => setEditing({ ...editing, year: v })} placeholder="2024" />
              <Input label="Mileage" value={editing.mileage} onChange={v => setEditing({ ...editing, mileage: v })} placeholder="12,000 km" />
              <Input label="Fuel type" value={editing.fuel} onChange={v => setEditing({ ...editing, fuel: v })} placeholder="Petrol / Diesel / Hybrid" />
              <Input label="Gearbox" value={editing.gearbox} onChange={v => setEditing({ ...editing, gearbox: v })} placeholder="8-Speed Auto" />
              <Input label="Status text" value={editing.status} onChange={v => setEditing({ ...editing, status: v })} placeholder="In stock · Colombo 06" />
              <Select label="Category" value={editing.category} options={CATS} onChange={v => setEditing({ ...editing, category: v as Vehicle["category"] })} />
              <Select label="Status colour" value={editing.statusTone} options={TONES} labels={["Green (in stock)", "Amber (in transit)", "Grey (to order)"]} onChange={v => setEditing({ ...editing, statusTone: v as Vehicle["statusTone"] })} />

              {/* ── Multi-image uploader ── */}
              <ImageManager
                images={editing.images || []}
                onChange={(imgs) => setEditing({ ...editing, images: imgs, image: imgs[0] || "" })}
              />

              <Input label="Highlight badge (optional)" value={editing.highlight || ""} onChange={v => setEditing({ ...editing, highlight: v || undefined })} placeholder="Grade 4.5 / Chassis-verified" />
              {!isNew && <Input label="Vehicle ID" value={editing.id} onChange={v => setEditing({ ...editing, id: v })} placeholder="auto-generated" />}
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={handleSave}
                disabled={!canSave}
                className="inline-flex items-center gap-2 rounded-lg bg-red px-5 py-3 text-[13px] font-bold uppercase text-black transition-all hover:shadow-[0_0_20px_rgba(190,243,35,.4)] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {isNew ? "Add vehicle" : "Save changes"} <ArrowRight className="h-3.5 w-3.5" />
              </button>
              <button onClick={() => setEditing(null)} className="rounded-lg border border-white/12 px-5 py-3 text-[13px] font-semibold text-chrome-2 hover:text-white">
                Cancel
              </button>
            </div>
          </div>
        ) : activeTab === "vehicles" ? (

          /* ── Vehicle list ── */
          <div className="max-h-[70vh] overflow-y-auto p-6">
            <div className="mb-4 flex items-center justify-between">
              <button onClick={startNew} className="inline-flex items-center gap-2 rounded-lg bg-red px-4 py-2.5 text-[12px] font-bold uppercase text-black hover:shadow-[0_0_20px_rgba(190,243,35,.4)]">
                <Plus className="h-4 w-4" /> Add new vehicle
              </button>
              <button onClick={handleReset} className="text-[11px] font-semibold text-chrome-4 hover:text-red">
                Reset to defaults
              </button>
            </div>

            {vehicles.length === 0 ? (
              <p className="py-10 text-center text-[14px] text-chrome-3">No vehicles yet. Click "Add new vehicle" to start.</p>
            ) : (
              <div className="space-y-2">
                {vehicles.map(v => {
                  const thumb = (v.images && v.images.length > 0 ? v.images[0] : v.image);
                  const imgCount = v.images ? v.images.length : (v.image ? 1 : 0);
                  return (
                    <div key={v.id} className="flex items-center gap-3 rounded-lg border border-white/8 bg-white/[.02] p-3 transition-colors hover:bg-white/[.04]">
                      {thumb ? (
                        <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-md border border-white/10">
                          <img src={thumb} alt="" className="h-full w-full object-cover" />
                          {imgCount > 1 && (
                            <span className="absolute bottom-0.5 right-0.5 rounded bg-black/60 px-1 py-0.5 text-[8px] font-bold text-white">
                              {imgCount} 📷
                            </span>
                          )}
                        </div>
                      ) : (
                        <div className="grid h-14 w-20 shrink-0 place-items-center rounded-md border border-white/10 bg-white/5 text-[10px] text-chrome-4">No img</div>
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[14px] font-bold text-white">{v.name}</p>
                        <p className="mt-0.5 truncate text-[12px] text-chrome-3">{v.category} · {v.year} · {v.price}</p>
                      </div>
                      <div className="flex shrink-0 gap-2">
                        <button onClick={() => startEdit(v)} className="rounded-md border border-white/12 px-3 py-1.5 text-[11px] font-semibold text-chrome-2 hover:border-white/30 hover:text-white">
                          Edit
                        </button>
                        <button onClick={() => handleDelete(v.id)} className="rounded-md border border-red/25 px-3 py-1.5 text-[11px] font-semibold text-red hover:bg-red/10">
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (

          /* ── Enquiries Inbox list ── */
          <div className="max-h-[70vh] overflow-y-auto p-6 space-y-3">
            {enquiries.length === 0 ? (
              <div className="py-16 text-center">
                <span className="text-[32px]">📥</span>
                <p className="mt-4 text-[14px] font-bold text-white">Your inbox is empty.</p>
                <p className="mt-1 text-[12px] text-chrome-3">Customer submissions from the website Enquiry Form will appear here.</p>
              </div>
            ) : (
              enquiries.map(enq => (
                <div key={enq.id} className={cn(
                  "rounded-xl border p-4 transition-all duration-300",
                  enq.resolved ? "border-white/5 bg-white/[.01] opacity-60" : "border-white/10 bg-white/[.03]"
                )}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <span className="font-display text-[16px] font-bold uppercase text-white flex items-center gap-2">
                      {enq.name}
                      {!enq.resolved && <span className="h-1.5 w-1.5 rounded-full bg-red animate-pulse" />}
                    </span>
                    <span className="font-tech text-[10.5px] text-chrome-4">{enq.timestamp}</span>
                  </div>

                  <div className="mt-2.5 flex flex-wrap gap-2">
                    <span className="rounded bg-red/10 px-2 py-0.5 text-[10px] font-black uppercase text-red leading-none">
                      {enq.interest}
                    </span>
                    <a href={`tel:${enq.phone}`} className="rounded bg-white/5 px-2.5 py-0.5 text-[11.5px] text-chrome-2 hover:text-white">
                      📞 {enq.phone}
                    </a>
                    {enq.email && (
                      <a href={`mailto:${enq.email}`} className="rounded bg-white/5 px-2.5 py-0.5 text-[11.5px] text-chrome-2 hover:text-white">
                        ✉️ {enq.email}
                      </a>
                    )}
                  </div>

                  {enq.notes && (
                    <div className="mt-3.5 rounded-lg border border-white/5 bg-black/40 p-3 text-[13px] leading-relaxed text-chrome-2 font-serif italic">
                      "{enq.notes}"
                    </div>
                  )}

                  <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3">
                    <span className="label text-[9px] text-chrome-4">Ref: {enq.id.toUpperCase()}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          const next = enquiries.map(x => x.id === enq.id ? { ...x, resolved: !x.resolved } : x);
                          setEnquiries(next);
                          saveEnquiries(next);
                        }}
                        className={cn(
                          "rounded-md px-3 py-1 text-[11px] font-semibold transition-all",
                          enq.resolved
                            ? "border border-white/10 text-chrome-3 hover:text-white"
                            : "bg-red/10 text-red border border-red/20 hover:bg-red/20"
                        )}
                      >
                        {enq.resolved ? "Re-open" : "Mark Resolved"}
                      </button>
                      <button
                        onClick={() => {
                          if (confirm("Delete this enquiry permanently?")) {
                            const next = enquiries.filter(x => x.id !== enq.id);
                            setEnquiries(next);
                            saveEnquiries(next);
                          }
                        }}
                        className="rounded-md border border-white/5 px-3 py-1 text-[11px] font-semibold text-chrome-4 hover:border-red/20 hover:text-red transition-all"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* ── Footer ── */}
        <div className="border-t border-white/8 px-6 py-4">
          <p className="text-[11px] leading-relaxed text-chrome-4">
            <strong className="text-chrome-3">How it works:</strong> Upload photos from your phone or computer — they're
            auto-compressed and stored in your browser. Drag thumbnails to reorder. The first image is the cover photo shown in the inventory grid.
            Add as many images as you like per vehicle. To paste an online link instead, use the URL field.
          </p>
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────
// Shared form primitives
// ────────────────────────────────────────────────────────────────
function Input({ label, value, onChange, placeholder, type = "text" }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <div>
      <label className="label mb-1.5 block text-[9px] text-chrome-4">{label}</label>
      <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} type={type}
        className="w-full rounded-lg border border-white/10 bg-white/[.03] px-3 py-2.5 text-[13px] text-white placeholder:text-chrome-4 outline-none transition-colors focus:border-red/50" />
    </div>
  );
}

function Select({ label, value, options, labels, onChange }: { label: string; value: string; options: string[]; labels?: string[]; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="label mb-1.5 block text-[9px] text-chrome-4">{label}</label>
      <select value={value} onChange={e => onChange(e.target.value)}
        className="w-full rounded-lg border border-white/10 bg-garage-3 px-3 py-2.5 text-[13px] text-white outline-none transition-colors focus:border-red/50">
        {options.map((o, i) => <option key={o} value={o}>{labels ? labels[i] : o}</option>)}
      </select>
    </div>
  );
}
