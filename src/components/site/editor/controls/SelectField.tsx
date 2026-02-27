"use client";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps {
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
}

export default function SelectField({ label, value, options, onChange }: SelectFieldProps) {
  return (
    <div>
      <label className="text-[10px] text-white/30 uppercase mb-1 block">{label}</label>
      <div className="flex flex-wrap gap-1">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className="px-2.5 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer"
            style={{
              background: value === opt.value ? "rgba(249,115,22,0.15)" : "rgba(255,255,255,0.05)",
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: value === opt.value ? "#F97316" : "rgba(255,255,255,0.1)",
              color: value === opt.value ? "#F97316" : "rgba(255,255,255,0.5)",
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
