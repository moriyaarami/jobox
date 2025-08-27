import React, { useId, useState } from "react";
import { Ghost, Eye, Shield } from "lucide-react";
import { motion } from "framer-motion";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const sizeMap = {
  sm: "text-sm px-3 py-2",
  md: "text-base px-4 py-2.5",
  lg: "text-lg px-5 py-3",
};

export default function GhostModeButton({
  value,
  onChange,
  defaultValue = "active",
  size = "md",
  disabled,
  fullWidth,
  className,
}) {
  const [internal, setInternal] = useState(defaultValue);
  const isControlled = value !== undefined;
  const mode = isControlled ? value : internal;
  const id = useId();

  function toggle() {
    if (disabled) return;
    const next = mode === "active" ? "ghost" : "active";
    if (!isControlled) setInternal(next);
    if (onChange) onChange(next);
  }

  return (
    <button
      id={id}
      type="button"
      onClick={toggle}
      aria-pressed={mode === "ghost"}
      aria-live="polite"
      disabled={disabled}
      className={cn(
        "group relative inline-flex items-center gap-2 select-none rounded-2xl border transition-all",
        "shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        mode === "active"
          ? "bg-white border-gray-200 hover:bg-gray-50 focus-visible:ring-emerald-500"
          : "bg-gray-900 border-gray-800 text-white hover:bg-black focus-visible:ring-purple-500",
        disabled && "opacity-60 cursor-not-allowed",
        sizeMap[size],
        fullWidth && "w-full justify-center",
        className
      )}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 35 }}
        className={cn(
          "flex items-center justify-center rounded-xl p-1.5",
          mode === "active" ? "bg-emerald-100 text-emerald-700" : "bg-purple-300/20 text-purple-100"
        )}
      >
        {mode === "active" ? (
          <Eye aria-hidden className="h-5 w-5" />
        ) : (
          <Ghost aria-hidden className="h-5 w-5" />
        )}
      </motion.span>

      <span className="font-medium">
        {mode === "active" ? "Active" : "Ghost"}
      </span>

      <span
        className={cn(
          "ml-1 rounded-full px-2 py-0.5 text-xs font-semibold",
          mode === "active" ? "bg-emerald-100 text-emerald-700" : "bg-purple-400/20 text-purple-100"
        )}
      >
        {mode === "active" ? "Visible to Employers" : "Hidden from Employers"}
      </span>

      {mode === "ghost" && (
        <Shield aria-hidden className="ml-1 h-4 w-4 opacity-70" />
      )}
    </button>
  );
}
/* 
export default function Demo() {
  const [controlledMode, setControlledMode] = useState("active");

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-white text-gray-900 p-6">
      <div className="mx-auto max-w-3xl space-y-8">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Ghost Mode Toggle</h1>
          <p className="text-gray-600">כפתור שמחליף מצב בין <b>Active</b> ל- <b>Ghost</b>.</p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <h2 className="mb-3 text-lg font-semibold">שימוש בסיסי</h2>
            <GhostModeButton />
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <h2 className="mb-3 text-lg font-semibold">גדלים</h2>
            <div className="flex flex-wrap items-center gap-3">
              <GhostModeButton size="sm" />
              <GhostModeButton size="md" />
              <GhostModeButton size="lg" />
            </div>
          </div>
        </section>

        <section className="rounded-2xl border bg-white p-5 shadow-sm">
          <h2 className="mb-3 text-lg font-semibold">שימוש נשלט</h2>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <GhostModeButton value={controlledMode} onChange={setControlledMode} />
              <span className="text-sm text-gray-600">
                מצב נוכחי: <b>{controlledMode}</b>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="rounded-xl border px-3 py-2 text-sm hover:bg-gray-50"
                onClick={() => setControlledMode("active")}
              >
                Set Active
              </button>
              <button
                className="rounded-xl border px-3 py-2 text-sm hover:bg-gray-50"
                onClick={() => setControlledMode("ghost")}
              >
                Set Ghost
              </button>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <h2 className="mb-3 text-lg font-semibold">מושבת</h2>
            <GhostModeButton disabled />
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <h2 className="mb-3 text-lg font-semibold">רוחב מלא</h2>
            <GhostModeButton fullWidth />
          </div>
        </section>

        <footer className="text-sm text-gray-500">
          טיפ חיבור למערכת: שמרי את ה-state במאגר (DB) של המשתמש/ת.
        </footer>
      </div>
    </div>
  );
} */
