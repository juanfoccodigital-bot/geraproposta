"use client";

interface ToggleFieldProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

export default function ToggleField({ label, value, onChange }: ToggleFieldProps) {
  return (
    <div className="flex items-center justify-between">
      <label className="text-[11px] text-white/50">{label}</label>
      <button
        type="button"
        onClick={() => onChange(!value)}
        className="relative w-9 h-5 rounded-full transition-colors cursor-pointer"
        style={{ background: value ? "#F97316" : "rgba(255,255,255,0.1)" }}
      >
        <span
          className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform"
          style={{ left: value ? 18 : 2 }}
        />
      </button>
    </div>
  );
}
