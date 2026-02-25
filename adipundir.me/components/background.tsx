export function Background() {
  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute top-1/2 -right-40 h-96 w-96 rounded-full bg-violet-500/15 blur-3xl" />
      <div className="absolute -bottom-40 left-1/3 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
    </div>
  );
}
