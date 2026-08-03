/** Fixed dark garage backdrop with carbon-fibre texture, faint grid, and warm corner washes */
export default function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-garage" />
      <div className="tex-carbon absolute inset-0" />
      <div className="tex-grid absolute inset-0 opacity-50" />
      {/* warm accent washes — as if a showroom spot bled into the wall */}
      <div className="absolute -left-[15vw] top-[-10vh] h-[55vh] w-[55vw] rounded-full bg-[radial-gradient(circle,rgba(190,243,35,.06),transparent_60%)] blur-[90px]" />
      <div className="absolute -right-[10vw] bottom-[-10vh] h-[50vh] w-[50vw] rounded-full bg-[radial-gradient(circle,rgba(240,168,40,.04),transparent_60%)] blur-[90px]" />
      {/* edge vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_40%,transparent_40%,rgba(15,16,20,.6)_100%)]" />
    </div>
  );
}
